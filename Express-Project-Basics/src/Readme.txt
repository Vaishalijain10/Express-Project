//1. key feature of express is to allow the request to handle it in multiple ways.

//2. imported express that's why we putted "type" : module

//3. let express = require('express'); line 2 and 3 are same
import express from "express";

//4. fs stands for "file system". core module in Node.js that provides a way of working with the file system on your computer.

//5. Various operations such as reading from files, writing to files, manipulating files, creating directories, deleting files, etc.
// import fs from "fs";

//6.  the readFile function from the fs module to read the contents of a file named "my-file.txt".
// fs.readFile("my-file.txt", "utf-8", (err, data) => {
//   console.log("file read.");
// });

//7. calling express to create a server named as app
const app = express();

//8. to create multiple server
// const app1 = express();
// we can do something like this

//9. to start the server
//      app.listen(8080);
//      8080 is the port -> 127.0.0.1:8080
//      to access the server

//10. these 3 things we need to run the server
//   import express , app.use and listen

//11. to run the server we need to the below command in terminal
//      node src/server.js

//12. to end the server running we need to stop the server
//      ctrl + C
//      Y/N - yes/no for confirming the server to stop or not.

//13. adding routes  - Routes Handlers - they handle the request when server receives a requests
// this functions call a route handler
//13.1 req - request object about is about the information received.
//13.2 res - response object allows to send back the message and perform the task associated with the request.
//13.3 console.log("The server has received a request from app.use()" + req.path );
//13.4 res.send automatically display the message in browser - URL -> localhost:8080
//13.5 req.path is to  specify the path.
//     app.use((req, res) => {
//      console.log(`The server has received a request from app.use() ${req.path}`);
//     res.send("Hello from Express!");
//       });

//14. callback function
app.listen(8080, () => console.log("Server is listening on port 8080."));


//15. other way to separate route by path
// app.use('/users',(req, res) => {
//     res.send("The user is : Vaishali Jain");
// });
// app.use('/products',(req, res) => {
//     res.send("The site has 100 products");
// });
// app.use((req, res) => {
//     res.send("Unrecognized Path");
// });


// 16 other way to  separate route by path
//  app.use((req, res) => {
//   if (req.path === "/user") {
//     res.send("The user is : Vaishali Jain");
//   } else if (req.path === "/products") {
//     res.send("The site has 100 products");
//   } else {
//     res.send("Unrecognized Path");
//   }
// });


//17. GET, POST, PUT, DELETE are the types of request.
// by default - browser  is set to GET REQUEST METHOD
//GET METHOD
        app.get("/products", (req, res) => {
        res.send("Received a GET request on " + req.path);
        });
// /products:productId - url parameters
        app.get("/products:productId", (req, res) => {
        console.log(req.query);
        //   req.params.productId;
        let { productId } = req.params;
        res.send(`Here is the product with id: ${productId}`);
        });

//POST METHOD && 19.1 Request bodies - require middleware!!
        app.post("/products", (req, res) => {
        let body = req.body;
        console.log(body);
        res.send(
            `Received a POST request on /products and the product  id is:
            ${body.productId}`
        );
        });
        app.post("/login", (req, res) => {
        let { username, password } = req.body;
        res.send(
            `Logging in user with username ${username} and password ${password}`
        );
        });

//PUT METHOD
        app.put("/products", (req, res) => {
        res.send("Received a PUT request on" + req.path);
        });

//DELETE METHOD
        app.delete("/products", (req, res) => {
        res.send("Received a DELETE request on" + req.path);
        });

        
//18. CURL - command allows us to send the simple req.
// it allows to display the message of browser in content in the TERMINAL.
// curl http://localhost:8080/products   //(by default - GET REQ.)
// output : Received a POST request on /products
// specifying the type of request using -X
// curl -X type _of_req   http://localhost:8080/products
// eg: curl -X POST   http://localhost:8080/products
// output:  Received a POST request on /products

// 19. POSTMAN allows you  to craft different types of request.



//20. Handling the Request Body!//   there are 3 ways to add extra data to a servers
//      1.      Request body (usually JSON)
//      2.      URL Parameters /client is sending request to /products/sunscreen/1008 - unique id - {productId :123}
//      3.      Query parameters /client is sending request to separate part of url using "? and other symbols" -  ?search=expressjs&type=videos

app.use(express.json()); //Middleware

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
21. Methods for Customizing Responses
// response is in json format instead of string.
// because of res.json  = res.send with message attribute in both forms generally considered json.
// some other type - json,xml..
// creating status - 201
app.get("/products", (req, res) => {
  //      res.json({ message: `Received a GET request on ${req.path}`});

  //      res.status(201).json({message: `Everything is good!`});

  // it provide all the information which contains error.

  //      let myObject = undefined;
  //      let something = myObject.a;

  // Creating a new resource
  //       res.sendStatus(201);
  // output - created

  // set - header type
  //       res.set("Content-Type", "application/xml");
  //       res.send();

  
  // set - header type
  //       res.set('message', 'Hello!');
  //       res.send();

//   console.log(req.headers);
//   console.log(req.params);

});

