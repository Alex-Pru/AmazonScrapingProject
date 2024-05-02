const axios = require('axios')
const jsdom = require('jsdom')
const {JSDOM} = jsdom

const scrapePage = async (keyword) => {
    try{
    //Define the url of the page in Amazon and fetch the html
    const pageUrl = `https://www.amazon.com.br/s?k=${keyword}&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3GXM3QBEYUFOL&sprefix=${keyword}%2Caps%2C210&ref=nb_sb_noss_1`
    const {data: html} = await axios.get(pageUrl)

    //Create a JSDOM object based in the previously received HTML to use DOM manipulation
    const virtualConsole = new jsdom.VirtualConsole()
    const page = new JSDOM(html, {virtualConsole})

    //Find the node list of product cards with CSS selectors
    const resultListContainer = page.window.document.querySelector('.s-result-list')
    const itemsList = resultListContainer.querySelectorAll('.s-asin')

    //Initialize an array to store products, iterate the node list and push an object based on each element's data
    let offers = []
    itemsList.forEach((item) =>{
        try{
        const name = item.querySelector('.s-title-instructions-style h2 a span').textContent
        const rating = item.querySelector('.a-icon').textContent.substring(0, 3)
        const reviews = item.querySelector('.puis-padding-right-small div:nth-child(2) div span:nth-child(2) a span')?.textContent | "0"
        const imgUrl = item.querySelector('.s-image').src
        const productUrl = 'https://www.amazon.com.br' + item.querySelector('.a-link-normal').href
        const priceWhole = item.querySelector('.a-price-whole').textContent
        const priceFraction = item.querySelector('.a-price-fraction').textContent
        if (priceFraction == "0"){
            priceFraction = "0" + priceFraction
        }
        offers.push(
            {
                name,
                rating,
                reviews,
                imgUrl,
                productUrl,
                priceWhole,
                priceFraction
            }
        )
    }catch(err){
        //This error is expected to happen if JSDOM fails to find the requested information in each element
        console.log("Could not catch product informations.")
    }})
    return {success: true, data: offers}
}
catch(e){
    //This error is expected to happen if Axios fails to fetch HTML (Amazon tries to block bots)
    console.log("Server could not reach the page.")
}
}

module.exports = { scrapePage };