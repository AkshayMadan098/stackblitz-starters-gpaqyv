const cors = require('cors');
const express = require('express');
const { getAllMovies, getMovieById } = require('./controllers');

const app = express();
app.use(cors());
app.use(express.json());

//Endpoint1
app.get('/movies', async (req, res) => {
  const movies = getAllMovies();
  res.json({ movies });
});

//Endpoint2
app.get('/movies/detail/:id', async (req, res) => {
  let movie = getMovieById(parseInt(req.params.id));
  res.json({ movie });
});

module.exports = { app };
