
# Hard conflict detected. Permission vs Prohibition odrl:read as subclass of odrl:use
**Source**: https://github.com/SolidLabResearch/ODRL-Test-Conflicts/
> Alice is permitted to read resource X.
Alice is prohibited to use resource X.

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

<> a ex:PolicyDemo;
    dct:title "Hard conflict detected. Permission vs Prohibition odrl:read as subclass of odrl:use".

<urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460> a odrl:Set;
    odrl:uid <urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460>;
    odrl:description "Alice is permitted to read resource X.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:permission <urn:uuid:38d1cdb6-db3a-45d3-93b1-9d54776df02a>.
<urn:uuid:38d1cdb6-db3a-45d3-93b1-9d54776df02a> a odrl:Permission;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:resourceX.

<urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460> a odrl:Set;
    odrl:uid <urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460>;
    odrl:description "Alice is prohibited to use resource X.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:prohibition <urn:uuid:38d1cdb6-db3a-45d3-93b1-9d54776df02a>.
<urn:uuid:38d1cdb6-db3a-45d3-93b1-9d54776df02a> a odrl:Prohibition;
    odrl:assignee ex:alice;
    odrl:action odrl:use;
    odrl:target ex:resourceX.
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

<urn:uuid:146f49cb-a574-4737-b530-c9a27b80a10c> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected. Permission vs Prohibition odrl:read as subclass of odrl:use";
    report:policy <urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460>;
    ex:expectedReport <urn:uuid:332f463d-3734-4998-960e-456a0f83efdc>.
<urn:uuid:332f463d-3734-4998-960e-456a0f83efdc> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T15:53:03.947Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:9022ae7e-33a1-41ac-bd77-2937d3859712>.
<urn:uuid:9022ae7e-33a1-41ac-bd77-2937d3859712> a report:Report, report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.

```
