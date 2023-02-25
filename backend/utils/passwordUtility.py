import bcrypt
import base64 
from Crypto.Cipher import AES

def hashPassword(password):
    return bcrypt.hashpw(password, bcrypt.gensalt())

def verifyPassword(password, hash):
    return bcrypt.checkpw(password, hash)

def decryptPassword(password):
    joinedData = base64.b64decode(password)
    iv = joinedData[:16]
    encrypted = joinedData[16:] 
    key = base64.b64decode("aR1h7EefwlPNVkvTHwfs6w==")
    aes = AES.new(key, AES.MODE_CBC, iv)      
    encrypted = aes.decrypt(encrypted)      
    return unpadPkcs7(encrypted)
    #password = base64.b64decode(password)
    # cipher = AES.new(key, AES.MODE_EAX)
    # plaintext = cipher.decrypt(base64.b64decode(password))
    # return str(plaintext)

def unpadPkcs7(data):
  return data[:-ord(data[-1])]