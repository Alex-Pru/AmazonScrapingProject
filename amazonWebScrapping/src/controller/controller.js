const { scrapePage } = require("../service/scrapingService")

const getProductList = async function (req, res) {
    try{
        const keyword = req.query.keyword;
        const response = await scrapePage(keyword)

        if(!response.success){
            res.status(500).json({ success: false, error: scrapePage.error})
        }
        res.send({ success: true, data: response.data})
    }
    catch(e){
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: 'Try again'
        })
    }
}

module.exports = {getProductList}