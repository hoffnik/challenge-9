// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer'); 
const { generateMarkdown } = require('./utils/generateMarkdown');

const promptUser = () => {
 return inquirer
 .prompt([
     {
         //get repo name
        type:"input",
        name: "title",
        message: "What is your repo's title?(required)",
        validate: nameInput => {
        if (nameInput) {
                return true;
            } else {
                console.log("Please enter your name!");
                return false;
            }
        } 
     },
     {
        //get repo description
        type:"input",
        name: "description",
        message: "Provide a brief description of the purpose of this project.(required)",
        validate: nameInput => {
        if (nameInput) {
                return true;
            } else {
                console.log("Please enter a project description!");
                return false;
            }
        } 
     },
     {
        //get installation instructions
        type:"input",
        name: "installation",
        message: "Provide instructions for installation.(required)",
        validate: nameInput => {
        if (nameInput) {
                return true;
            } else {
                console.log("Please enter installation instructions!");
                return false;
            }
        }      
     },
     {
        //get usage instructions
        type:"input",
        name: "usage",
        message: "Please provide instructions for use.(required)",
        validate: nameInput => {
        if (nameInput) {
                return true;
            } else {
                console.log("Please enter usage instructions!");
                return false;
            }
        } 
     },
     {
        type: "confirm",
        name: "confirmLicense",
        message: "Would you like to enter license information for this project?",
        default: false
    },
    {
        type: "list",
        name: "license",
        message: "Select the license for your project.",
        choices: ['Apache License 2.0',
            'GNU General Public License v3.0',
            'MIT License',
            'BSD 2-Clause "Simplified" License',
            'BSD 3-Clause "New" or "Revised" License',
            'Boost Software License 1.0',
            'Creative Commons Zero v1.0 Universal',
            'Eclipse Public License 2.0',
            'GNU Affero General Public License v3.0',
            'GNU General Public License v2.0',
            'Mozilla Public License 2.0',
            'The Unlicense'],
        when: ({ confirmLicense }) => {
            if(confirmLicense) { 
                return true;
            } else {
                return false;
            }
        }
    },
    {
        //get contributing guidelines
        type:"input",
        name: "contributing",
        message: "How can other users contribute to this project?",
        validate: nameInput => {
        if (nameInput) {
                return true;
            } else {
                console.log("Please enter contribution instructions!");
                return false;
            }
        } 
     },
    {
        //get testing info
        type:"input",
        name: "tests",
        message: "Please list tests to run.(required)",
        validate: nameInput => {
        if (nameInput) {
                return true;
            } else {
                console.log("Please enter test information!");
                return false;
            }
        } 
    },
    {
        //get contact info
        type:"input",
        name: "username",
        message: "What is your Github username?",
        validate: nameInput => {
        if (nameInput) {
                return true;
            } else {
                console.log("Please enter a username!");
                return false;
            }
        } 
    },
    {
        //get email
        type:"input",
        name: "email",
        message: "Enter a contact email. (Or N/A if you do not wish to provide one)",
        validate: nameInput => {
        if (nameInput) {
                return true;
            } else {
                console.log("Please enter an email or N/A");
                return false;
            }
        } 
    }
 ])

}

// TODO: Create a function to write README file
const writeToFile = (fileData) => {
    fs.writeFile('./README.md', fileData, err => {
        if(err) {
            console.log(err);
            return;
        }

        console.log("File created successfully");
    });
};

// TODO: Create a function to initialize app
function init() {    
    promptUser()
        .then(readmeJSON => {
            return generateMarkdown(readmeJSON);
        })
        .then(fileData => {
            writeToFile(fileData);
        })
        .catch(err => {
            console.log(err);
        });
}
// Function call to initialize app
init();