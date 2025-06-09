import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const posts = [
    {
        title: 'The Silent Forest',
        content: 'Deep in the heart of the Himalayas, where the winds whispered secrets and the trees stood tall like ancient guardians, lay a forest untouched by time. It was said that those who entered could hear the past echo in the rustling leaves. Aarav, a curious botanist, ventured into the woods to discover more than just rare plants—he uncovered stories of a forgotten tribe, a hidden civilization, and an ancient promise made to protect the forest at all costs.',
        author: 'Aarav Mehta',
        date: new Date()
    }
];

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts});
});

app.get('/post', (req, res) => {
    res.render('makePosts.ejs');
});

app.post('/addPost', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;

    try {
        const newPost = {
            title: title,
            content: content,
            author: author,
            date: new Date()
        }
        posts.push(newPost);
        res.redirect('/');
    } catch(err) {
        console.log(err);
    }
});

app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    const post = posts[index];

    if(post) {
    res.render('editPost.ejs', {
        index: index,
        title: post.title,
        author: post.author,
        content: post.content
    }); } else {
        res.status(404).send('Post not found');
    }
});

app.post('/editPost', (req, res) => {
    const index = req.body.index;
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;

    try {
        posts[index] = {
            title: title,
            content: content,
            author: author,
            date: new Date()
        }
        res.redirect('/');
    } catch(err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});