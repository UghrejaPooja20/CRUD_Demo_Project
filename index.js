const { log } = require('console');
const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extendex : true}));
app.use(methodOverride('_method'));
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));

let posts = [{
        id : uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        username : "Pooja",
        content : "I Love Coding.!"
    },
    {
        id :uuidv4(),
        username : "Ashit",
        content : "Hello World.i am pooja!"
    }, 
    {
        id : uuidv4(),
        username : "Kriva",
        content: "I am kid...!"
    }];

app.get('/posts', (req, res) => {
    // console.log(posts);
    res.render("index.ejs", {posts});  
});

app.get('/posts/new', (req, res) => {
    // console.log(posts);
    res.render("newPost.ejs");  
});

app.post('/posts' , (req, res)=> { 
   
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id, username , content});
    console.log(req.body);  
    res.redirect("/posts");
});

app.get('/posts/:id', (req, res)=> {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id == p.id);
    console.log(post);
    res.render("showPost.ejs",{post});
    
});

app.get('/posts/edit/:id', (req, res) =>{
    console.log("hello");
    let {id } = req.params;
    console.log("id", id);
    let post = posts.find((p) => id == p.id);
    console.log("post",post);
    res.render("edit.ejs",{post});
});

app.patch('/posts/:id', (req, res) =>{
    let { id } =req.params;
    console.log(id);
    let newcontent = req.body.content;
    console.log("newcontent",newcontent);
    let post = posts.find((p) => id == p.id);
    post.content = newcontent;
    console.log("post",post);
    // res.send("post request working.!");
     res.redirect("/posts");
});

app.delete('/posts/:id' , (req, res)=>{
    let { id } =req.params;
    posts = posts.filter((p) => id !== p.id);
    // res.send("delete request working..")
    res.redirect("/posts");
});

app.listen(port, ()=> {
    console.log(`server is running on port : ${port}`);
    
});