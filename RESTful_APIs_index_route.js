const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));

let posts = [
    {
        id: uuidv4(),
        username: "rnh2vermaji",
        content: "Welcome to my quora profile! I love coding"
    },
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "Welcome to the quora profile of Apna College! We upload coding videos"
    },
    {
        id: uuidv4(),
        username: "dreamgirl",
        content: "Hi! I am everyone's dream girl"
    },
    {
        id: uuidv4(),
        username: "shradhakhapra",
        content: "Welcome to my quora profile! I teach coding"
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("form.ejs");
});

app.post("/posts", (req, res) => {
    //console.log(req.body);
    let { username, content } = req.body;
    let id = uuidv4();
    //console.log(`username: ${username}, content: ${content}, id: ${id}`);
    posts.push({ id, username, content });
    // res.send("Post Request working");
    res.redirect("/posts")
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(`Post you want to see in detail's id: ${id}`);
    //res.send("request working")
    res.render("detail_post.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(`Post to be updated: ${id}`);
    let newContent = req.body.content;
    console.log(`Updated content: ${newContent}`);
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    //res.send("Patch request working");
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    console.log(`Post you want to update's ID: ${id}`);
    let post = posts.find((p) => id === p.id);
    res.render("update.ejs", { post });
})

app.delete("/posts/:id/delete", (req, res) => {
    let { id } = req.params;
    console.log(`Post to delete's ID: ${id}`);
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("Listening to port 8080");
});