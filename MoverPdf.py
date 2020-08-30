import shutil
import os
import re
from os import path

source = r"C:\Users\Italo\Downloads\Python"
destination = r"C:\Users\Italo\Downloads\a"

# - Teste de implementação Regex
# path = os.walk(r"C:\Users\Italo\Downloads\Python")
# x = re.search("^EXAMES",path)

for file in files:
    new_path = shutil.move(f"{source}/{file}", destination)
print(new_path)
