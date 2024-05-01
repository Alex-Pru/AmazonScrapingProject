const axios = require('axios')
const jsdom = require('jsdom')
const {JSDOM} = jsdom

let getPageUrl = (query) => `https://www.amazon.com.br/s?k=${query}&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3GXM3QBEYUFOL&sprefix=${query}%2Caps%2C210&ref=nb_sb_noss_1`


const scrapePage = async (keyword) => {
    try{
    const pageUrl = getPageUrl(keyword)
    const {data: html} = await axios.get(pageUrl)

    const virtualConsole = new jsdom.VirtualConsole()
    const page = new JSDOM(html, {virtualConsole})
    const resultListContainer = page.window.document.querySelector('.s-result-list')
    const itemsList = resultListContainer.querySelectorAll('.s-asin')

    let offers = []
    itemsList.forEach((item) =>{
        try{
        const name = item.querySelector('.s-title-instructions-style h2 a span').textContent
        const rating = item.querySelector('.a-icon').textContent.substring(0, 3)
        const reviews = item.querySelector('.puis-padding-right-small div:nth-child(2) div span:nth-child(2) a span')?.textContent | "0"
        const imgUrl = item.querySelector('.s-image').src
        const productUrl = 'https://www.amazon.com.br' + item.querySelector('.a-link-normal').href
        const priceWhole = item.querySelector('.a-price-whole').textContent
        const priceFraction = item.querySelector('.a-price-fraction')?.textContent | "00"
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
        console.log("Could not catch product informations.")
    }})
    return {success: true, data: offers}
}
catch(e){
    console.log("Server could not reach the page.")
}
}

module.exports = { scrapePage };