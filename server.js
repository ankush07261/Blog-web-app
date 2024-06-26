//DECLARATIONS
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

//connecting mongoose
mongoose.connect('<mongodb_url>',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to BlogDB')
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// POST/GET methods
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

app.post("/delete", async(req, res) =>{
    const deleteArticle = req.body.deleteThis;
    try {
        await Article.findByIdAndRemove(deleteArticle);
        res.redirect("/");
        console.log("Article "+deleteArticle+" deleted successfully")
    } catch (err) {
        console.log(err);
    }  
})

app.listen(5000, function () {
    console.log("Server started on port 5000");
});

app.use('/articles',articleRouter)
