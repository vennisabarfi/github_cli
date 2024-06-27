const express = require('express');
const app = express();
const PORT = 3000;
const cli_tool = require('./cli');

//use tool here
app.use(cli_tool);

app.listen(PORT, function(){
    try {
        console.log(`Server is running on Port ${PORT}`);
    } catch (error) {
        console.log(`Oops the server is down. More info here: ${error}`);
    }
})