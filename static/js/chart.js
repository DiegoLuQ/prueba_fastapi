console.log('hola')

let myChart;
function addEventListeners(){
    document.addEventListener('DOMContentLoaded', obtenerDatos)
    
}

addEventListeners()

async function obtenerDatos(){
    switch (enlace) {
        //case 'http://127.0.0.1:8000/analisis/leer_archivos_excel?nombre_file=pruebas2022.xlsx&nombre_hoja=DSContHabilidadPreguntas':
        case 'https://pruebafastapi1.herokuapp.com/leer_archivos_excel?nombre_file=pruebas2022.xlsx&nombre_hoja=DSContHabilidadPreguntas':
          
            try {
              //const resultado = await fetch('http://127.0.0.1:8000/analisis/datos_graficos?nombre_file=pruebas2022.xlsx&nombre_hoja=DSContHabilidadPreguntas')
              const resultado = await fetch('https://pruebafastapi1.herokuapp.com/analisis/datos_graficos?nombre_file=pruebas2022.xlsx&nombre_hoja=DSContHabilidadPreguntas')
                
                const respuesta = await resultado.json()
                console.log(respuesta)
                console.log(respuesta[2].length)
                const cabecera = respuesta[0]
                const valores = respuesta[1]
                const habilidad = respuesta[2]

                const labels = cabecera;
                
                  const data = {
                    labels: labels,
                    datasets: [{
                      label: habilidad[0],
                      backgroundColor: 'red',
                      data: valores[0],
                    },
                    {
                      label: habilidad[1],
                      backgroundColor: 'blue',
                      data: valores[1],
                    },
                    {
                      label: habilidad[2],
                      backgroundColor: 'green',
                      data: valores[2],
                    }]
                  };
                
                  const config = {
                    type: 'bar',
                    data: data,
                    options: {}
                  };
                  if (myChart) {
                    myChart.destroy();
                  }
                  myChart = new Chart(document.querySelector('#myChart'), config)

            } catch (error) {
                console.log(error)
            }
            // console.log(respuesta)
            // console.log(respuesta['Literario lírico: Poema'])
            // console.log(respuesta['Literario lírico: Poema']['Localizar información'])
            //console.log(Object.keys(respuesta))
            //for( let i = 0; i>)
            break;
    
        default:
            break;
    }
    
}
