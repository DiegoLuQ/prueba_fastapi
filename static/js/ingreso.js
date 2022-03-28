console.log('hola')
const titulo = document.querySelector('.titulo')
const formulario_ingreso = document.querySelector('#formulario_ingreso')

cargarAddEventListener()
function cargarAddEventListener(){
    formulario_ingreso.addEventListener('click', guardarTitulo)

}

function guardarTitulo(e){
    console.log(e.target.classList)
}