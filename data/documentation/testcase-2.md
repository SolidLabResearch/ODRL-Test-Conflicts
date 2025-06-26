
# Hard conflict detected.
Permission vs Prohibition odrl:read as subclass of odrl:use.
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
    dct:title "Hard conflict detected.";
    dct:description "Permission vs Prohibition odrl:read as subclass of odrl:use.".

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

<urn:uuid:7e04d646-1f9d-44e9-a78f-6063967354df> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected.";
    report:policy <urn:uuid:c57a99b7-2ccf-44ad-8655-b11ed0020460>;
    ex:expectedReport <urn:uuid:fa4a877a-0290-4075-ba00-5a50fc807ec5>.
<urn:uuid:fa4a877a-0290-4075-ba00-5a50fc807ec5> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T16:03:39.197Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:75ec97fb-31de-40f4-ab14-dfbae0a85e25>.
<urn:uuid:75ec97fb-31de-40f4-ab14-dfbae0a85e25> a report:Report, report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.

```
