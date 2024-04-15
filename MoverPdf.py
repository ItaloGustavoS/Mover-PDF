import shutil
import os

source_dir = r"C:\Users\Italo\Downloads\Python"
destination_dir = r"C:\Users\Italo\Downloads\a"

if not os.path.exists(destination_dir):
    os.makedirs(destination_dir)

for file in os.listdir(source_dir):
    source_file = os.path.join(source_dir, file)
    if os.path.isfile(source_file):
        destination_file = os.path.join(destination_dir, file)
        shutil.copy2(source_file, destination_file)
        print(f"{file} copied to {destination_dir}")
