#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { policyFileMetadata } = require('../lib/util');
const { makeTestCase } = require("../lib/util");

const SOURCE = "https://github.com/SolidLabResearch/ODRL-Test-Conflicts/";
const files = process.argv.splice(2);

if (files.length != 1) {
    console.error("usage: make_testcase.js policy");
    process.exit(1);   
}

main(files[0]);

async function main(policyFile) {
    const policy_name = path.basename(policyFile).replaceAll(/.*-/g,'-');
    const result = await makeTestCase(policyFile);

    const testFile = `data/test_case/testcase${policy_name}`;
    fs.writeFileSync(testFile,result);
    console.log(`generated ${testFile}`);

    const policyText = fs.readFileSync(policyFile, { encoding: 'utf-8' });
    const testText = fs.readFileSync(testFile, { encoding: 'utf-8'} );

    const policy_metadata = await policyFileMetadata(policyFile);

    const docFile = `data/documentation/testcase${policy_name}`.replaceAll('\.ttl','.md');
    const documentation = `
# ${policy_metadata['title']}
**Source**: ${SOURCE}
> ${policy_metadata['description']}
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
`;
    fs.writeFileSync(docFile,documentation);
    console.log(`generated ${docFile}`);
}