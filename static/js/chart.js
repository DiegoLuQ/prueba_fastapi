console.log('hola')

let myChart;
function addEventListeners(){
    document.addEventListener('DOMContentLoaded', obtenerDatos)
    
}

addEventListeners()

async function obtenerDatos(){
    switch (enlace) {
        case 'http://127.0.0.1:8000/analisis/leer_archivos_excel?nombre_file=pruebas2022.xlsx&nombre_hoja=DSContHabilidadPreguntas':
        //case 'https://pruebafastapi1.herokuapp.com/analisis/leer_archivos_excel?nombre_file=pruebas2022.xlsx&nombre_hoja=DSContHabilidadPreguntas':
            try {
              const resultado = await fetch('http://127.0.0.1:8000/analisis/datos_graficos?nombre_file=pruebas2022.xlsx&nombre_hoja=DSContHabilidadPreguntas')
              //const resultado = await fetch('https://pruebafastapi1.herokuapp.com/analisis/datos_graficos?nombre_file=pruebas2022.xlsx&nombre_hoja=DSContHabilidadPreguntas')
                
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
                      backgroundColor: 'rgba(33,218,48,0.8)',
                      data: valores[0],
                    },
                    {
                      label: habilidad[1],
                      backgroundColor: 'rgba(218,33,46,0.8)',
                      data: valores[1],
                    },
                    {
                      label: habilidad[2],
                      backgroundColor: 'rgba(33,198,218,0.8)',
                      data: valores[2],
                    }]
                  };
                
                  const config = {
                    type: 'bar',
                    data: data,
                    options: {
                      responsive:true,
                      maintainAspectRatio:false,
                      plugins: {
                        legend: {
                          display:true,
                          labels: {
                            color:'#fff'
                          }
                        }
                      },
                      scales: {
                        y:{
                          ticks: {
                            major: {
                              enabled: true
                            },
                            color:'#fff',
                          }
                        },
                        x:{
                          ticks: {
                            major: {
                              enabled: true
                            },
                            color:'#fff',
                          }
                        }
                      }
                    }
                  };
                  if (myChart) {
                    myChart.destroy();
                  }
                  myChart = new Chart(document.querySelector('#myChart'), config)

            } catch (error) {
                console.log(error)
            }
            break;
    
        default:
            break;
    }
    
}
