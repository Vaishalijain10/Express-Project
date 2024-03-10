const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const articles = require("./articles-data");

const app = express();
app.use(express.json());

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    partialsDir: path.join(__dirname, "views", "partials"),
    helpers: {
      shorten: (str, length) => str.slice(0, length),
      formatDate: (dateObj) => dateObj.toLocaleDateString(),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    articles: articles.slice().sort((a1, a2) => a2.upvotes - a1.upvotes),
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/articles", (req, res) => {
  res.render("articles-list", {
    articles,
    title: "Articles",
  });
});

app.get("/articles/:articleId", (req, res) => {
  const { articleId } = req.params;
  const matchingArticle = articles.find((a) => a.id === articleId);
  res.render("individual-article", {
    article: matchingArticle,
    title: matchingArticle.title,
    articles: articles.filter((a) => a.id !== articleId),
  });
});

app.put("/api/articles/:articleId/upvotes", (req, res) => {
  const { articleId } = req.params;
  const matchingArticle = articles.find((a) => a.id === articleId);
  matchingArticle.upvotes += 1;
  res.json(matchingArticle);
});

app.post("/api/articles/:articleId/comments", (req, res) => {
  const { articleId } = req.params;
  const matchingArticle = articles.find((a) => a.id === articleId);
  const { author, text } = req.body;
  const newComment = {
    author,
    text,
    createdAt: new Date().toLocaleDateString(),
  };

  matchingArticle.comments.push(newComment);
});

app.listen(8080, () => console.log("Server is listening on port 8080!"));
