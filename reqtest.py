import requests

url = 'https://ypay.co.il/main/index/login'

myobj = {'email': 'shahar', 'password':"shoshi"}
x = requests.post(url, data = myobj)
print(x.text)