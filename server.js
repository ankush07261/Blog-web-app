const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");

//connecting mongoose
mongoose.connect('mongodb://127.0.0.1:27017/BlogDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to BlogDB')
});

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    let articles = [{
        title: "test",
        createdOn: new Date(),
        description: "test description"
    }]
    try {
        res.render('articles/index',{articles: articles});
    } catch (e) {
        console.log(e)
    }
    
})

app.listen(5000, function () {
    console.log("Server started on port 5000");
});

app.use('/articles',articleRouter)