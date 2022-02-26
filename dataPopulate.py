
import requests, json, time, uuid, base64

# Script data populate

urlAPIBOOK = "https://anapioficeandfire.com/api/books/"

urlMyAPI = "http://127.0.0.1:3000/"
#urlMyAPI = "" 

response = requests.get(urlAPIBOOK).json()
#bookName = "A Game of Thrones" #o livro desejado para os personagens

def getRes(response, bookName): # função para pegar o livro GOT e suas informarções
    for i in response:
        if i['name'] == bookName:
            return i

#resBook = getRes(response, bookName)
#povchars = resBook['povCharacters']

urlMyAPIPost = urlMyAPI+"got/povchar/new"
def povCharPOST(povchars, urlMuAPIPost): #Função para adicionar os povCharacters de GOT no db
    for x in povchars:
        res = requests.get(x).json()
        body = res
        #print(body)
        requests.post(urlMyAPIPost, body)
        #print(f"ADD: {res['name']}-{res['culture']}")
        time.sleep(1)
    return

def updtChars(): # FUNÇÃO PARA TIRAR AS INFORMAÇÕES EM URL DOS povCharacters
    #urlMyApiGet = urlMyAPI+'got/povchar'
    urlMyApiGet = urlMyAPI+"allcharacters/chars"
    
    res = requests.get(urlMyApiGet).json()
    #print(res)
    try:
        for i in res:
            allegiances = []
            spouse = []
            books = []
            povBooks = []
            father = ""
            mother = ""
            if "https" in i['father']:
                respFather = requests.get(i['father']).json()
                father = respFather['name']

            if "https" in i['mother']:
                respMother = requests.get(i['mother']).json()
                mother = respMother['name']

            for a in i['allegiances']:
                time.sleep(1)
                if "https" not in a:
                    break
                else:
                    respA = requests.get(a).json()
                    allegiances.append(respA['name'])
            for b in i['spouse']:
                time.sleep(1)
                if "https" not in b:
                    break
                else:
                    respB = requests.get(b).json()
                    spouse.append(respB['name'])
            for c in i['books']:
                time.sleep(1)
                if "https" not in c:
                    break
                else:
                    respC = requests.get(c).json()
                    books.append(respC['name'])
            for d in i['povBooks'] :
                time.sleep(1)
                if "https" not in d:
                   break
                else:
                    respD =requests.get(d).json()
                    povBooks.append(respD['name'])
            
        
            #urlMyAPIPut = urlMyAPI+f"got/povchar/up/{i['_id']}"
            urlMyAPIPut = urlMyAPI+f"allcharacters/char/up/{i['_id']}"
            body = {
                "mother":mother,
                "father":father,
                "allegiances":allegiances,
                "spouse":spouse,
                "books":books,
                "povBooks":povBooks
            }
            #body = json.dumps(body, indent=4) O Body já está no formato JSON
            req = requests.put(urlMyAPIPut, data=body)
            print(i['name'], " - put")
    except Exception as e:
        print(e)
    return 


def addCommonChars(): #adicionar todos os personagens de todos os livros
    try :
        urlPOSTALLCHARS = urlMyAPI+"allcharacters/char/new"
        for i in response:
            for char in i['characters']:
                charRES = requests.get(char).json()
                if charRES['playedBy'][0] == '' :
                    charRES['playedBy'] = ["Unknown"]
                print(charRES['playedBy'])
                requests.post(urlPOSTALLCHARS, charRES)
    except Exception as e:
        print(e)


def postBooksOnDB():##função para inserir informações dos livros 
    urlBookPost = urlMyAPI+"book/new"
    for book in response:
        try:
            body = {
                "name":book['name'],
                "isbn":book['isbn'],
                "url":book['url']
            }
            posting = requests.post(urlBookPost, body)
            if posting:
                print(book['name'], book['isbn'], book['url'], "--- ADDED")
        except Exception as e:
            print(e)


def generateAndPutBase64Books(): ## Função pra fazer put nos books para inserir o formato das capas em base64
    try:
        urlBookPutToBase64 = urlMyAPI+"book/cover/up/"
        booksToGetISBN_URL = urlMyAPI+"book/books"
        booksToGetISBN = requests.get(booksToGetISBN_URL).json()
        for book in booksToGetISBN:
            fileName_IMG = book['isbn']+'-M.jpg'
            with open ("./bookCoversToBase64/"+fileName_IMG, "rb") as imgFile :
                str64 = base64.b64encode(imgFile.read())
            url64PUT = urlBookPutToBase64+book['isbn']
            body = {"base64":str64}
            requests.put(url64PUT, body)
            print(book['name'], "-- 64 up -")

    except Exception as e:
        print(e)
