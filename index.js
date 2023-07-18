const express = require('express');
const mongoose = require('mongoose');
const Portfolio = require('./model');
const cors = require('cors'); // Import 'cors' module here
const Blog = require('./blog');

const app = express();
app.use(cors()); // Enable CORS middleware

app.use(express.json());

mongoose.set('strictQuery', false);

mongoose
  .connect('mongodb+srv://user1234:hellouser@cluster0.jjghdhu.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

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

// Blog section

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

app.listen(9000, () => console.log('Server running on port 9000'));
