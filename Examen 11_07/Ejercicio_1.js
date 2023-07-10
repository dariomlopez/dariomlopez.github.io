const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const posts = [
  {
    id: 1,
    title: "Título",
    content: "Contenido"
  }
];

app.get("/", (request, response) => {
  response.json(posts)
});

app.post("/", (request, response) => {
  let newPost = request.body;
  posts.push(newPost);
  response.status(201).json(newPost);
});

app.listen(3000, () => {
  console.log("https://localhost:3000")
})