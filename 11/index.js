// TODO: Include packages needed for this application
// DEPENDENCIES
const inquirer = require('inquirer');
const fs = require('fs');
const {generateMarkdown} = require('./generateMarkdown');


// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Give the description of your project?',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide installation instructions.',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Explain how to use the software, including command-line instructions, if applicable.',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Provide guidelines for those who want to contribute to the project',
  },
  {
    type: 'input',
    name: 'test',
    message: 'Provide information on how to run tests for the software or codebase.',
  },
  {
    type: 'input',
    name: 'github',
    message: 'Provide your github profile name to contact you: ',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Provide your email to contact you: ',
  },
  {
    type: 'list',
    message: 'Select the project license',
    name: 'license',
    choices: ['MIT License', 'GNU General Public License (GPL)', 'Apache License 2.0', 'None'],
  },

  

];


// TODO: Create a function to write README file
function writeToFile(filename, data) {
        
    fs.writeFile(filename, data, "utf8", (error) =>  error ? console.error(error) : console.log('Success!'));
}


// TODO: Create a function to initialize app
function init() {
        console.log('===================================================================')
        console.log('The following prompts will create a README.md.\nThe title of the project will be the name of the Markdown document.');
        console.log('===================================================================')
        
        inquirer.prompt (questions)

          .then((answer) => {
            const templateREADME = generateMarkdown(answer);

            const filename = `${answer.title.toUpperCase().split(' ').join('')}.md`;

            writeToFile(filename, templateREADME);
      
            console.log(answer);
            // console.log(templateREADME);
          })
};


// Function call to initialize app
init();


