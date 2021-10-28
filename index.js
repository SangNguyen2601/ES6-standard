const inquirer = require('inquirer');
const fs = require('fs');

// Define some variable.
const firstQuestion = [{
    type: 'list',
    name: 'reptile',
    message: 'What would you do?',
    choices: ['Insert', 'Update', 'Delete', 'Show all files'],
}]

const chooseInsert = [{
    type: 'list',
    name: 'typeInsert',
    message: 'What type insert you want?',
    choices: ['Insert new file', 'Insert content to a file'],
}]

inquirer
  .prompt(firstQuestion)
  .then((answers) => {
    switch (answers.reptile) {
        case "Insert":
            inquirer
                .prompt(chooseInsert)
                .then((answers) => {
                    switch (answers.typeInsert){
                        case "Insert new file":
                            addNewFile();
                            break;
                        case "Insert content to a file":
                            chooseForInsert();
                            break;
                    }
                })
            break;
        case "Update":
            // TODO: do some update function here
            break;
        case "Delete":
            chooseForDelete();
            break;
        case "Show all files":
            // TODO: Something for list all file
            break;
    }
  });

  const addNewFile = () => {
    inquirer
        .prompt([
            {
                name: 'filename',
                message: 'Please insert title of file:',
                validate: function validatename(name){
                    return name !== '';
                }
            },
            {
                name: 'content',
                message: 'Write your content:',
                default: '',
            },
        ])
        .then((answers) => {
            fs.writeFile(`./files/${answers.filename}.json`, `${answers.content}`, (err) => {
                if (err) 
                    console.log(err);
                else
                    console.log("Create file successfully!");
            });
        });
  }

  const chooseForInsert = () => {
    var listFile = [];
    fs.readdir("./files", (err, files) => {
        files.forEach(file => {
            listFile.push(file);
        })
        
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'chooseFile',
                    message: 'What file you want to insert?',
                    choices: listFile,
                },
                {
                    name: 'content',
                    message: 'Write your content:',
                    default: '',
                }
            ])
            .then((answers) => {
                insertContent(answers.filename, answers.content);
            })
    })
  }

  const insertContent = (filename, content) => {
    fs.writeFile(`./files/${filename}.json`, `${content}`, (err) => {
        if (err) 
            console.log(err);
        else
            console.log("Insert file successfully!");
    });
  }

  const chooseForDelete = () => {
    var listFile = [];
    fs.readdir("./files", (err, files) => {
        files.forEach(file => {
            listFile.push(file);
        })
        
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'chooseFile',
                    message: 'What file you want to insert?',
                    choices: listFile,
                }
            ])
            .then((answers) => {
                deleteFile(answers.filename);
            })
    })
  }

  const deleteFile = (filename) => {
    fs.unlinkSync(`./files/${filename}.json`);
  }
