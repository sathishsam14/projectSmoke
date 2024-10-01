const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const db = require('./models/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

