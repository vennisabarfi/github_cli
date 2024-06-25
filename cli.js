const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers'); //handles the process.argv.slice logic
const axios = require('axios'); 
const { requiresArg } = require('yargs');


const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 --url <url> [options]') //<url> is placeholder for API endpoint URL
    .help('help').alias('Show help information', 'h') //customized to show help info
    .version('help').alias('help', 'h') //update with version of current cli tool
    .options({
        url:{ //API endoint url
            alias: 'u',
            description: 'API endpoint URL',
            requiresArg: true,
            required: true,
            type: 'string'
        },
        headers: {
            alias: 'H',
            description: 'Headers to include in the request',
            requiresArg: true,
            type: 'array'
    },
    params : { //query parameters for url
        alias : 'p',
        description : 'Query parameters for the request',
        requiresArg: true,
        type: 'array'
    }
})
.example('$0 --url https://api.example.com/data --params key1=value1 key2=value2', 'Make a GET request to an API with query parameters')
.argv;