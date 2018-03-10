
import sys,  getopt

cert        = ''
defaultCert = 'api/resources/cert.pem'

key         = ''
defaultKey  = 'api/resources/key.pem'

password        = ''
defaultpassword = '0a1d18a485f77dcee53ea81f1010276b67153b745219afc4eac4288045f5ca3d' 
   
try:
      opts, args = getopt.getopt(sys.argv[1:],"h:cert:key:pass:",["certfile=", "keyfile=", "pass="])
except getopt.GetoptError:
      print 'test.py -cert <pathfile> -key <pathfile>'
      sys.exit(2)
for opt, arg in opts:
      if opt == '-h':
         print 'test.py -cert <pathfile> -key <pahtfile> -pass <password>'
         sys.exit()
      elif opt in ("-cert", "--certfile"):
         cert = arg
      elif opt in ("-key", "--keyfile"):
         key = arg
      elif opt in ("-pass", "--pass"):
         password = arg

def getCert():
    if cert != '':
        return cert
    else :
        return defaultCert

def getKey():
    if key != '':
        return key
    else :
        return defaultKey

def getPass():
    if password != '':
      return password
    else :
      return defaultpassword

