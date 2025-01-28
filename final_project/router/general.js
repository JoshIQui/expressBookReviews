const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    // Register a new user
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Username or Password missing."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //return res.status(200).json(JSON.stringify(books));

    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(books)
        },1000)
    })

    myPromise.then((books) => {
        return res.status(200).json(JSON.stringify(books));
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    // const { isbn } = req.params;

    // if (books[isbn])
    // {
    //     return res.status(200).json(JSON.stringify(books[isbn]));
    // } else {
    //     return res.status(404).json({message: "Book not found"});
    // }

    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            const { isbn } = req.params;

            if (books[isbn]) {
                resolve(books[isbn]);
            } else {
                reject("Book not found");
            }
        },1000)
    })

    myPromise.then(
        (data) => { if (data) return res.status(200).json(data) },
        (err) => { return res.status(404).json({message: "Book not found"}) }
    );
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    // const { author } = req.params;

    // for (let key in books) {
    //     if (books[key].author === author)
    //     {
    //         return res.status(200).json(JSON.stringify(books[key]));
    //     }
    // }

    // return res.status(404).json({message: "Book not found"});

    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            const { author } = req.params;

            for (let key in books) {
                if (books[key].author === author)
                {
                    resolve(books[key]);
                }
            }
            reject("Book not found");
        },1000)
    })

    myPromise.then(
        (data) => { if (data) return res.status(200).json(data) },
        (err) => { return res.status(404).json({message: "Book not found"}) }
    );
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // const { title } = req.params;

    // for (let key in books) {
    //     if (books[key].title === title)
    //     {
    //         return res.status(200).json(JSON.stringify(books[key]));
    //     }
    // }

    // return res.status(404).json({message: "Book not found"});

    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            const { title } = req.params;

            for (let key in books) {
                if (books[key].title === title)
                {
                    resolve(books[key]);
                }
            }
            reject("Book not found");
        },1000)
    })

    myPromise.then(
        (data) => { if (data) return res.status(200).json(data) },
        (err) => { return res.status(404).json({message: "Book not found"}) }
    );
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const { isbn } = req.params;

    if (books[isbn])
    {
      return res.status(200).json((books[isbn].reviews));
    } else {
      return res.status(404).json({message: "Book not found"});
    }
});

module.exports.general = public_users;
