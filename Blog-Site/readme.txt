-------------------------------------------------
NPM packages
-------------------------------------------------
1. npm init -y
2. npm i express
3. npm i express-handlebars
4. npm i nodemon
- to start -> npx nodemon src/server.js
5.  

------------------------------------------------
 Basic Strategy and Setup
-------------------------------------------------
1. const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();
app.use(express.json());

app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path(__dirname, "views"));

app.listen(8080, () => console.log("Server is listening on port 8080!"));

-------------------------------------------------
 Creating the Blog Pages
-------------------------------------------------
1.const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();
app.use(express.json());

app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home", {
    layout: false,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: false,
  });
});

app.get("/", (req, res) => {
  res.render("articles-list", {
    layout: false,
  });
});

app.get("/individual-article", (req, res) => {
  res.render("about", {
    layout: false,
  });
});

app.listen(8080, () => console.log("Server is listening on port 8080!"));
2.<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>Welcome to My Blog!</h1>
    <p>On this site, you will find lots of useful information...</p>
</body>
</html>
3. <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About</title>
</head>
<body>
    <h1>About Me</h1>
    <p>Ever since i can remember, I've loved writing articles...</p>
</body>
</html>
-------------------------------------------------
Displaying a List of Articles
-------------------------------------------------
1.const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const articles = require('./articles-data')

const app = express();
app.use(express.json());

app.engine("hbs", engine({ defaultLayout: false}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home", {});
});

app.get("/about", (req, res) => {
  res.render("about", {});
});

app.get("/article", (req, res) => {
  res.render("articles-list", {
    articles,
  });
});

// app.get("/individual-article", (req, res) => {
//   res.render("individual-article", {});
// });

app.listen(8080, () => console.log("Server is listening on port 8080!"));
2. articles-data.js  file


-------------------------------------------------
Using Custom Handlebars Helpers
-------------------------------------------------
1.<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List</title>
</head>
<body>
    <h1>Articles</h1>
    <div id="articles-container">
        {{#each articles}}
        <div>
            <h3>{{this.title}}</h3>
            <p>{{shorten this.content.[0] 200}}...</p>
        </div>
        {{/each}}
    </div>
</body>

</html>
2.const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const articles = require("./articles-data");

const app = express();
app.use(express.json());

app.engine(
  "hbs",
  engine({
    defaultLayout: false,
    helpers: {
      shorten: (str, length) => str.slice(0, length),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home", {});
});

app.get("/about", (req, res) => {
  res.render("about", {});
});

app.get("/articles", (req, res) => {
  res.render("articles-list", {
    articles,
  });
});

// app.get("/individual-article", (req, res) => {
//   res.render("individual-article", {});
// });

app.listen(8080, () => console.log("Server is listening on port 8080!"));



-------------------------------------------------
Rendering Individual Articles
-------------------------------------------------
1. app.get("/articles/:articleId", (req, res) => {
  const { articleId } = req.params;
  const matchingArticle = articles.find((a) => a.id === articleId);
  res.render("individual-article", {
    article: matchingArticle,
  });
});
2.<body>
    <h1>Articles</h1>
    <div id="articles-container">
        {{#each articles}}
        <div>
            <h3> <a href="/articles/{{this.id}}">{{this.title}}</a></h3>
            <p>{{shorten this.content.[0] 200}}...</p>
        </div>
        {{/each}}
    </div>
</body>


--------------------------------------------------------
Reducing Template Repetition with Partials and Layouts
--------------------------------------------------------
1. partials and layouts
2. created partials and layout folder and did some basic changes

==========================================================================================================================
==========================================================================================================================
==========================================================================================================================
==========================================================================================================================
NEW MODULE-
==========================================================================================================================
==========================================================================================================================
==========================================================================================================================
==========================================================================================================================

-------------------------------
Adding Upvotes to the Front-end
-------------------------------
1. <script>
    function onUpvote() {
        const upvotesSpan = document.getElementById('number-of-upvotes');
        const numberOfUpvotes = Number(upvotesSpan.innerText);
        upvotesSpan.innerText = numberOfUpvotes + 1;
        const articleId = "{{ article.id }}";
        fetch(`/api/articles/${articleId}/upvotes`, { method: 'put' });

    }
</script>
<h1>{{ article.title }}</h1>
<div>
    <p>This article has been upvoted <span id="number-of-upvotes">{{ article.upvotes }} </span> time(s)</p>
    <button onclick="onUpvote();">Update</button>
</div>
{{#each article.content}}
<p>{{ this }}</p>
{{/each}}


---------------------------------
Adding Comments to the Front-end
---------------------------------
1.


-------------------------------
Adding Comments to the Back-end
-------------------------------
1.


---------------------------------
Two Methods for Formatting Dates
----------------------------------
1.


-----------------------------------
Building a Reusable Articles List
------------------------------------
1.
