const {Command} = require("commander");
const program  = new Command();
const chalk = require("chalk");
const inquirer = require('inquirer'); //read documentation 
const ora = require("ora");
const {octokit, Octokit} = require("octokit"); 

try {
    require('dotenv').config(); //load .env file
} catch (error) {
    console.log(`Error loading secret keys. Info: ${error}`);
}

// console.log(process.env.github_TOKEN);


const ocktokit = new Octokit({
    auth: process.env.github_TOKEN,
})

//or no authentication(lower rate limit and limited endpoints)
//const octokit = new Octokit({});

//add try and catch statements to authenticate information given for owner, repo and ref
program.version("1.0.0").description("My Node CLI");

 program.action(function(){
    inquirer
    .prompt([
        {
            name: "owner",
            type: "input",
            message: "Enter your github username: "
        },
        {
            name: "repo",
            type: "input",
            message: "Enter the github repo name: "
        },
        {
            name: "ref",
            type: "input",
            message: "Enter the branch name: "
        },
        {
            type: "list",
            name: "choice",
            message: "Choose an option: ",
            choices: ["Track Commit Status: ", "Option 2: ","Option 3: "],
        },
     
    ])
    .then(function(result){
        const spinner = ora(`Doing ${result.choice}...`).start(); //Start the spinner

        setTimeout(function(){
            spinner.succeed(chalk.green("Done!"));
        }, 3000);
    })
 })
    program.parse(process.argv);