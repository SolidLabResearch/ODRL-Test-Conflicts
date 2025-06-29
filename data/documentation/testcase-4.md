
# Hard conflict detected.
A duty which is prohibited to be fulfilled.
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
    dct:title "Hard conflict detected.";
    dct:description "A duty which is prohibited to be fulfilled.".

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

<urn:uuid:67dd4fed-abe9-43d5-add6-6e51ad312f67> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected.";
    report:policy <urn:uuid:c84c52ba-7326-49a0-9ed5-7312441c0dff>, <urn:uuid:21db7041-fc81-4d4e-aabc-90c594afcaf8>;
    ex:expectedReport <urn:uuid:7bea73e7-8574-45bd-8aeb-97454663a2d2>.
<urn:uuid:7bea73e7-8574-45bd-8aeb-97454663a2d2> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T16:03:41.470Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:9ae24943-a02f-4d44-b4bb-8ce0a29fb8df>.
<urn:uuid:9ae24943-a02f-4d44-b4bb-8ce0a29fb8df> a report:Report, report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.

```
