const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require("bcrypt");
const { getAllUsers, getUserById, addUser, getPassword, deleteUser, getAllItems, getItemById, getItemsByUserId, addItem, updateItem, deleteItem } = require("./db/controllers");

//BCrypt Auth
const saltRounds = 12;
const { hash, compare } = bcrypt;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser);
app.use(cors());

// ROUTES
app.get("/users", (req, res) => {
  getAllUsers()
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(404).json({ message: 'NO MATCHING USERS' }))
})

app.get("/user/:id", (req, res) => {
  let { id } = req.params;
  getUserById(id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(404).json({message: 'NO MATCHING USER'}));
});

app.post("/user", (req, res) => {
  let { body } = req;
  let { username, pass } = body;

  hash(pass, saltRounds)
    .then((password) => {
      addUser(username, password)
        .then((data) => res.status(201).json("USER CREATED"))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

app.post("/login", (req, res) => {
  let { body } = req;
  let { username, pass } = body;

  getPassword(username)
    .then((password) => {
      compare(pass, password)
        // return a succeed or fail message, depending on the password being right
        .then((isMatch) => {
          if (isMatch) res.status(202).json("PASSWORDS MATCH");
          else res.status(401).json("PASSWORD DOES NOT MATCH");
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json("NO MATCHING USER"));
});

app.delete("/user", (req,res) => {
  let { body } = req;
  let { username, pass } = body;

  getPassword(username)
  .then((password) => {
    compare(pass, password)
    .then((isMatch) => {
      if(isMatch) {
        deleteUser(username)
        res.status(410).json("USER DELETED")
      } 
      else res.status(401).json("NO MATCH")
    })
    .catch((err) => res.status(500).json(err));
  })
  .catch((err) => res.status(500).json("NO MATCHING USER"));
})

app.get('/items', (req, res) => {
  getAllItems()
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(404).json({ message: 'NO MATCHING ITEMS' }))
})

app.get("/item/:id", (req, res) => {
  let { id } = req.params;
  getItemById(id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(404).json({message: 'NO MATCHING ITEM'}));
});

app.get("/items/:id", (req, res) => {
  let { id } = req.params;
  getItemsByUserId(id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(404).json({message: 'NO MATCHING USER'}));
})

app.post('/item', (req, res) => {
  let { body } = req;
  let {id, name, description, quantity, user_id} = body;
  addItem(body)
    .then((data) => res.status(201).json("ITEM CREATED"))
    .catch((err) => res.status(500).json(err));
})

app.patch('/item/:id', (req, res) => {
  let { id } = req.params;
  let { body } = req;
  let {name, description, quantity, user_id} = body;
  //   let itemUpdate = {
  //   "name": req.body.name,
  //   "description": req.body.description,
  //   "quantity": req.body.quantity
  // }

  updateItem(id, body)
    .then((data) => res.status(201).json("ITEM UPDATED"))
    .catch((err) => res.status(500).json(err));
})

app.delete('/item/:id', (req, res) => {
  let { id } = req.params;
  deleteItem(id)
    .then((data) => res.status(201).json("ITEM DELETED"))
    .catch((err) => res.status(500).json(err));
})
// EXPORT
module.exports = app;