from os import getcwd

from starlette.responses import RedirectResponse
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from models.archivo import Archivo
from db import conn
from routers import archivos

app = FastAPI()

app.include_router(archivos.app)

templates = Jinja2Templates(directory='templates')
app.mount('/static', StaticFiles(directory='static'), name='static')

@app.get(
    path='/',
    tags=['App-Home'],
    summary="Inicio del App")
async def home(request: Request):
    return templates.TemplateResponse('index.html', {'request': request, 'title':'StartAPP'})
