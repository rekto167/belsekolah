const express = require('express');
const connectDB = require('./config/db');
const expressBusboy = require('express-busboy');
const app = express();

//Connecting to database
connectDB();

// Initial middleware
// expressBusboy.extend(app)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.send('Server is running');
});


// Define routing
app.use('/api/days', require('./routes/api/days'));
app.use('/api/bells', require('./routes/api/bells'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server listening port ${PORT}`));