const express = require("express");
const app = express();

app.get('/', (req, res)=>{
    res.send("You are on root directory of PlusLife backend app!");
});

// Listening server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
});