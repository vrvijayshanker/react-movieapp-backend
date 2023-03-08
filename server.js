const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors');

const app = express()

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://vijayvr:mongo123@cluster0.iccguao.mongodb.net/movies", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
.catch(console.error)

const Movie = require('./models/Movies')

//View All movie
app.get('/allmovies', async(req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

//Add Movie
app.post('/addmovie', (req,res) => {
    const addmovie = new Movie({
        title: req.body.title,
        yearReleased: req.body.yearReleased,
        director: req.body.director,
        language: req.body.language,
        producer: req.body.producer,
        actors: req.body.actors,
        camera: req.body.camera,
        posterLink: req.body.posterLink,
        trailerLink: req.body.trailerLink

    });

    addmovie.save();

    res.json(addmovie);
    res.status(201).json(addmovie);
    console.log(addmovie);
});

//get one movie

app.get('/getmovie/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
});


//Delete Movie
app.delete('/delete/:id', async(req,res) => {
    const result = await Movie.findByIdAndDelete(req.params.id);

    res.json(result);
});

// Update Movie Details
app.post('/update/:id', (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        yearReleased: req.body.yearReleased,
        director: req.body.director,
        language: req.body.language,
        producer: req.body.producer,
        actors: req.body.actors,
        camera: req.body.camera,
        posterLink: req.body.posterLink,
        trailerLink: req.body.trailerLink
    }, { new: true })
      .then(updatedData => {
        res.json(updatedData);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error updating data');
      });
  });

// app.get("/api", (req, res) => {
//     res.json({ "users": ["user1", "user2", "user3", "user4"] })
// })

app.listen(5000, () => { 
    console.log("Server started on Port 5000") 
});