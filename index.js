const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Portfolio = require('./model');
const Blog = require('./blog');
const InsightSchema = require('./assignment');

const app = express();

app.use(cors({
    origin: 'https://portfolio-frontend-rose-seven.vercel.app'
}));

app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://user1234:hellouser@cluster0.jjghdhu.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(
    () => console.log('DB connected')
).catch(err => console.log(err));

// Portfolio Routes

app.post('/portfolio', async (req, res) => {
    const { title, url, imageUrl, github } = req.body;
    try {
        const newData = new Portfolio({ title, url, imageUrl, github });
        await newData.save();
        return res.json(await Portfolio.find());
    } catch (err) {
        console.log(err.message);
    }
});

app.get('/getportfoliodata', async (req, res) => {
    try {
        const allData = await Portfolio.find();
        return res.json(allData);
    } catch (err) {
        console.log(err.message);
    }
});

app.delete('/deleteportfolio/:id', async (req, res) => {
    try {
        await Portfolio.findByIdAndDelete(req.params.id);
        return res.json(await Portfolio.find());
    } catch (err) {
        console.log(err.message);
    }
});

// Blog Routes

app.post('/blog', async (req, res) => {
    const { title, description, url, imageUrl } = req.body;
    try {
        const newData = new Blog({ title, description, url, imageUrl });
        await newData.save();
        return res.json(await Blog.find());
    } catch (err) {
        console.log(err.message);
    }
});

app.get('/getblogdata', async (req, res) => {
    try {
        const allData = await Blog.find();
        return res.json(allData);
    } catch (err) {
        console.log(err.message);
    }
});

app.delete('/deleteblog/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        return res.json(await Blog.find());
    } catch (err) {
        console.log(err.message);
    }
});

//something

app.post('/assignment', async (req, res) => {
    const { impact,
        intensity,
        sector,
        topic,
        insight,
        url,
        region,
        start_year,
        end_year,   
        added,
        published,
        country,
        relevance,
        pestle,
        source,
        title,
        likelihood } = req.body;
    try {
        const newData = new InsightSchema({ impact,
            intensity,
            sector,
            topic,
            insight,
            url,
            region,
            start_year,
            end_year,   
            added,
            published,
            country,
            relevance,
            pestle,
            source,
            title,
            likelihood });
        await newData.save();
        return res.json(await InsightSchema.find());
    } catch (err) {
        console.log(err.message);
    }
});


app.get('/getassignment', async (req, res) => {
    try {
        const allData = await InsightSchema.find();
        return res.json(allData);
    } catch (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "An error occurred while fetching data." });
    }
});



app.listen(9000, () => console.log('Server running on port 9000'));
