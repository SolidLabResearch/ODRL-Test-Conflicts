
# Hard conflict detected. Using rdfs:subClassOf
**Source**: https://github.com/SolidLabResearch/ODRL-Test-Suite/
> Alice is permitted to (special) read resource X. Where special read a type of read.
Alice is prohibited to read resource X.
## ODRL Policy
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

<urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460> a odrl:Set;
    odrl:uid <urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460>;
    odrl:description "Alice is permitted to (special) read resource X. Where special read a type of read.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Suite/>;
    odrl:permission <urn:uuid:38d1cdb6-db3a-45d3-93b1-9d54776df02a>.
<urn:uuid:38d1cdb6-db3a-45d3-93b1-9d54776df02a> a odrl:Permission;
    odrl:assignee ex:alice;
    odrl:action odrl:SpecialRead;
    odrl:target ex:resourceX.

<urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460> a odrl:Set;
    odrl:uid <urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460>;
    odrl:description "Alice is prohibited to read resource X.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Suite/>;
    odrl:prohibition <urn:uuid:38d1cdb6-db3a-45d3-93b1-9d54776df02a>.
<urn:uuid:38d1cdb6-db3a-45d3-93b1-9d54776df02a> a odrl:Prohibition;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:resourceX.

# Create a SpecialRead as a type of odrl:read
ex:SpecialRead rdfs:subClassOf odrl:read .
```
## ODRL Request
## State of the world
## Evaluation result: Compliance Report
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

<urn:uuid:afd905f4-6d20-4c59-a628-5b519e940d26> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected. Using rdfs:subClassOf";
    report:policy <urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460>;
    ex:expectedReport <urn:uuid:c9d7910a-7df8-4609-a991-1db1f4825c43>.
<urn:uuid:c9d7910a-7df8-4609-a991-1db1f4825c43> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T11:32:53.576Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:160f218b-0c71-44e2-a45b-73b41ebda7f3>.
<urn:uuid:160f218b-0c71-44e2-a45b-73b41ebda7f3> a report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.


```

