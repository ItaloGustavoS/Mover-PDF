import os
import shutil

caminho_original = r'C:\caminho'
caminho_novo = r'C:\caminhodestino'

try:
    os.mkdir(caminho_novo)
    except FileExistsError as e:
        print('Pasta {caminho_novo} já existe.')

for root, dirs, files in os.walk(caminho_original):
    for file in files:
        old_file_path = os.path.join(root, file)
        new_file_path = os.path.join(caminho_novo, file)

        if 'EXAMES.pdf' in file:
        shutil.move(old_file_path, new_file_path)
        print('Arquivo {file} copiado com sucesso!')
