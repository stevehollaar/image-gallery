const express = require('express');

const app = express();

const {
  PORT = 9000,
} = process.env;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('index');
});

const server = app.listen(PORT, () => {
  const { port } = server.address();

  console.log(`Listening on port ${port}`);
});
