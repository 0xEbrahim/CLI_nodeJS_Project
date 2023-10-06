#!/usr/bin/env node

import { program} from 'commander';

import fs from 'node:fs';

import inquirer from 'inquirer';


const filePath = './courses.json';

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter course name.'
    },
    {
        type: 'number',
        name: 'price',
        message: 'Enter course price.'
    },
    {
        type: 'input',
        name: 'duration',
        message: 'Enter course duration.'
    }
];
program
    .name("Command line application")
    .version('1.0.0')
    .description('CLI App');

program
    .command('add')
    .alias('a')
    .description('add course')
    .action(() => {
        inquirer
            .prompt(questions)
            .then((answer)=>{
                if(fs.existsSync(filePath)){
                    fs.readFile(filePath , 'utf8',(err, data)=>{
                        if(err){
                            console.log(err);
                             process.exit();
                            }
                        else{
                            console.log("File Data -> ",data);
                           const contentAsJson = JSON.parse(data);
                            contentAsJson.push(answer);
                            fs.writeFile(filePath , JSON.stringify(contentAsJson) , 'utf8' , (err)=>{
                                if(err)
                                    console.log(err);
                                else  
                                    console.log("File Updated");
                            })
                        }
                    })
                }else{
                fs.writeFile(filePath , JSON.stringify([answer]) , 'utf8' , (err)=>{
                    if(err)
                        console.log(err);
                    else  
                        console.log("File Created");
                })
                }
            })
        })

program
    .command('list')
    .alias('l')
    .description('list courses')
    .action(() => {
        fs.readFile(filePath,'utf8', (err , data)=>{
            if(err){
                console.log(err);
                process.exit();
             }else{
                console.table(JSON.parse(data));
             }
        });
        
    })
program.parse();


