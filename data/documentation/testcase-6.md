
# Hard conflict detected. Permission vs Prohibition in collection and partOf.
**Source**: https://github.com/SolidLabResearch/ODRL-Test-Conflicts/
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
    dct:title "Hard conflict detected. Permission vs Prohibition in collection and partOf.".

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

<urn:uuid:dbd62076-ee05-4ebe-b275-46e37e7aff29> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected. Permission vs Prohibition in collection and partOf.";
    report:policy <urn:uuid:aad03f3f-8b8b-467c-b95b-342b677d3364>, <urn:uuid:d79f9b0d-eff7-44c7-87fd-023ff32aa11d>;
    ex:expectedReport <urn:uuid:16e5504a-1199-419a-b645-70f8b774b6e9>.
<urn:uuid:16e5504a-1199-419a-b645-70f8b774b6e9> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T15:53:08.353Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:d83cb9e2-682d-4066-af5a-6a4be4863a7b>.
<urn:uuid:d83cb9e2-682d-4066-af5a-6a4be4863a7b> a report:Report, report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.

```
