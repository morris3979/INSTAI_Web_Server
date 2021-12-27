const express = require('express');
const { createConnection } = require('typeorm');
const apiRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 8080;

createConnection(); //typeorm connection

app.use(express.static('dist'));
app.use("/api", apiRouter); // mount api router
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(port, () => console.log(`Listening on port ${port}!`));
