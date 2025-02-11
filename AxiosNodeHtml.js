const express = require('express');
const axios = require('axios')
const app = express();
var bodyParser = require('body-parser');

const base_url = "http://localhost:5000";

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/public'));

app.get("/", async (req, res) => {
    try {
        const responce = await axios.get(base_url + '/book');
        res.render("books", { books: responce.data});
    }catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/book/:id", async (req, res) => {
    try {
        const responce = await axios.get(base_url + '/books/' + req.params.id);
        res.render("book", { book: responce.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
        
    }
});

app.get("/create", (req,res) => {
    res.render("create");
});

app.post("/create", async (req, res) =>{
    try {
        const data = {title: req.body.title, author: req.body.author };
        await axios.post(base_url + '/book', data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/update/:id", async (req, res) => {
    try {
        const data = {title: req.body.title, author: req.body.author };
        await axios.put(base_url + '/book'+ req.params.id, data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + '/book'+ req.params.id,);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.listen(5500, () => {
    console.log('Server started on port 5500');
});