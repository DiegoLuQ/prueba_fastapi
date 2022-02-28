from os import getcwd

from fastapi import APIRouter, FastAPI, Request, File, UploadFile, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import pandas as pd
import numpy as np
from models.archivo import Archivo
from db import conn

analisis_conn = conn.analisis

app = APIRouter(
    prefix='/analisis',
    responses={404:{"description": "Not Found"}})

templates = Jinja2Templates(directory='templates')
app.mount('/static', StaticFiles(directory='static'), name='static')

#Upload Files
PATH_FILES = getcwd() + "/static/files/"
"""
FUNCIONES
"""
#Leyendo Archivo Excel
def leer_excel(nombre_file, nombre_hoja):
    #transformando los datos 
    pd.options.display.float_format = '{:,.1f}'.format
    #obteniendo el archivo necesario para la lectura
    df = pd.read_excel(io = "static/files/" + nombre_file, sheet_name=nombre_hoja)
    df = df.round(2)
    #capturando los header de la df
    lista_cabecera = list(df)
    #capturando los datos del df
    lista_valores = df.to_numpy().tolist()
    consolidado = [lista_cabecera, lista_valores]
    return consolidado

#Leeremos el nombre de la Hoja del Libro Excel para mostrarlo como opciones en Pantalla
def mostrar_sheet():
    sheets = analisis_conn['sheet_excel'].find({},{'name':1 , 'sheetname_real':1, '_id':0})
    files = analisis_conn['upfile'].find({},{'_id':0})
    consolidado = [sheets, files]
    return consolidado
"""     
PATHS - GET 
"""
@app.get('/')
async def prueba(request: Request):
    valores_sheet = mostrar_sheet()
    return templates.TemplateResponse('ingreso.html', {'request': request, 'title':'Analisis', 'valores': valores_sheet})
"""     
PATH OPERATION - GET PUT DELETE POST - API
"""


"""     
PATH OPERATION - GET PUT DELETE POST - FRONTEND
"""
#LEYENDO EL ARCHIVO QUE SUBIREMOS DESDE EL FRONTEND
@app.get(
    path='/leer_archivos_excel',
    tags=['Leyendo Files']
    )
async def leer_archivos_excel(
    request: Request, 
    nombre_file : str, 
    nombre_hoja: str):
    result = leer_excel(nombre_file, nombre_hoja)
    return templates.TemplateResponse('resultados.html', {'request': request, 'result': result})

@app.post(
    path='/guardar_excel',
    tags=["Subiendo Files"],
    summary="Subiendo Archivos: xlsx, jpg, csv, pdf")
async def guardar_excel(
    request: Request, 
    archivo: UploadFile = File(...),
    nombre: str = Form(...)):
    with open(PATH_FILES + archivo.filename, 'wb') as myfile:
        content = await archivo.read()
        myfile.write(content)
        myfile.close()
    nuevo_archivo = Archivo(nombre_file = archivo.filename, nombre = nombre)
    analisis_conn['upfile'].insert_one(nuevo_archivo.dict()).inserted_id
    return templates.TemplateResponse('index.html', {'request': request, 'result': 'Se subio el archivo con exito'})