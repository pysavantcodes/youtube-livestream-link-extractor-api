const puppeteer = require("puppeteer");

const extractUrls = require("extract-urls");
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const request = require("request");


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(morgan('combined'));
app.get('/', (req, res) => {
    res.send("Hello");
});
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.post("/generate", (req, res) => {

    request(req.body.link, (err, body) => {

        let urls = body.body.split("https://").map(val => { return "https://" + val }).slice(1).filter(link => { return link.includes("index.m3u8") })
        let foundURL = extractUrls(urls[0]);
        res.send({ result: foundURL, message: "none" })

    })
})

// starting the server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('listening on port 5000');
});