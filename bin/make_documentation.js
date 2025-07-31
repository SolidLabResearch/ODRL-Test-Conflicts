#!/usr/bin/env node
const QueryEngine = require('@comunica/query-sparql-file').QueryEngine;
const myEngine = new QueryEngine();
const fs = require('fs');
const fsPath = require('path');

const POLICIES = './data/policies';
const DOCUMENTATION = './data/documentation';

main();

async function main() {

    if (process.argv.length != 3) {
        console.error("usage: make_documentation.js testcase");
        process.exit(1);
    }

    const testFile = process.argv[2];

    if (! fs.existsSync(testFile)) {
        console.error(`no such file: ${testFile}`);
        process.exit(2);
    }

    try {
        const index = await indexPolicies(POLICIES);

        const documentation = await testDocumentation(testFile, index);

        const text = markdownDocumentation(documentation);

        const name = fsPath.basename(testFile).replace(/\.\w+$/g,'.md');

        const outPath = `${DOCUMENTATION}/${name}`;

        if (! fs.existsSync(DOCUMENTATION)) {
            fs.mkdirSync(DOCUMENTATION);
        }
        console.log(`Generating ${outPath}`);
        fs.writeFileSync(outPath,text);
    }
    catch (e) {
        console.error(e);
        console.log(`failed ${testFile}`);
        process.exit(3);
    }
}

function markdownDocumentation(documentation) {
    let markdown =`# ${documentation.title}
Source: ${documentation.test.id}

${documentation.description}

`;

    if (documentation.state === 'https://w3id.org/force/compliance-report#Conflict') {
        markdown += `
## Expected Result 

${documentation.state}

The policies permit and prohibit the action for any possible state of the world.
`;
    }
    else if (documentation.state === 'https://w3id.org/force/compliance-report#Ambiguous') {
        markdown += `
## Expected Result

${documentation.state}

The policies are ambiguous: some states of the world permit an action while other states of the world prohibit the action.
`;
    }
    else if (documentation.state === 'https://w3id.org/force/compliance-report#Underspecified') {
        markdown += `
## Expected Result

${documentation.state}

The policies are under specified: some rules are available that will never trigger for any state of the world.
`;
    }


    for (let i = 0 ; i < documentation.policy.length ; i++) {
        markdown +=`
<h2>Policy <span>${documentation.policy[i].id}</span></h2>

${documentation.policy[i].description}

\`\`\`
${documentation.policy[i].text}
\`\`\`
`;
    }

    markdown += `
## Test

\`\`\`
${documentation.test.text}
\`\`\`
`;
    return markdown;
}

async function testDocumentation(path, index) {
    const bindingsStream = await myEngine.queryBindings(`
        PREFIX ex: <http://example.org/>
        PREFIX dct: <http://purl.org/dc/terms/>
        PREFIX report: <https://w3id.org/force/compliance-report#>
        
        SELECT ?title ?description ?policy ?policyDescription ?state WHERE {
            ?s a ex:PolicyDemo .
            ?s dct:title ?title .
            ?s dct:description ?description .

            ?t a ex:TestCase .
            ?t report:policy ?policy .
            
            ?x report:activationState ?state .
        }`, {
            sources: [path]
    });
    
    const doc = {
        test: {
            id: path,
            text: readText(path)
        }
    };

    const bindings = await bindingsStream.toArray();

    if (!bindings.length) {
        console.error(`failed to parse ${path}`);
        return {};
    }

    for (const binding of bindings) {
        for (const key of binding.keys()) {
            const val = binding.get(key);

            if (key.value === 'policy') {
                if (! index[val.value]) {
                   console.error(`no policy named ${val.value}`);
                    continue;
                }

                const polText = index[val.value].text;
                const polDesc = index[val.value].description;

                if (polText) {
                    if (key.value in doc) {
                        doc[key.value].push({
                            id: val.value ,
                            text: polText ,
                            description: polDesc
                        });
                    }
                    else {
                        doc[key.value] = [{
                            id: val.value ,
                            text: polText ,
                            description: polDesc
                        }];
                    }
                }
                else {
                    console.error(`${path} : no text for ${val.value}`);
                }
            }
            else {
                doc[key.value] = myTrim(val.value);
            }
        }
    }

    return doc;
}

async function indexPolicies(path) {
    const index = {};
    const idx = fs.readdirSync(path);
    for (let i = 0 ; i < idx.length ; i++) {
        const pol = `${path}/${idx[i]}`;
        const text = readText(pol);
        const ids = await policyData(pol);

        for (let j = 0 ; j < ids.length ; j++) {
            const id = ids[j].id;
            const description = ids[j].description;

            index[id] = {
                text: text ,
                description: description
            };
        }
    }

    return index;
}

async function policyData(path) {
    const bindingsStream = await myEngine.queryBindings(`
        PREFIX odrl: <http://www.w3.org/ns/odrl/2/> 

        SELECT ?id ?description WHERE {
            ?id a odrl:Set .
            ?id odrl:description ?description .
        }`, {
            sources: [path]
    });

    const bindings = await bindingsStream.toArray(); 

    const result = []

    for (const binding of bindings) {
        const id = binding.get('id').value;
        const desc = binding.get('description').value;

        if (id && desc) {
            result.push({
                id: id,
                description: myTrim(desc)
            });
        }
        else {
            console.error(`no id or desc for ${path}`);
        }
    }
    return result;
}

function readText(path) {
    return fs.readFileSync(path, { encoding: 'utf-8' });    
}

function myTrim(str) {
    if (!str) {
        return str;
    }
    return str.replaceAll(/[\r\n]/gm, ' ').replaceAll(/ +/g,' ');
}