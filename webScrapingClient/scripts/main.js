document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('searchBar').addEventListener('submit', async function (event){
        event.preventDefault()
        const keyword = document.getElementById('searchInput').value.replace(/\s/g, '+')

        try{
            minimizeSearchBar()
            hideErrorMessage()
            removeLogoAndDescription()
            clearSearchResult()
            displayCardStructure()
            

            let response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`)
            let attempts = 0
            while(!response.ok && attempts < 11){
                response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`)
                attempts++
            }

            if(response.ok){
                const products = await response.json()

                if(products.data.length === 0){
                displayErrorMessage("Não foram encontrados resultados.", "Tente procurar outro produto.")
                }else{
                    displaySearchResult(products.data)
                    }   
            }       
            else{
                throw new Error('Error while fetching data.')
            }
        }
        catch(e){
            clearSearchResult()
            displayErrorMessage("Opa! Algo deu errado.", "Erro ao solicitar informações. Tente novamente mais tarde")
            console.log(e)
        }
    })
})

function displaySearchResult (products) {
    clearSearchResult()

    products.forEach(product => {
        const productCard = new ProductCard()
        productCard.image = product.imgUrl
        productCard.link = product.productUrl
        productCard.price = product.priceWhole + product.priceFraction
        productCard.name = product.name
        productCard.numberOfRatings = product.reviews
        productCard.starRating = parseFloat(product.rating.split(','))
        document.getElementById('products-container').appendChild(productCard)
    });
}

function clearSearchResult(){
    var productContainer = document.getElementById('products-container')
    while (productContainer.firstChild){
        productContainer.removeChild(productContainer.firstChild)
    }
}

function displayCardStructure () {
    clearSearchResult()

    for (let i = 0; i < 12; i++) {
        const productCardStructure = new ProductCardStructure();
        document.getElementById('products-container').appendChild(productCardStructure);
    }

}

function minimizeSearchBar(){
    const topBar = document.getElementById('top-bar')
    topBar.style.width = '100%'
    topBar.style.height = '120px'
}

function removeLogoAndDescription(){
    const logo = document.getElementById('logo')
    const description = document.getElementById('description')
    if (logo) logo.remove()
    if (description) description.remove()
}

function displayErrorMessage(message, description){
    clearSearchResult()
    const errorMessage = document.getElementById('error-message')
    const errorDescription = document.getElementById('error-description')
    const errorContainer = document.getElementById('error-container')
    errorDescription.textContent = description
    errorMessage.textContent = message
    errorContainer.style.display = 'flex'
}

function hideErrorMessage(){
    clearSearchResult()
    const errorContainer = document.getElementById('error-container')
    errorContainer.style.display = 'none'
}