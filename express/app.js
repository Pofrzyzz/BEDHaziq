const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send("Welcome to Express!");
});

app.listen(4000, ()=>{
    console.log("Listening to port 4000");
});

const path = require('node:path');

const ap = 'C:/Users/haziq/Documents/GitHub/BEDHaziq/express/app.js';

console.log(path.dirname(ap)); // C:/Users/haziq/Documents/GitHub/BEDHaziq/express
console.log(path.basename(ap)); // app.js
console.log(path.extname(ap)); // .js

const fs = require('node:fs');

fs.readFile('express/Haziq.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

const content = "Potatoes are cool, that's what's up";

fs.writeFile('express/Haziq.txt', content, err => {
    if (err) {
        console.error(err);
    } else {
        // file written successfully
    }
});

const chalk = require('chalk');

console.log(chalk.yellow('hi!'));