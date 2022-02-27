from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from db import conn


app = FastAPI()
producto_conn = conn.santiago_filtros.productos


templates = Jinja2Templates(directory='templates')
app.mount('/static', StaticFiles(directory='static'), name='static')

@app.get('/')
async def Home(request: Request):
    return templates.TemplateResponse('index.html', {'request': request, 'title':'Hello Heroku'})


@app.get('/productos')
async def productos(request: Request):
    lista = list()
    query = producto_conn.find({},{'_id': 0})
    for i in query:
        lista.append(i)
    return templates.TemplateResponse('resultado.html', {'request':request, 'title':'ConnMongo', 'lista':lista})

def prueba():
    query = producto_conn.find({},{'_id':0})
    lista = {}
    for i in query:
        lista = i
    print(lista.keys())
