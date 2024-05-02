// Handle the form submission and display the search result
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
            
            // Fetch data from server
            let response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`)

            // Client tries to fetch data 10 times in case the server fails to catch Amazon page
            let attempts = 0
            while(!response.ok && attempts < 11){
                response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`)
                attempts++
            }

            //Display error if there is no result
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
            //Clear search result and display error message
            clearSearchResult()
            displayErrorMessage("Opa! Algo deu errado.", "Erro ao solicitar informações. Tente novamente mais tarde")
        }
    })
})
// Used to display the list of products
function displaySearchResult (products) {
    //Clear the skeleton first
    clearSearchResult()

    // Create each product card and insert it inside the products container
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

//Clear the page before showing new results or errors
function clearSearchResult(){
    var productContainer = document.getElementById('products-container')
    while (productContainer.firstChild){
        productContainer.removeChild(productContainer.firstChild)
    }
}

//Clears the page and shows the product card skeletons before showing the real product card
function displayCardStructure () {
    clearSearchResult()

    for (let i = 0; i < 12; i++) {
        const productCardStructure = new ProductCardStructure();
        document.getElementById('products-container').appendChild(productCardStructure);
    }

}

// Minimize the search bar when the search button is pressed for the first time
function minimizeSearchBar(){
    const topBar = document.getElementById('top-bar')
    topBar.style.width = '100%'
    topBar.style.height = '120px'
}

// Remove the logo and description after the search button is pressed for the first time
function removeLogoAndDescription(){
    const logo = document.getElementById('logo')
    const description = document.getElementById('description')
    if (logo) logo.remove()
    if (description) description.remove()
}

// Display error informations while fetching data
function displayErrorMessage(message, description){
    clearSearchResult()
    const errorMessage = document.getElementById('error-message')
    const errorDescription = document.getElementById('error-description')
    const errorContainer = document.getElementById('error-container')
    errorDescription.textContent = description
    errorMessage.textContent = message
    errorContainer.style.display = 'flex'
}

// Hide error informations
function hideErrorMessage(){
    clearSearchResult()
    const errorContainer = document.getElementById('error-container')
    errorContainer.style.display = 'none'
}