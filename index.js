import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const posts = []
let postIDAssign = 0

app.use(bodyParser.urlencoded({ extended: true }))


app.listen(port, (req, res) => {
    console.log(`listening on ${port}"`)
});


app.get('/', (req,res) => {
    res.render('index.ejs', {posts})
})


app.get('/newPost', (req, res) => {
    res.render('newPost.ejs')
})


app.get('/blog/:id', (req, res) => {
    const currentArticle = posts.find(post => {
        return post.id === req.params.id
    })

    res.render('blogPost.ejs', { currentArticle })
})


app.post('/submit', (req, res) => {
    const newPost = {
        title: req.body.title,
        body: req.body.body,
        id: `${postIDAssign + 1}`
    }
    postIDAssign ++;
    posts.push(newPost);
    // console.log(posts)
    res.redirect('/')

})


app.post('/delete/:id', (req, res)=>{
    const delArticle = posts.find(post => {
        return post.id === req.params.id
    })
    const delIndex = posts.indexOf(delArticle)

    posts.splice(delIndex, 1)
    res.redirect('/')
})


app.post('/edit/:id', (req, res)=>{
    const editArticle = posts.find(post => {
        return post.id === req.params.id
    })
    res.render('editpost.ejs', {editArticle})
})

app.post('/save/:id', (req, res)=>{
    const savedArticle = posts.find(post => {
        return post.id === req.params.id
    })
    const saveIndex = posts.indexOf(savedArticle)

    posts[saveIndex].title = req.body.title
    posts[saveIndex].body = req.body.body

    res.redirect('/')
})



