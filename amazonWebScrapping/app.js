const express = require("express")
const router = require("./src/routes/routes")

const app = express()
const PORT = process.env.PORT || 3000

//Avoid using cors lib by using the settings below
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use("/api", router)

app.listen(PORT, () => {
    console.log(`The api is listening on port ${PORT}`)
})