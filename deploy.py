server = 'files.000webhost.com'
username = 'MaxStuff'
password = '6@vLK!Sn99GZwvn'
myPath = 'maxstuff.net'
import os.path, os.path
from ftplib import FTP, error_perm


host = 'localhost'
port = 21

ftp = FTP()
ftp.connect(server,21)
ftp.login(username,password)
filenameCV = myPath
def valid_file(name):
    x = True
    if name.startswith("SyncToy") and name.endswith(".dat"):
        x = False
    return x
def placeFiles(ftp, path):
    for name in os.listdir(path):
        localpath = os.path.join(path, name)
        if os.path.isfile(localpath):
            if valid_file(name):
                print("STOR", name, localpath)
                ftp.storbinary('STOR ' + name, open(localpath,'rb'))
            else:
                print("SKIP", name, localpath)
        elif os.path.isdir(localpath):
            print("MKD", name)

            try:
                ftp.mkd(name)

            # ignore "directory already exists"
            except error_perm as e:
                if not e.args[0].startswith('550'): 
                    raise

            print("CWD", name)
            ftp.cwd(name)
            placeFiles(ftp, localpath)           
            print("CWD", "..")
            ftp.cwd("..")

placeFiles(ftp, filenameCV)

##ftp.quit()
