
# Hard conflict detected. Permission vs Prohibition in overlapping collections
**Source**: https://github.com/SolidLabResearch/ODRL-Test-Conflicts/
> Alice is allowed to read collection X.
Alice is prohibited to read collection Y.

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
    dct:title "Hard conflict detected. Permission vs Prohibition in overlapping collections".

<urn:uuid:37cfd244-4f7e-407e-8df1-34f4024f2040> a odrl:Set;
    odrl:uid <urn:uuid:37cfd244-4f7e-407e-8df1-34f4024f2040>;
    odrl:description "Alice is allowed to read collection X.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:permission <urn:uuid:254225fd-1815-413c-8c89-56ee84eab1af>.
<urn:uuid:254225fd-1815-413c-8c89-56ee84eab1af> a odrl:Permission;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:collectionX.

# CollectionX with two documents
ex:collectionX a odrl:AssetCollection;
    odrl:uid <http://somewhere.org/collection/x/>.

ex:document1 a dct:Document;
    dct:title "Annual Report 2020";
    odrl:partOf <http://somewhere.org/collection/x/>.

ex:document2 a dct:Document;
    dct:title "Annual Report 2021";
    odrl:partOf <http://somewhere.org/collection/x/>.

# CollectionY also contains a document from CollectionX
ex:collectionY a odrl:AssetCollection;
    odrl:uid <http://somewhere.org/collection/y/>.

ex:document1 a dct:Document;
    dct:title "Annual Report 2020";
    odrl:partOf <http://somewhere.org/collection/y/>.

<urn:uuid:a740f9d0-1776-483a-a308-61e415261851> a odrl:Set;
    odrl:uid <urn:uuid:a740f9d0-1776-483a-a308-61e415261851>;
    odrl:description "Alice is prohibited to read collection Y.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:prohibition <urn:uuid:4a089d40-8cfa-4db0-8484-de2d25ccca85>.
<urn:uuid:4a089d40-8cfa-4db0-8484-de2d25ccca85> a odrl:Prohibition;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:collectionY.
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

<urn:uuid:ddd65f25-49cf-47ee-8e20-60793495c874> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected. Permission vs Prohibition in overlapping collections";
    report:policy <urn:uuid:37cfd244-4f7e-407e-8df1-34f4024f2040>, <urn:uuid:a740f9d0-1776-483a-a308-61e415261851>;
    ex:expectedReport <urn:uuid:e000fb19-26e4-4d57-bb08-af0358201532>.
<urn:uuid:e000fb19-26e4-4d57-bb08-af0358201532> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T15:53:09.450Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:324a7954-f82f-4fa7-9650-9ca5e261774b>.
<urn:uuid:324a7954-f82f-4fa7-9650-9ca5e261774b> a report:Report, report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.

```
