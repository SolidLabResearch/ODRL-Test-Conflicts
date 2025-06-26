#!/usr/bin/env node
const QueryEngine = require('@comunica/query-sparql-file').QueryEngine;
const myEngine = new QueryEngine();
const N3 = require('n3');
const { v4: uuidv4 } = require('uuid');
const { DataFactory } = N3;
const { namedNode, literal, quad } = DataFactory;
const NS = { 
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#' ,
    odrl: 'http://www.w3.org/ns/odrl/2/' ,
    ex: 'http://example.org/' ,
    temp: 'http://example.com/request/' ,
    dct: 'http://purl.org/dc/terms/',
    xsd: 'http://www.w3.org/2001/XMLSchema#' ,
    foaf: 'http://xmlns.com/foaf/0.1/' ,
    report: 'https://w3id.org/force/compliance-report#'
};

const store = new N3.Store();

main();

async function main() {
    const test_id = uuid_urn();
    const report_id = uuid_urn();
    const policy_id = await parse_input();
    const rule_id = uuid_urn();

    store.add( quad(test_id, url('rdf:type'), url('ex:TestCase')) );
    store.add( quad(test_id, url('rdf:type'), url('ex:ConflictTestCase')) );
    store.add( quad(test_id, url('dct:title'), text('Conflict detected.')) );
    for (let i = 0 ; i < policy_id.length; i++) {
        store.add( quad(test_id, url('report:policy'), policy_id[i]));
    }
    store.add( quad(test_id, url('ex:expectedReport'), report_id) );
    store.add( quad(report_id, url('rdf:type'), url('report:PolicyReport')) );
    store.add( quad(report_id, url('rdf:type'), url('report:ConflictPolicyReport')) );
    store.add( quad(report_id, url('dct:created'), text((new Date()).toISOString(),'xsd:dateTime')) );
    store.add( quad(report_id, url('report:ruleReport'), rule_id));

    store.add( quad(rule_id, url('rdf:type'), url('report:ConflictReport')));
    store.add( quad(rule_id, url('report:attemptState'), url('report:Attempted')));
    store.add( quad(rule_id, url('report:activationState'), url('report:Conflict')));

    const writer = new N3.Writer({ prefixes: NS }); 

    for (const quad of store) {
        writer.addQuad(quad);
    }

    writer.end((_, result) => console.log(result));
}

function uuid_urn() {
    return namedNode(`urn:uuid:` + uuidv4());
}

function url(str) {
    const parts = str.split(':',2);
    if (NS[parts[0]]) {
        return namedNode(NS[parts[0]] + parts[1])
    }
    else {
        return namedNode(str);
    }
}

function text(str,type){
    if (type) {
        return literal(str,url(type));
    }
    else {
        return literal(str);
    }
}

async function parse_input() {
    if (process.argv.length == 2) {
        console.error("usage: make_testcase.js policy [...policy]");
        process.exit(1);
    }
    const files = process.argv.splice(2);
    const bindingsStream = await myEngine.queryBindings(`
        PREFIX odrl: <http://www.w3.org/ns/odrl/2/>
        SELECT ?s WHERE {
            ?s a odrl:Set
        }`, {
            sources: files
    });

    const ids = [];

    for await (const bindings of bindingsStream) {
        ids.push(url(bindings.get('s').value));
    }
    
    return ids;
}