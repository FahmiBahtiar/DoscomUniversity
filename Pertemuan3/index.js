const express = require('express');
const fs = require('fs');
const posts = require('./posts.json')
const app = express();
const PORT= 3000;

app.use(express.json());

app.get('/api/posts', (req, res)=>{
    res.status(200).json(posts);
})

app.get('/api/post/:id',(req,res)=>{
    const post = posts.find(i => i.id === +req.params.id);
    res.status(200).json(post);
})

app.post('/api/post',(req,res)=>{
    const {title, description} = req.body;

    const id = posts[posts.length - 1].id + 1
    const post = {
        id,
        title,
        description
    }
    posts.push(post);
    fs.writeFile('posts.json', JSON.stringify(posts), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ error: 'Failed to write to file' });
        }
        console.log('Data written to file successfully');
        res.status(201).json(post);
    });

})


app.listen(PORT, ()=>{
    console.log(`listening on port : ${PORT} `);
})