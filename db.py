import os

from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()
#conn = MongoClient(os.getenv('DATABASE'))
conn = MongoClient()