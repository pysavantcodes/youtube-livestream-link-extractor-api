const puppeteer = require("puppeteer");

const extractUrls = require("extract-urls");
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(morgan('combined'));
app.get('/', (req, res) => {
    res.send("Hello");
});

app.use((err,req,res,next)=>{
    res.status(500);
    res.json({msg:"Error occured",data:err?.msg});
});

app.post("/generate", (req, res) => {

    (async() => {
        console.log("Hello");
        // res.send({ result: [], message: "fetching" })
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0);
        await page.goto(req.body.link)

        const html = await page.content()


        urls = html.split("https://").map(val => { return "https://" + val }).slice(1).filter(link => { return link.includes("index.m3u8") })
        let foundURL = extractUrls(urls[0]);
        res.send({ result: foundURL, message: "none" })



        await browser.close()
    })();


})

// starting the server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('listening on port 5000');
});
