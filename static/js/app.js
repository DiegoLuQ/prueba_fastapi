console.log('Hello')
const barra_4 = document.querySelectorAll('.barra_4');
const barra_2 = document.querySelectorAll('.barra_2');
const barra_3 = document.querySelectorAll('.barra_3');
const barra_5 = document.querySelectorAll('.barra_5');
const barra_6 = document.querySelectorAll('.barra_6');
const barra_7 = document.querySelectorAll('.barra_7');
const barra_8 = document.querySelectorAll('.barra_8');
const barra_10 = document.querySelectorAll('.barra_10');

const hijo = document.querySelectorAll('.hijo');
const madre = document.querySelectorAll('.madre');
const tr_tbody = document.querySelectorAll('.tr_tbody')

const formulario = document.querySelector('#formulario')

const enlace = window.location.href;

function addEventListeners(){
    document.addEventListener('DOMContentLoaded', agregando_porcentaje)
    document.addEventListener('DOMContentLoaded', barrasColumna4)
}

addEventListeners()


function agregando_porcentaje(){

    switch(enlace) {
        
        case 'http://127.0.0.1:8000/analisis/leer_archivos_excel?nombre_file=pruebas2022.xlsx&nombre_hoja=DSResultados':
            
            console.log('estamos en DSResultados')
            tr_tbody.forEach(x => {
                x.children[12].remove()
            })
            barra_4.forEach(a => {
                a.classList.add('color_columna', 'edit_columna', 'barrita')
                
            })
            madre.forEach(x => {
                x.classList.add('progress', 'barrita')
            })
            hijo.forEach(x => {
                x.classList.add('progress-bar', 'barrita')
                x.style.setProperty('width', x.attributes[1].value * 100 + '%')
                x.ariaValueNow = (x.attributes[1].value)
            })
            barra_2.forEach(x => {
                x.classList.add('color_columna')
                
            })
            barra_3.forEach(x => {
                x.classList.add('color_columna')
                
            })
            barra_5.forEach(x => {
                x.children[0].remove()
            })
            barra_6.forEach(x => {
                x.children[0].remove()
            })
            barra_7.forEach(x => {
                x.children[0].remove()
            })
            barra_8.forEach(x => {
                x.children[0].remove()
            })
            break;
            case 'http://127.0.0.1:8000/analisis/leer_archivos_excel?nombre_file=pruebas2022.xlsx&nombre_hoja=DSPorcentajePregunta':
                console.log('estamos en DSPorcentajePregunta')
                //tr_tbody.removeChild(tr_tbody.children[10])
                tr_tbody.forEach(x => {
                    x.children[12].remove()
                    x.children[11].remove()
                    x.children[10].remove()
                })
                barra_4.forEach(x => {
                    x.classList.add('color_columna', 'edit_columna')
                    
                })
                barra_5.forEach(x => {
                    x.classList.add('color_columna', 'edit_columna')
                    
                })
                barra_6.forEach(x => {
                    x.classList.add('color_columna', 'edit_columna')
                    
                })
                barra_7.forEach(x => {
                    x.classList.add('color_columna', 'edit_columna')
                    
                })
                barra_8.forEach(x => {
                    x.classList.add('color_columna', 'edit_columna')
                    
                })
                madre.forEach(x => {
                x.classList.add('progress', 'barrita')
                })
                hijo.forEach(x => {
                    x.classList.add('progress-bar', 'barrita')
                    x.style.setProperty('width', x.attributes[1].value * 100 + '%')
                    x.ariaValueNow = (x.attributes[1].value)
                })
                break;
            }
        }      
function barrasColumna4(){
    const edit_columna = document.querySelectorAll('.edit_columna');
    edit_columna.forEach( x => {
        x.firstChild.data = Number(Math.round(x.textContent * 100)) + ' %'
    })
}