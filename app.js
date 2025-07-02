const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const entryRoutes = require('./routes/entry-routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

let = allowedOrigins = [];
try {
    // ✅ Allow CORS for your frontend domain
    allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS);
} catch (error) {
    console.error('Error loading environment variables:', error);
    throw new Error('Invalid ALLOWED_ORIGINS format in .env file. It should be a JSON array.');
}

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// ✅ Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/entries', entryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
