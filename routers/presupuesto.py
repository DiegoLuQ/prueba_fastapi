from os import getcwd
from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from db import conn
import pandas as pd
import numpy as np
import json
router = APIRouter(
    prefix='/presupuesto',
    responses={404:{'description': 'Not Found'}}
)
PATH_FILE = getcwd() + '/static/db/'

templates = Jinja2Templates(directory='templates')
router.mount('/static', StaticFiles(directory='static'), name='static')


def leer_excel():
    df = pd.read_excel(io="static/db/presupuesto.xlsx", sheet_name='dp_22')
    df.to_json("static/db/presupuesto2.json", orient = "records")
    with open("static/db/presupuesto2.json", "r") as j:
        mydata = json.load(j)
        return mydata
    # resultado = pd.DataFrame(df)
    # datos = df.to_numpy().tolist()

@router.get('/pre_sep')
async def pre_sep(request: Request):
    return templates.TemplateResponse('sep_presupuesto.html', {'request': request, 'title':'Datos PME'})

@router.get('/ruta/leer_datos')
async def ruta():
    results = leer_excel()
    return results


