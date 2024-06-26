# Amazon Scraper ![Brazil](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/br.png "Brazil")
(Scroll down to reach the english version of the Readme, still, this app is made to work with brazilian Amazon.)<br>
Este aplicativo tem como propósito pesquisar uma determinada palavra no site da Amazon e retornar uma lista de produtos da mesma. Ele foi construído com Node, Express, JSDOM e Axios no backend e HTML, CSS e JavaScript no Frontend.
### Backend
Para carregar os produtos, o servidor carrega a página da Amazon realizando uma requisição com Axios para o site da mesma com o nome dos produtos que você digitar no frontend, lembrando que a Amazon tem mecanismos para evitar que bots como esse acessem seu site, então é possível que ocorra algum erro neste processo. Após isso, utilizando a biblioteca JSDOM para manipular a DOM da página HTML adquirida, a API cria uma lista de objetos alcançando os valores de nome, preço e mais informações do produto utilizando seletores CSS, conseguindo assim os valores de texto de cada uma das tags HTML.
### Frontend
Ao iniciar a página, o app possui uma interface simples com um campo de busca e um botão para executar a pesquisa.
![image](https://github.com/Alex-Pru/AmazonScrapingProject/assets/142506709/2044f5dc-3e5b-4c97-aeab-4056cc986807)
| --------------------- |
Ao executar uma pesquisa, o app esconde os detalhes desnecessários e demonstra uma animação de carregamento para representar os produtos que virão.
![image](https://github.com/Alex-Pru/AmazonScrapingProject/assets/142506709/6b639905-08d0-43f4-abfe-6bf61586fbc1)
Caso a API esteja desligada, a página demonstrará o erro:
![image](https://github.com/Alex-Pru/AmazonScrapingProject/assets/142506709/2ec36693-a018-4bf3-b813-6dd7edcdf592)
Caso o programa funcione normalmente, a página demonstrará os produtos desejados:
![image](https://github.com/Alex-Pru/AmazonScrapingProject/assets/142506709/9d50b337-f151-466b-bd94-e2fa3102a94d)

# Como Rodar?
```
git clone https://github.com/Alex-Pru/AmazonScrapingProject.git
cd AmazonScrapingProj
```
### Rodando o servidor:
```
cd amazonWebScraping
npm install
npm run dev
```
### Rodando o página:
Você pode utilizar o live-server do Vscode. <br>
Também é possível abrir o arquivo index dentro da pasta webScrapingClient em um navegador de sua escolha.

# Lidando com erros:
Como é possível ver no video a seguir, o aplicativo lida perfeitamente com os erros caso a busca realizada não retorne nenhum produto, ou caso a API venha a cair.

# Demo:

![2024-05-0215-01-37-ezgif com-video-to-gif-converter](https://github.com/Alex-Pru/AmazonScrapingProject/assets/142506709/8e2a3757-3e23-41a0-bebe-04be24a769ad)
| --------------------- |

# Amazon Scraper ![United States](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/us.png "United States") ![United Kingdom](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/gb.png "United Kingdom") ...
This web app scrapes the first page of search results on Amazon given a search keyword. It's built using Node, Express, Axios, and JSDOM for the backend, and vanilla HTML, CSS, and JavaScript for the frontend.

# How to run?
```
git clone https://github.com/Alex-Pru/AmazonScrapingProject.git
cd AmazonScrapingProj
```

#### To run the server:
```
cd amazonWebScraping
npm install
npm run dev
```

#### To run the client:
You can use Vscode's live server or just open the index.html file in the "webScrapingClient" folder.

# Handling errors:
In the preview video above is possible to see the web app handling errors like: The search didn't return any product and the case where the api stopped working.
