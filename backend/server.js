const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connecting to database
connectDB();

app.get('/', (req, res)=>{
    res.send('Server is running');
});

// Initial middleware
app.use(express.json({extend: true}));

// Define routing
app.use('/api/days', require('./routes/api/days'));
app.use('/api/bells', require('./routes/api/bells'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server listening port ${PORT}`));