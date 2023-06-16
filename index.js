const express = require('express');
const mongoose = require('mongoose');
const Portfolio = require('./model');
const Blog = require('./blog');

const port = 9000;

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb+srv://kousikramachandruni:Anjaneya@cluster0.jjghdhu.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('DB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.post('/portfolio', async (req, res) => {
  try {
    const { title, url, imageUrl, github } = req.body;
    const newData = new Portfolio({ title, url, imageUrl, github });
    await newData.save();
    const allData = await Portfolio.find();
    return res.json(allData);
  } catch (err) {
    console.error('Error creating portfolio:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getportfoliodata', async (req, res) => {
  try {
    const allData = await Portfolio.find();
    return res.json(allData);
  } catch (err) {
    console.error('Error retrieving portfolio data:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteportfolio/:id', async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    const allData = await Portfolio.find();
    return res.json(allData);
  } catch (err) {
    console.error('Error deleting portfolio:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Blog section

app.post('/blog', async (req, res) => {
  try {
    const { title, description, url, imageUrl } = req.body;
    const newData = new Blog({ title, description, url, imageUrl });
    await newData.save();
    const allData = await Blog.find();
    return res.json(allData);
  } catch (err) {
    console.error('Error creating blog:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getblogdata', async (req, res) => {
  try {
    const allData = await Blog.find();
    return res.json(allData);
  } catch (err) {
    console.error('Error retrieving blog data:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteblog/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    const allData = await Blog.find();
    return res.json(allData);
  } catch (err) {
    console.error('Error deleting blog:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => console.log('Server running on port', port));
