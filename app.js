const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, function(){
    try {
        console.log(`Server is running on Port ${PORT}`);
    } catch (error) {
        console.log(`Oops the server is down. More info here: ${error}`);
    }
})