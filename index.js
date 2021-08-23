const inquirer = require('inquirer');
const fs = require('fs');

const firstQuestion=[{
    type: 'list',
    name: 'reptile',
    message: 'What do you want to do?',
    choices: ['Insert', 'Update', 'Delete', 'Show all files'],
}]

const chooseInsert=[{
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
                    //console.log(answers);
                    switch (answers.typeInsert){
                        case "Insert new file":
                            addNewFile();
                            break;
                        case "Insert content to a file":
                            chooseFile();
                            break;
                    }
                })
            break;
        case "Update":
            //TODO: do some update function here
            break;
        case "Delete":
            //TODO: delete function here
            break;
        case "Show all files":
            //confuse :)
            break;
    }
  });

  const addNewFile = () =>{
        inquirer
        .prompt([
            {
            name: 'filename',
            message: 'What is filename?',
            validate: function validatename(name){
                    return name !== '';
                }
            },
            {
            name: 'content',
            message: 'What is contents?',
            default: '',
            },
        ])
        .then((answers) => {
                        fs.writeFile(`./files/${answers.filename}.json`, `${answers.content}`, (err)=>{
                if (err) 
                    console.log(err);
                else
                    console.log("Create file successfully!");
            });
        });
  }

  const chooseFile = () =>{
    var listFile =[]
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
            .then((answers)=>{
                insertContent();
            })
    })
  }

  const insertContent = () =>{

  }