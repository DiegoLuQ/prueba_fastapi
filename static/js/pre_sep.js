console.log('hola desde pre_sep')

//const url = "http://127.0.0.1:8000/presupuesto/ruta/leer_datos"
const url = "https://pruebafastapi1.herokuapp.com/presupuesto/ruta/leer_datos"
const tablePME = document.querySelector('#table-pme')
const buscador = document.querySelector('#buscador')
var datos

document.addEventListener('DOMContentLoaded', obtenerDatos)


async function obtenerDatos(){
    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        console.log(resultado)
        datos = resultado
        generarTabla(resultado)

    } catch (error) {
        console.log(error)
    }
}
 
function generarTabla(datos){
    limpiarHTML()
    datos.forEach( item => {
        const { dimension, subdimension, responsable, accion, area, descripcion , presentacion,
            mes_de_Compra, fecha_de_la_actividad, motivo_o_actividad, fact, req } = item
        const trPadre = document.createElement('tr')

        const tdDimension = document.createElement('td')
        const tdSubdimensión = document.createElement('td')
        //const tdResponsable = document.createElement('td')
        const tdAccion = document.createElement('td')
        
        const tdArea = document.createElement('td')
        const tdDescripcion = document.createElement('td')
        const tdPresentacion = document.createElement('td')
        const tdMesCompra = document.createElement('td')
        const tdFechaActiva = document.createElement('td')
        const tdMotivo = document.createElement('td')
        const tdContentbtn = document.createElement('td')
        const tdFact = document.createElement('td')
        const tdReq = document.createElement('td')
        
        const tdButtonFactura = document.createElement('a')
        const tdButtonRequerimiento = document.createElement('a')
        const tdButtonCertificado = document.createElement('a')
        
        tdButtonFactura.classList.add('btn', 'btn-success')
        tdButtonFactura.setAttribute('target', '_blank')
        tdButtonFactura.href = "/presupuesto/pme/lee/" + fact

        tdButtonRequerimiento.setAttribute('target', '_blank')
        tdButtonRequerimiento.href = "/presupuesto/pme/lee/" + req
        tdButtonRequerimiento.classList.add('btn', 'btn-primary', 'my-2')

        tdButtonCertificado.setAttribute('target', '_blank')
        tdButtonCertificado.href = "/presupuesto/pme/lee/" + req
        tdButtonCertificado.classList.add('btn', 'btn-warning')



        tdDimension.textContent = dimension
        tdSubdimensión.textContent = subdimension
        //tdResponsable.textContent = responsable
        tdAccion.textContent = accion
        tdFact.textContent = fact
        tdReq.textContent = req
        
        tdArea.textContent = area
        tdDescripcion.textContent = descripcion 
        tdPresentacion.textContent = presentacion
        tdMesCompra.textContent = mes_de_Compra
        tdFechaActiva.textContent = fecha_de_la_actividad
        tdMotivo.textContent = motivo_o_actividad
        
        tdButtonFactura.textContent = "Factura"
        tdButtonRequerimiento.textContent = "Requerimiento"
        tdButtonCertificado.textContent = "Certificado"
        


        tdContentbtn.appendChild(tdButtonFactura)
        tdContentbtn.appendChild(tdButtonRequerimiento)
        tdContentbtn.appendChild(tdButtonCertificado)
        
        trPadre.appendChild(tdDimension)
        trPadre.appendChild(tdSubdimensión)
        trPadre.appendChild(tdAccion)
        //trPadre.appendChild(tdResponsable)
        trPadre.appendChild(tdArea)
        
        trPadre.appendChild(tdDescripcion)
        trPadre.appendChild(tdPresentacion)
        trPadre.appendChild(tdMesCompra)
        trPadre.appendChild(tdFechaActiva)
        trPadre.appendChild(tdMotivo)
        trPadre.appendChild(tdFact)
        trPadre.appendChild(tdReq)
        
        trPadre.appendChild(tdContentbtn)

        tablePME.appendChild(trPadre)
    })
}

const datosBusqueda = {
    accion : '',
    descripcion : ''
    // ,
    // presentacion : '',
    // motivo_o_actividad : '',
}

buscador.addEventListener('keyup', e => {
    datosBusqueda[e.target.id] = e.target.value.toLowerCase();
    console.log(datosBusqueda)
    filtrarAccionPME()
})

function limpiarHTML(){
    while(tablePME.firstChild){
        tablePME.removeChild(tablePME.firstChild)
    }
}

function filtrarAccionPME(){
    const {accion} = datosBusqueda;
    const lista = [];
    try {
        for(let item of datos){
            let accion_pme = item.accion.toLowerCase()
            if(accion_pme.indexOf(accion) >= 0){
                lista.push(item)
            }
        }
        generarTabla(lista)
    } catch (error) {
    }
}

function filtrarDescripcionPME(){
    const {descripcion} = datosBusqueda;
    const lista2 = [];
    try {
        for(let item of datos){
            let descripcion_pme = item.descripcion.toLowerCase()
            if(descripcion_pme.indexOf(descripcion) >= 0){
                lista2.push(item)
            }
        }
        generarTabla(lista2)
    } catch (error) {
    }
}