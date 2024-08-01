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


async function getApiKey() {

    const { apiKey } = await inquirer.prompt([{
        type: 'input',
        name: 'apiKey', 
        message: 'Enter your API Key', 
        validate: (input) => input.length > 0 || ' API KEY IS REQUIRED'
    }]); 

    return apiKey ; 
}


program.command('check <file>').description('Analyse a smart contract')
.action(async (file) => {
    try {


        const apiKey = await getApiKey();

        const contractPath = path.resolve(process.cwd(), file);
        console.log(`Checking file at path: ${contractPath}`);
  
        if (!fs.existsSync(contractPath)) {
          console.error(`File not found: ${contractPath}`);
          process.exit(1);
        }
  
        if (fs.statSync(contractPath).isDirectory()) {
          console.error(`Path is a directory, not a file: ${contractPath}`);
          process.exit(1);
        }
  
        const contract = fs.readFileSync(contractPath, "utf8");
        await analyze(contract, apiKey);

    } catch (error) {
        
        console.error(`Error try : ${error}`)
    }
})

program.parse(process.argv)