import glob
import shutil

for f in glob.glob('/Users/johnle/Desktop/Exames.pdf'):
    shutil.copy(f, '/Users/johnle/Desktop/PDF')