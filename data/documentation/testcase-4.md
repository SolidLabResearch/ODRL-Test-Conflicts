
# Hard conflict detected. A duty which is prohibited to be fulfilled.
**Source**: https://github.com/SolidLabResearch/ODRL-Test-Conflicts/
> Alice is permitted to use resource X if she signs a contract with Bob.
Alice is prohibited to sign Bob's contract.

## ODRL Policy
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

<> a ex:PolicyDemo;
    dct:title "Hard conflict detected. A duty which is prohibited to be fulfilled.".

<urn:uuid:c84c52ba-7326-49a0-9ed5-7312441c0dff> a odrl:Set;
    odrl:uid <urn:uuid:c84c52ba-7326-49a0-9ed5-7312441c0dff>;
    odrl:description "Alice is permitted to use resource X if she signs a contract with Bob.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:permission <urn:uuid:799f648d-b60f-4c80-85ce-cb8fc1561ed4>.
<urn:uuid:799f648d-b60f-4c80-85ce-cb8fc1561ed4> a odrl:Permission;
    odrl:assignee ex:alice;
    odrl:action odrl:use;
    odrl:target ex:resourceX ;
    odrl:duty <urn:uuid:47523048-be5d-4148-bb98-298f93bb8f47>.
<urn:uuid:47523048-be5d-4148-bb98-298f93bb8f47> a odrl:Duty ;
    odrl:action ex:signContract ;
    odrl:assignee ex:alice ; 
    odrl:assigner ex:bob ; 
    odrl:target ex:contract.

<urn:uuid:21db7041-fc81-4d4e-aabc-90c594afcaf8> a odrl:Set;
    odrl:uid <urn:uuid:21db7041-fc81-4d4e-aabc-90c594afcaf8>;
    odrl:description "Alice is prohibited to sign Bob's contract.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:prohibition <urn:uuid:4051bdd0-adad-4eb3-bedd-c249f6b5d2a3>.
<urn:uuid:4051bdd0-adad-4eb3-bedd-c249f6b5d2a3> a odrl:Prohibition;
    odrl:assignee ex:alice;
    odrl:assigner ex:bob ;
    odrl:action ex:signContract;
    odrl:target ex:contract.
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

<urn:uuid:027ef05b-7527-4b12-9abd-bbc21ecb0bd3> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected. A duty which is prohibited to be fulfilled.";
    report:policy <urn:uuid:c84c52ba-7326-49a0-9ed5-7312441c0dff>, <urn:uuid:21db7041-fc81-4d4e-aabc-90c594afcaf8>;
    ex:expectedReport <urn:uuid:c85d0c89-2ab9-4822-9b8f-980d24b52f0f>.
<urn:uuid:c85d0c89-2ab9-4822-9b8f-980d24b52f0f> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T15:53:06.150Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:70787f40-331a-4e33-b01c-030cfc1415ee>.
<urn:uuid:70787f40-331a-4e33-b01c-030cfc1415ee> a report:Report, report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.

```
