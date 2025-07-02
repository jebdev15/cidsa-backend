const express = require('express');
const dotenv = require('dotenv');
const entryRoutes = require('./routes/entry-routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/entries', entryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
