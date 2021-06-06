//Variable global
let numPagina = 1;
document.addEventListener('DOMContentLoaded',e=>{
    iniciar_app();
})

function iniciar_app(){
    console.log(numPagina);
    mostrarServicios();
    //Resalta el Div Actual segun el tab al que se presionar
    mostrarSeccion();

    //Cambiar la seccion preionada
    cambiarSeccion();
    //Pagina anterior
    paginaAnterior();
    //Pagina siguiente
    paginaSiguiente();
    //Comprueba pagina actual
    botonesPaginador();

}
function cambiarSeccion() {
    const botones = document.querySelectorAll('.tabs .button');

    botones.forEach(btn=>{
        btn.addEventListener('click',e=>{

            e.preventDefault();
            botonesPaginador();

            numPagina = parseInt(e.target.dataset.paso);

            mostrarSeccion();

            console.log(numPagina);

            botonesPaginador();
            //Mostramos la seccion y pintamos el tab
    })
 })
}
function mostrarSeccion(){
    //Verificamos si existe una seccion visible 
    const seccionAnterior = document.querySelector('.visible');
    //Verificamos si existe una tab visitada 
    const tabAnterior = document.querySelector('.visitado');
    //Si existe una seccion visible la ocultamos
    if(seccionAnterior){
        seccionAnterior.classList.remove('visible');
    }
    //Si existe una tab ya visitada la ocultamos
    if(tabAnterior){
        tabAnterior.classList.remove('visitado');
    }
    //Selecciona la seccion y tab de la pagina actual
    const seccionActual = document.querySelector(`#paso-${numPagina}`);
    seccionActual.classList.add('visible');

    const tab = document.querySelector(`[data-paso="${numPagina}"]`);
    tab.classList.add('visitado');
}
async function mostrarServicios(){
    try {
        console.log('hola');
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();
        const{ servicios } = db;

        //Inicia JSDOM
        servicios.forEach(servicio=>{
            const {id, nombre, precio} = servicio;
            //Crear nombre del servicio
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('servicio-nombre');
             //Crear precio del servicio
            const precioServicio = document.createElement('P');
            precioServicio.textContent =`$ ${precio}`;
            precioServicio.classList.add('servicio-precio');
            //Crear contenedor del servicio
            const contenedorServicio = document.createElement('DIV');
            contenedorServicio.classList.add('servicio');
            //Con data ser damos un atributo al elemmento
            contenedorServicio.dataset.idServicio = id;

            contenedorServicio.appendChild(nombreServicio);
            contenedorServicio.appendChild(precioServicio);

            //EventHandler--Ideal cuando creamos contenido con Js
            //AddEvent listener cuando hay contenido ya creado

            contenedorServicio.onclick = seleccionarServicio;
            //Insertar a listado
            const listado = document.querySelector('.listado-servicios');
            listado.appendChild(contenedorServicio);

            //Selecciona un servicio para la citada
        })
    } catch (error) {
        console.log(error);
    }
}

function seleccionarServicio(e) {
    let element;
    //Forzar que el elemento al cual
    if(e.target.tagName === 'P'){
        element = e.target.parentElement;
    }else{
        element= e.target;
    }
    const id = element.dataset.idServicio;
    console.log(id);
    //Verifica si el elemento contiene la clase seleccionado
    (element.classList.contains('seleccionado'))
        ?element.classList.remove('seleccionado')
        :element.classList.add('seleccionado');
    
}

function paginaAnterior(){
    const ant = document.querySelector('#ant');
        
    ant.addEventListener('click',()=>{
        numPagina--;
        botonesPaginador();
        mostrarSeccion();
        console.log(numPagina);
    })
}
function paginaSiguiente(){
    const sig = document.querySelector('#sig');

    sig.addEventListener('click',()=>{
        numPagina++;
        botonesPaginador();
        mostrarSeccion();
        console.log(numPagina);
    })
}

function botonesPaginador(){
    const ant = document.querySelector('#ant');
    const sig = document.querySelector('#sig');
    //Oculto el boton de la izq
    if(numPagina===1)
        ant.classList.add('boton-oculto');
    //Hago aparacer el boton de la izquierda y si es retroceso aparece el de la derecha
    if(numPagina===2){
        ant.classList.remove('boton-oculto');
        sig.classList.remove('boton-oculto');
    }
    //Oculto el boton de la der
    if(numPagina===3)
        sig.classList.add('boton-oculto');
}

