const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('', async (req, res) => {
    try {
        const response = await axios.get('http://hn.algolia.com/api/v1/search?tags=front_page');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.post('', async (req, res) => {
    const query = req.body.query || '';
    try {
        const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});


app.listen(3000, () => console.log('Server running on port 3000'));
