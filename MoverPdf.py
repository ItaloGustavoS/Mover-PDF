import shutil
import os
from os import path
from importlib.metadata import files

source = r"C:\Users\Italo\Downloads\Python"
destination = r"C:\Users\Italo\Downloads\a"

for file in files:
    new_path = shutil.move(f"{source}/{file}", destination)
print(new_path)
