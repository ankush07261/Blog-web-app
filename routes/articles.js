const express = require('express');
const router = express.Router()
const Article = require('./../models/article')

router.get('/new', function (req, res) {
    res.render('articles/new',{article: new Article() })
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })

    try {
        await article.save()
        res.redirect(`articles/${article.id}`)
    } catch (err) {
        console.log(err)
        res.render('articles/new', { articles: article })
    }
});

module.exports = router;