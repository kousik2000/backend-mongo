const express = require('express');
const mongoose = require('mongoose');
const Portfolio = require('./model');
const Blog = require('./blog');

const port = 9000;

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb+srv://your-mongodb-connection-string', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.post('/portfolio', async (req, res) => {
  const { title, url, imageUrl, github } = req.body;
  try {
    const newData = new Portfolio({ title, url, imageUrl, github });
    await newData.save();
    const allData = await Portfolio.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getportfoliodata', async (req, res) => {
  try {
    const allData = await Portfolio.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteportfolio/:id', async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    const allData = await Portfolio.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Blog section

app.post('/blog', async (req, res) => {
  const { title, description, url, imageUrl } = req.body;
  try {
    const newData = new Blog({ title, description, url, imageUrl });
    await newData.save();
    const allData = await Blog.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getblogdata', async (req, res) => {
  try {
    const allData = await Blog.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteblog/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    const allData = await Blog.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const server = app.listen(port, () => console.log('Server running'));
server.setTimeout(30000); // Set timeout to 30 seconds (adjust as needed)
