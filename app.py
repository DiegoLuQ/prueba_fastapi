from os import getcwd

from starlette.responses import RedirectResponse
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from models.archivos import Archivo
from db import conn
from routers import archivos, presupuesto

app = FastAPI()

app.include_router(archivos.app)
app.include_router(presupuesto.router)
templates = Jinja2Templates(directory='templates')
app.mount('/static', StaticFiles(directory='static'), name='static')

@app.get(
    path='/',
    tags=['App-Home'],
    summary="Inicio del App")
async def home(request: Request):
    return templates.TemplateResponse('index.html', {'request': request, 'title':'StartAPP'})
