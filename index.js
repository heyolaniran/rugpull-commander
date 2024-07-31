#!/usr/bin/env node 


const {Command} = require('commander'); 

const inquirer = require('inquirer'); 

const {analyze} = require('./src/ai-prompt')

const fs = require('fs'); 

const path = require('path')

const program = new Command() ; 

program.name('rugpull')
.description('Audit Smart contract for security , performance and rugpull metrics')
.version('1.0.0')


const getApiKey = async () => {

    const { apiKey } = await inquirer.createPromptModule({
        type: 'input',
        name: 'apiKey', 
        message: 'Enter your API Key', 
        validate: (input) => input.length > 0 || ' API KEY IS REQUIRED'
    }); 

    return apiKey ; 
}


program.command('check <file>').description('Analyse a smart contract')
.action(async (file) => {
    try {
        const apiKey =  await getApiKey() ; 

        const contractPath =  path.resolve(process.cwd() , file); 

        console.log('checking contract at path : ', contractPath) ; 

        if(!fs.existsSync(contractPath)) {
            console.error('File not found'); 
            process.exit(1)
        }

        if(fs.statSync(contractPath).isDirectory()) {

            console.error('This is a directory')
            process.exit(1) ;
        }

        const contract = fs.readFileSync(contractPath, 'utf-8') ; 

    } catch (error) {
        
        console.error(`Error : ${error.message}`)
    }
})

program.parse(process.argv)