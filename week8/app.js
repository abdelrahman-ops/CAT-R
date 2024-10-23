const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


mongoose.connect('mongodb://localhost:27017/sticky_notes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
    content: String,
});

const Note = mongoose.model('Note', noteSchema);


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/add-note', (req, res) => {
    res.render('add-note');
});

app.post('/add-note', (req, res) => {
    const newNote = new Note({
        content: req.body.content,
    });
    newNote.save(() => {
        res.redirect('/notes');
    });
});


app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.render('notes', { notes });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
