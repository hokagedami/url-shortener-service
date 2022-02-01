const express = require('express')
const nanoid  = require('nanoid').nanoid
const Url = require("../database/schema")


const router = express.Router();

router.get("/", async (request, response) => {
    return response.json({
        completed: true,
        message: "Request completed"
    })
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
    const {originalUrl} = request.body
    const base = process.env.BASE_URL
    const port = process.env.PORT
    // const baseUrl = base+":"+port
    const baseUrl = "http://localhost:"+port
    const urlId = nanoid()
    const shortUrl = `${baseUrl}/${urlId}`
    try {
        let url = await Url.findOne({ originalUrl })
        if (url) {
            return response.json(url)
        }
        else {
            url = new Url({
                originalUrl,
                shortUrl,
                urlId,
                date: new Date()
            })
            await url.save()
            return response.send(url)
        }
    }
    catch (e) {
        return response.status(500).json('Server Error:: '+ e.message);
    }
})



module.exports = router;