
# Hard conflict detected. 

> Alice is allowed to read collection X.
Alice is prohibited to read document2 (that is part of collection X).

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
    dct:title "Hard conflict detected. ";
    dct:desciption "Permission vs Prohibition in collection and partOf.".
    
<urn:uuid:aad03f3f-8b8b-467c-b95b-342b677d3364> a odrl:Set;
    odrl:uid <urn:uuid:aad03f3f-8b8b-467c-b95b-342b677d3364>;
    odrl:description "Alice is allowed to read collection X.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:permission <urn:uuid:2dcce052-258d-4137-8ad7-bde6def88e4e>.
<urn:uuid:2dcce052-258d-4137-8ad7-bde6def88e4e> a odrl:Permission;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:collectionX.

ex:collectionX a odrl:AssetCollection;
    odrl:uid <http://somewhere.org/collection/x/>.

ex:document1 a dct:Document;
    dct:title "Annual Report 2020";
    odrl:partOf <http://somewhere.org/collection/x/>.

ex:document2 a dct:Document;
    dct:title "Annual Report 2021";
    odrl:partOf <http://somewhere.org/collection/x/>.

<urn:uuid:d79f9b0d-eff7-44c7-87fd-023ff32aa11d> a odrl:Set;
    odrl:uid <urn:uuid:d79f9b0d-eff7-44c7-87fd-023ff32aa11d>;
    odrl:description "Alice is prohibited to read document2 (that is part of collection X).";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:prohibition <urn:uuid:942feae9-0830-41ce-ac46-6c5ad39ee636>.
<urn:uuid:942feae9-0830-41ce-ac46-6c5ad39ee636> a odrl:Prohibition;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:document2.
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

<urn:uuid:1f320923-5f43-4310-90ec-07905308d815> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected. ";
    report:policy <urn:uuid:aad03f3f-8b8b-467c-b95b-342b677d3364>, <urn:uuid:d79f9b0d-eff7-44c7-87fd-023ff32aa11d>;
    ex:expectedReport <urn:uuid:4665bd40-b8f1-4dab-a9ad-a9ab6bc3c072>.
<urn:uuid:4665bd40-b8f1-4dab-a9ad-a9ab6bc3c072> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T16:03:43.686Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:90ca1a23-1890-4fb1-8718-49e95c754c1d>.
<urn:uuid:90ca1a23-1890-4fb1-8718-49e95c754c1d> a report:Report, report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.

```
