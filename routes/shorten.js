const express = require('express')
const nanoid  = require('nanoid').nanoid
const axios = require('axios')
const Url = require("../database/schema")


const router = express.Router();

router.get("/", async (request, response) => {
    return response.render("home", {result: null, error: null})
})

router.get("/:urlId", async (request, response) => {
    try {
        const urlId = request.params.urlId
        const url = await Url.findOne({ urlId });
        if (url) {
            url.clicks++
            url.save()
            return response.redirect(url.originalUrl)
        }
        else {
            return response.status(404).json("url not found")
        }
    }
    catch (e) {

    }
})

router.post("/", async (request, response) => {
    console.log(process.env)
    const {originalUrl} = request.body
    const base = process.env.BASE_URL
    const port = process.env.PORT
    const baseUrl = base+":"+port
    // const baseUrl = "http://localhost:"+port
    const urlId = nanoid()
    const shortUrl = `${baseUrl}/${urlId}`
    // return response.json(request.body)
    try {
        let url = await Url.findOne({ originalUrl })
        if (url) {
            return response.render('home', {result: url.shortUrl, error: null})
        }
        else {
            const check = await axios.get(originalUrl)
            url = new Url({
                originalUrl,
                shortUrl,
                urlId,
                date: new Date()
            })
            await url.save()
            response.render('home', {result: shortUrl, error: null})
        }
    }
    catch (e) {
        response.render('home', {result: null, error: "An error occurred. Try again!"})

    }
})



module.exports = router;