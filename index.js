#!/usr/bin/env node 


const {Command} = require('commander'); 

const inquirer = require('inquirer'); 

const {analyze} = require('./src/ai-prompt')

const fs = require('fs'); 

const path = require('path')