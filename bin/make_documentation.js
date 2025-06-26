#!/usr/bin/env node
const QueryEngine = require('@comunica/query-sparql-file').QueryEngine;
const myEngine = new QueryEngine();
const SOURCE = "https://github.com/SolidLabResearch/ODRL-Test-Conflicts/";
const fs = require('fs');

main();

async function main() {
    if (process.argv.length != 4) {
        console.error("usage: make_documentation.js policy testcase");
        process.exit(1);
    }
    const policyFile = process.argv[2];
    const testFile = process.argv[3];

    const policyText = fs.readFileSync(policyFile, { encoding: 'utf-8' });
    const testText = fs.readFileSync(testFile, { encoding: 'utf-8'} );

    const policyTitle = await findPolicyTitle(policyFile);
    const testTitle = await findTestTitle(testFile);

    console.log(`
# ${testTitle}
**Source**: ${SOURCE}
> ${policyTitle}
## ODRL Policy
\`\`\`ttl
${policyText}
\`\`\`
## ODRL Request
## State of the world
## Evaluation result: Compliance Report
\`\`\`ttl
${testText}
\`\`\`
`);
}

async function findPolicyTitle(file) {
    const bindingsStream = await myEngine.queryBindings(`
        PREFIX odrl: <http://www.w3.org/ns/odrl/2/>
        SELECT ?title WHERE {
            ?s a odrl:Set .
            ?s odrl:description ?title .
        }`, {
            sources: [file]
    });
    
    const title = [];

    for await (const bindings of bindingsStream) {
        title.push(bindings.get('title').value);
    }

    return title.join("\n");
}

async function findTestTitle(file) {
    const bindingsStream = await myEngine.queryBindings(`
        PREFIX ex: <http://example.org/>
        PREFIX dct: <http://purl.org/dc/terms/>
        PREFIX report: <https://w3id.org/force/compliance-report#>
        SELECT ?title WHERE {
            ?s a ex:TestCase .
            ?s dct:title ?title .
        }`, {
            sources: [file]
    });

    const bindings = await bindingsStream.toArray();

    if (bindings.length) {
        return bindings[0].get('title').value;
    }
    else {
        return null;
    }
}