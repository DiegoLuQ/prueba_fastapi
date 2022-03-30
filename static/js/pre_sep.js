console.log('hola desde pre_sep')

const url = "http://127.0.0.1:8000/presupuesto/ruta/leer_datos"
const tablePME = document.querySelector('#table-pme')

cargarAddEventListener()
function cargarAddEventListener(){
    document.addEventListener('DOMContentLoaded', obtenerDatos)
}

async function obtenerDatos(){
    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        console.log(resultado)
        generarTabla(resultado)
    } catch (error) {
        console.log(error)
    }
}

function generarTabla(datos){
    datos.forEach( item => {
        const { dimension, subdimension, responsable, area, descripcion , presentacion,
            mes_de_Compra, fecha_de_la_actividad, motivo_o_actividad } = item
        const trPadre = document.createElement('tr')

        const tdDimension = document.createElement('td')
        const tdSubdimensión = document.createElement('td')
        const tdResponsable = document.createElement('td')
        const tdArea = document.createElement('td')
        const tdDescripcion = document.createElement('td')
        const tdPresentacion = document.createElement('td')
        const tdMesCompra = document.createElement('td')
        const tdFechaActiva = document.createElement('td')
        const tdMotivo = document.createElement('td')


        tdDimension.textContent = dimension
        tdSubdimensión.textContent = subdimension
        tdResponsable.textContent = responsable
        tdArea.textContent = area
        tdDescripcion.textContent = descripcion 
        tdPresentacion.textContent = presentacion
        tdMesCompra.textContent = mes_de_Compra
        tdFechaActiva.textContent = fecha_de_la_actividad
        tdMotivo.textContent = motivo_o_actividad

        trPadre.appendChild(tdDimension)
        trPadre.appendChild(tdSubdimensión)
        trPadre.appendChild(tdResponsable)
        trPadre.appendChild(tdArea)
        trPadre.appendChild(tdDescripcion)
        trPadre.appendChild(tdPresentacion)
        trPadre.appendChild(tdMesCompra)
        trPadre.appendChild(tdFechaActiva)
        trPadre.appendChild(tdMotivo)

        tablePME.appendChild(trPadre)
    })
}