alert('Listo papi');
/**const boton=document.querySelector('BUTTON');

boton=document.addEventListener("click",(e)=>{
    const seccion=document.querySelector(e.target.href.value);

    seccion.classList.add('visible')
})**/

document.addEventListener('DOMContentLoaded',e=>{
    iniciar_app();
})

function iniciar_app(){
    mostrar_servicios();
}

async function mostrar_servicios(){
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();
        const { servicios}= db;

        servicios.forEach(servicio=>{
            const {id, nombre, precio} = servicio;
            //Inicia el DOMScript
            doc = document.querySelector('#servicios');
            //Generando texto
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');
            //Gnerando el precio
            const precio = document.createElement('P');
            precio.textContent = precio.toString;
            console.log(precio);
            nombreServicio.classList.add('precio-servicio');            

            p.addChildNode()
        })
    } catch (error) {
        console.error(error);
    }
}

function crear_servicio(servicio){
    div = document.createElement('div');
    div.classList.add('servicio');
    

}

