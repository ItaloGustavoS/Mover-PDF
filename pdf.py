import glob
import shutil

for f in glob.glob(r'C:\Users\Italo\Downloads\Python'):
    shutil.copy(f, r'C:\Users\Italo\Downloads\Python\a')