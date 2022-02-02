const express = require('express')
const nanoid  = require('nanoid').nanoid
const axios = require('axios')
const Url = require("../database/schema")

const env_config = process.env

const base = env_config.BASE_URL
const port = env_config.PORT
const currentEnvironment = env_config.ENV
const homeUrl = currentEnvironment === "dev" ? base + ":" + port : base

const config = { base, port, currentEnvironment, homeUrl }


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
            return response.render('home', {result: null, error: "An error occurred. Try again!", config})
        }
    }
    catch (e) {
        return response.render('home', {result: null, error: "An error occurred. Try again!", config})
    }
})

router.post("/", async (request, response) => {
    const {originalUrl} = request.body

    const urlId = nanoid()

    const shortUrl = currentEnvironment !== "dev" ? `${base}/${urlId}` : `${base}:${port}/${urlId}`
    try {
        let url = await Url.findOne({ originalUrl })
        if (url) {
            return response.render('home', {result: url.shortUrl, error: null, config})
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
            response.render('home', {result: shortUrl, error: null, config})
        }
    }
    catch (e) {
        response.render('home', {result: null, error: "An error occurred. Try again!", config})

    }
})



module.exports = router;