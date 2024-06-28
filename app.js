const express = require('express');
const bookRoutes = require('./src/books/routes');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.use('/books', bookRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})