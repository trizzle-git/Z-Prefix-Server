const app = require("./app");
const port = 8080;

app.listen(process.env.PORT || port, () => {
  console.log(`Listening for server on Port: ${port}`)
})