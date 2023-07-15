import express, { query } from "express"
import fetch from "node-fetch";
import cors from 'cors'
import path from "path"
import { dirname } from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)



const app = express()

app.use(express.json()).use(cors()).use(express.static(path.join(__dirname, 'dist')))

const PORT = process.env.PORT || 8080

app.get('/api/weatherInfo', async (req, res) => {
    const zip = req.query.zip
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&lang=en&appid=cd57d3389972999e23471cf04ce5f48b`;

    try {
        const response = await fetch(url);
        const result = await response.text();
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

app.get('/', (req, res) => {
    console.log(path.join(__dirname, 'dist', 'index.html'))
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => { console.log("Listening on Port:" + PORT) })
