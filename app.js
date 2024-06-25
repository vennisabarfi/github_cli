const express = require('express');
const app = express();
const axios = require('axios').default;
const yargs = require('yargs');
const PORT = 3000;
let argv = yargs.argv; //parse command line arguments 


// Use yarg
app.listen(PORT, function(){
    try {
        console.log(`Server is running on Port ${PORT}`);
    } catch (error) {
        console.log(`Oops the server is down. More info here: ${error}`);
    }
})