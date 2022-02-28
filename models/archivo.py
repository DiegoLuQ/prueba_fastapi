from pydantic import BaseModel

class Archivo(BaseModel):
    nombre_file : str
    nombre: str

