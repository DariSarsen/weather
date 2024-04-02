require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:80', 'http://localhost'],
    methods: "*",
}));


app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error occurred while fetching weather data');
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
