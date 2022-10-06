const knex = require("./dbConnection");

function getAllUsers() {
  return knex("users").select('*');
}

function getUserById(id) {
  return knex("users")
    .where({id: id})
    .select('*')
}

function addUser(username, password) {
  return knex("users")
    .insert({ username, password })
    .then((data) => data);
}

function getPassword(username) {
  return knex("users")
    .where({ username })
    .select(`password`)
    .then((data) => data[0].password);
}

function deleteUser(username) {
  return knex("users")
    .select("*")
    .where({username: username})
    .del()
    .then((data) => data);
}

function getAllItems() {
  return knex("items").select('*')
}

function getItemById(id) {
  return knex("items")
  .where({id: id})
  .select('*')
}

function getItemsByUserId(id) {
  return knex("items")
  .where({user_id: id})
  .select('*')
}

function addItem(body) {
  return knex("items")
  .insert({ name: body.name, description: body.description, quantity: body.quantity, user_id: body.user_id })
  .then((data) => data);
}

function updateItem(id, body) {
  return knex("items")
  .where({id})
  .update({...body})
  .then((data) => data);
}

function deleteItem(id) {
  return knex("items")
  .select('*')
  .where({id: id})
  .del()
  .then((data) => data);
}
module.exports = { getAllUsers, getUserById, addUser, getPassword, deleteUser, getAllItems, getItemById, getItemsByUserId, addItem, updateItem, deleteItem };