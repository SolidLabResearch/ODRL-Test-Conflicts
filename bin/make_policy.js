#!/usr/bin/env node
// Usage: $0 [constraint]
const N3 = require('n3');
const { v4: uuidv4 } = require('uuid');
const { DataFactory } = N3;
const { namedNode, literal, quad } = DataFactory;
const SOURCE = "https://github.com/SolidLabResearch/ODRL-Test-Suite/";
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

const options = process.argv[2];

const store = new N3.Store();

const set_id = uuid_urn();
const perm_id = uuid_urn();

store.add( quad(set_id, url('rdf:type'), url('odrl:Set')) );
store.add( quad(set_id, url('odrl:uid'), set_id) );
store.add( quad(set_id, url('odrl:description'), text("What is this about?")) );
store.add( quad(set_id, url('odrl:source'), url(SOURCE)) );
store.add( quad(set_id, url('odrl:permission'), perm_id) );

store.add( quad(perm_id, url('rdf:type'), url('odrl:Permission')) );
store.add( quad(perm_id, url('odrl:assignee'), url('ex:alice')) );
store.add( quad(perm_id, url('odrl:action'), url('odrl:read')) );
store.add( quad(perm_id, url('odrl:target'), url('ex:resourceX')) );

if (options && options.includes('constraint')) {
    const const_id = uuid_urn();
    store.add( quad(perm_id, url('odrl:constraint'), const_id) );
    store.add( quad(const_id, url('odrl:leftOperand'), url('odrl:dateTime')) );
    store.add( quad(const_id, url('odrl:operator'), url('odrl:lt')) );
    store.add( quad(const_id, url('odrl:rightOperand'), text("2024-02-12T11:20:10.999Z","xsd:dateTime")) );
}

const writer = new N3.Writer({ prefixes: NS }); 

for (const quad of store) {
    writer.addQuad(quad);
}

writer.end((_, result) => console.log(result));

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