
# Hard conflict detected.
Permission vs Prohibition.
> Alice is permitted to read resource X
Alice is prohibited to read resource X

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
    dct:description "Permission vs Prohibition.".

<urn:uuid:d9e83b91-d274-4305-82d5-f96d951dc60f> a odrl:Set;
    odrl:uid <urn:uuid:d9e83b91-d274-4305-82d5-f96d951dc60f>;
    odrl:description "Alice is permitted to read resource X";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:permission <urn:uuid:3dc0814a-f626-491f-86eb-d10bec83a0f8>.
<urn:uuid:3dc0814a-f626-491f-86eb-d10bec83a0f8> a odrl:Permission;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:resourceX.

<urn:uuid:6ccb9180-f9e4-42b9-9473-9601cf4a037c> a odrl:Set;
    odrl:uid <urn:uuid:6ccb9180-f9e4-42b9-9473-9601cf4a037c>;
    odrl:description "Alice is prohibited to read resource X";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:prohibition <urn:uuid:a933af56-7977-4970-a08b-3818430470a5>.
<urn:uuid:a933af56-7977-4970-a08b-3818430470a5> a odrl:Prohibition;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
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

<urn:uuid:b1a008b5-ded4-4b76-ba59-38bedc7d3f09> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected.";
    report:policy <urn:uuid:d9e83b91-d274-4305-82d5-f96d951dc60f>, <urn:uuid:6ccb9180-f9e4-42b9-9473-9601cf4a037c>;
    ex:expectedReport <urn:uuid:b8c20042-5140-4bf4-b5d8-1ad7a1dc17d5>.
<urn:uuid:b8c20042-5140-4bf4-b5d8-1ad7a1dc17d5> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T16:03:38.086Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:c859fb36-8278-43d2-b808-7e70e4919c75>.
<urn:uuid:c859fb36-8278-43d2-b808-7e70e4919c75> a report:Report, report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.

```
