const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes/user')
require('./src/config/db');

const app = express();
const port = 5000;


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Where we will keep books
app.use(cors());
app.use(express.json());
app.use('/api/auth',userRoutes);

app.post('/book', (req, res) => {
    // We will be coding here
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));