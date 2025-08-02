#!/usr/bin/env node

const fs = require('fs');

const answerFile = './quiz/answers.txt';

const answers = Object.fromEntries(
                    fs.readFileSync(answerFile,'utf-8').split("\n").filter( x => x.trim() !== "").map(x => x.split(/\s+/g))
                );


const report = process.argv[2];

if (! report) {
    console.error("usage: quiz_check.js report");
    process.exit(1);
}

const reportLines = fs.readFileSync(report,'utf-8').split("\n");

let quiz;
let read = false;
let answer = '';
let score = 0;
reportLines.forEach(line => {
    if (line.match(/^=== (\w+)/)) {
        quiz = line.replace(/^=== (\S+) .*/g,"$1");
        read = true;
        return;
    }
    if (read) {
        if (line.match(/.*CONFLICT/)) {
           answer = 'Conflict';
        }
        else if (line.match(/No conflict/)) {
           answer = 'NonConflict';
        }
        else {
           answer = 'Unknown';
        }
        let ok = false;
        if (answers[quiz] === answer) {
           ok = true;
           score++;
        }
        console.log(`${quiz} ${answer} -> ${ok}`);
        read = false;
    }
});

console.log("Score: " + (100*score/Object.keys(answers).length) + "%");
