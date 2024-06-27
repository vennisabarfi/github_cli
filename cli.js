const {Command} = require("commander");
const program  = new Command();
const chalk = require("chalk");
const inquirer = require('inquirer'); //read documentation 
const ora = require("ora");
const fs = require('fs');
const {Octokit} = require("octokit"); 

//File path to save results
const file_path = `${process.cwd()}`; //current directory
console.log(file_path);
try {
    require('dotenv').config(); //load .env file
} catch (error) {
    console.log(`Error loading secret keys. Info: ${error}`);
}

// console.log(process.env.github_TOKEN);


const octokit = new Octokit({
    auth: process.env.github_TOKEN,
})


//or no authentication(lower rate limit and limited endpoints)
//const octokit = new Octokit({});


//add try and catch statements to authenticate information given for owner, repo and ref (do this in testing)
program.version("1.0.0").description("My Node CLI");

const optionsArray = ["Track Commit Status", "View Repository Activity", "View Number of Repo Contributers and Number of Commits","List Repository Issues"];
 program.action(function(){
    inquirer
    .prompt([
        {
            name: "owner",
            type: "input",
            message: chalk.blue("Enter your github username: ")
        },
        {
            name: "repo",
            type: "input",
            message: chalk.red("Enter the github repo name: ")
        },
        {
            name: "ref",
            type: "input",
            message: chalk.green("Enter the branch name: ")
        },
        {
            type: "list",
            name: "choice",
            message: "Choose an option: ",
            choices: optionsArray,
            default: "Track Commit Status",
        },
        
    ]) 
    .then(async function(result){
        //include pagination to results here. Track commit status on a branch.
        if(result.choice == "Track Commit Status"){
            try {
                let response = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}',
                    {
                        owner: result.owner,
                        repo: result.repo,
                        ref: result.ref,
                        headers:{

                        }
                    }
                )
                console.log(response.data); //find a way to narrow down to commit
            } catch (error) {
            console.log(`Error Completing Task. More info here: ${error}`);
            }
        }
        else if(result.choice == "View Repository Activity"){
            try {
                let response = await octokit.request('GET /repos/{owner}/{repo}/activity',
                    {
                        owner: result.owner,
                        repo: result.repo,
                        ref: result.ref,
                        headers:{
                            
                        }
                    }
                )
           
                console.log(response.data); //find a way to narrow down to commit
            } catch (error) {
            console.log(`Error Completing Task. More info here: ${error}`);
            }
        }

        else if(result.choice == "View Number of Repo Contributers and Number of Commits"){
            try {
                let response = await octokit.request('GET /repos/{owner}/{repo}/contributors',
                    {
                        owner: result.owner,
                        repo: result.repo,
                        ref: result.ref,
                        headers:{
                            
                        }
                    }
                )
                //filter for important information 
                let contributors = response.data.map(function(contributor){
                    const{login,id,html_url,site_admin, contributions} = contributor;
                    return{login, id,html_url, site_admin, contributions}
                });
                console.log(contributors); 
            } catch (error) {
            console.log(`Error Completing Task. More info here: ${error}`);
            }
        }
        
        else if(result.choice == "List Repository Issues"){
            try {
                let response = await octokit.request('GET /repos/{owner}/{repo}/issues',
                    {
                        owner: result.owner,
                        repo: result.repo,
                        ref: result.ref,
                        headers:{
                            
                        }
                    }
                )
                //filter for important information 
                console.log(response); 
                return inquirer
                .prompt([
                    {
                        name: "save_file",
                        type: "confirm",
                        message: chalk.blue("Save Results to File?: "),
                    },])
                    .then(function(answers){
                        try {
                            if(answers.save_file){
                                fs.writeFileSync(`${file_path}\issues_list.txt`, JSON.stringify(response, null, 4), 'utf8'); // pretty print
                                const spinner = ora(`Saving Results to File...`).start();
                                setTimeout(function(){
                                    spinner.succeed(chalk.green(`Results saved to: ${file_path}\\issues_list.txt`)); 
                                }, 3000);
                            }
                            else{
                                console.log("Results not saved!");
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    })

                     //integrate this properly into if condition
                    const spinner = ora(`Completing Task: ${result.choice}...`).start(); //Start the spinner
                    setTimeout(function(){
                    spinner.succeed(chalk.green("Done!"));
                    }, 3000);
            } catch (error) {
            console.log(`Error Completing Task. More info here: ${error}`);
            }
        }
    })
 
 })
    program.parse(process.argv);