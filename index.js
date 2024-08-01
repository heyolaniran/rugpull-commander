#!/usr/bin/env node 


//const {Command} = require('commander'); 
import inquirer from 'inquirer';

import { Command } from 'commander';

import {analyze} from './src/ai-prompt.js' 

import fs from 'fs'

import path from 'path';

const program = new Command() ; 

program.name('rugpull')
.description('Audit Smart contract for security , performance and rugpull metrics')
.version('1.0.0')


const getApiKey = async () => {

    const { apiKey } =  inquirer.prompt({
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


        if(!fs.existsSync(contractPath)) {
            console.error('File not found'); 
            process.exit(1)
        }

        if(fs.statSync(contractPath).isDirectory()) {

            console.error('This is a directory')
            process.exit(1) ;
        }

        const contract = fs.readFileSync(contractPath, 'utf-8') ; 

        await analyze(apiKey, contract)

    } catch (error) {
        
        console.error(`Error : ${error.message}`)
    }
})

program.parse(process.argv)