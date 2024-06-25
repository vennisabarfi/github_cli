const {Command} = require("commander");
const program  = new Command();
const chalk = require("chalk");
const inquirer = require('inquirer'); //read documentation
const ora = require("ora");
 const {octokit} = require("octokit");
 
program.version("1.0.0").description("My Node CLI");

 program.action(function(){
    inquirer
    .prompt([
        {
            type: "list",
            name: "choice",
            message: "Choose an option: ",
            choices: ["Option 1", "Option 2","Option 3"],
        }
    ])
    .then(function(result){
        const spinner = ora(`Doing ${result.choice}...`).start(); //Start the spinner

        setTimeout(function(){
            spinner.succeed(chalk.green("Done!"));
        }, 3000);
    })
 })
    program.parse(process.argv);