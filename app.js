const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get('/', (req, res)=>{
    res.send("You are on root directory of PlusLife backend app!");
});
const loginRoute = require("./routes/login");
app.use('/login', loginRoute);
const registerRoute = require('./routes/register');
app.use('/register', registerRoute);
const profile = require('./routes/profile')
app.use('/profile', profile);
const myProfile = require('./routes/myProfile')
app.use('/myProfile', myProfile);
const newMeetingRoute = require('./routes/newMeeting');
app.use('/newMeeting', newMeetingRoute);
const meetings = require('./routes/meetings');
app.use('/meetings', meetings);
const removeMeeting = require('./routes/removeMeeting')
app.use('/removeMeeting', removeMeeting);
const changeCurrentTokenNo = require('./routes/changeCurrentTokenNo');
app.use('/changeCurrentTokenNo', changeCurrentTokenNo);
const search = require('./routes/search');
app.use('/search', search);
const cronJobs = require('./routes/cronJobs');
app.use('/cronJobs', cronJobs);
const generateMeetingUrl = require('./routes/generateMeetingUrl');
app.use('/generateMeetingUrl', generateMeetingUrl);

dotenv.config();
//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to DB");
    }
);
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Listening server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
});