const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin == "http://localhost:3000") {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PATCH',
    credentials: true,
}));

app.use(express.json())

app.use('/patients', require('./patientRoutes'))

app.listen(3500, () => console.log("Server is running..."))