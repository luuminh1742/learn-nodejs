const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');

const Auth = require('./src/middleware/auth.middleware');
const bookRouter = require('./src/routers/book.router');
const authRouter = require('./src/routers/auth.router');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api', authRouter);
app.use(Auth.isAuth);
app.use('/api', bookRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})