22. Working with Cookies
import express from "express";
// npm install cookie-parser
import cookieParser from "cookie-parser";

const app = express();

//calling imported packages
app.use(express.json());
app.use(cookieParser());

// 1. how to send back cookies to client side
// 2. how to process cookies!

app.get("/products", (req, res) => {
  // console.log(req.headers);
  console.log(req.cookies);
  // req.body;
  // to  set different header values and its response / message.
  // res.set('My-Header', 'Hello!')
  // sending cookie to Shopping-Cart and its value is empty.
  res.cookie('shoppingCart', 'Empty');
  // sending response
  res.send("Here is a cookie");
});

app.put('/shopping-cart', (req, res) => {
  const { productId } = req.body;
  const { shoppingCart } = req.cookies;

  if (shoppingCart) {
    res.cookies("shoppingCart", shoppingCart + ` ,${productId}`);
  } else {
    res.cookie("shoppingCart", productId);
  }

  res.json({ message: "Successfully added item to cart!" });
});

app.listen(8080, () => console.log(`Server is listening on port 8080...!!!`));


23. Adding Middleware to Express Servers

                        npm i nodemon
                        npx nodemon filename - to  start nodemon

import express from "express";
import cookieParser from "cookie-parser";
const app = express();
// there are the middle ware
app.use(express.json()); // -> req.body = ...
app.use(cookieParser()); // -> req.cookies
// basic syntax for middleware  - requires 3 parameters - res, req and next.
// next point to the next route or middleware
// app.use((req,res,next) =>{
//   //...
//   console.log('one!')
//   next();
// })
// app.use((req,res,next) =>{
//   //...
//   console.log('one!')
//   next();
// })
app.use((req, res, next) => {
  // console.log(`Received a ${req.method} request on ${req.path}`);
  // next();
  const { username, password } = req.body;
  if (username !== "V" && password !== "123456789") {
    return res.sendStatus(401);
  }
  next();
});
app.get("/products", (req, res) => {
  res.cookie("shoppingCart", "Empty");
  res.send("Here is a cookie");
});
app.put("/shopping-cart", (req, res) => {
  const { productId } = req.body;
  const { shoppingCart } = req.cookies;
  if (shoppingCart) {
    res.cookie("shoppingCart", shoppingCart + ` ,${productId}`);
  } else {
    res.cookie("shoppingCart", productId);
  }
  res.json({ message: "Successfully added item to cart!" });
});
app.listen(8080, () => console.log(`Server is listening on port 8080...!!!`));


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


24. creating a list endpoint - 'Read' by using get method
// created new file  'user.js'
import users from "./users.js";

// creating end points -
// Read (Load) -> "List" ,"Read one" , "Search"
// Update
// Delete

// Read
app.get("/users", (req, res) => {
  // Make DB Query
  res.json(users);
  console.log(`Method is ${req.method} and path is ${req.path}`);
});

25. Reading individual resources 
// -> GET /users/123
app.get("/users/:userId", (req, res) => {
  let { userId } = req.params;
  let user = users.find((user) => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

26.  Creating a Search Endpoint

        1.  dealing with nested comment in object file -
                // Comment: [
                //   {
                //     id: "200",
                //     text: "Great!",
                //   },
                // ],
                // app.get("/users/:userId/comments/:commentId", (req, res) => {
                //   let { userId, commentId } = req.params;

                //   let user = users.find((user) => user.id === userId);
                //   let comment = user.comments.find((comment) => comment.id === commentId);
                // });

        2. // search url -> http://localhost:8080/users?search=sh
                app.get("/users", (req, res) => {
                let { search } = req.query;
                if (search) {
                let matches = users.filter((user) => user.username.includes(search));
                res.json(matches);
                } else {
                res.json(users);
                }
                });

27. adding new users
// creating end points - adding new users
// npm install  uuid
app.post("/users", (req, res) => {
  let { username } = req.params;

  let newUser = {
    id: uuid(),
    username,
    password,
    numberOfArticles: 0,
  };
  users.push(newUser);
  res.status(201).json(users);
});

28. Delete and Update endpoint
// Update
app.use("/users/:userId", (req, res) => {
  let { userId } = req.params;
  let { username, numberOfArticles } = req.body;

  let user = users.find((user) => user.id === userId);

  if (user) {
    user.username = username;
    user.numberOfArticles = numberOfArticles;
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

//Delete
app.use("/users/:userId", (req, res) => {
  let { userId } = req.params;
 let userIndex = user.findIndex((user) => user.id === userId);

  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    res.json(users);
  } else {
    res.send("Id does not exists!");
  }
});



----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

28. Front-end vs. Back-end Execution
    splitting code btw back end and front end 
    reduce cost
    assessable and efficient 

29. Front-end Execution Basics

// EVERY CHAPTERS WILL BE IN  REST OF THE FOLDERS..

                TILL THAN STAY TUNE!!
    

