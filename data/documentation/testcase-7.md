
# Hard conflict detected. Permision vs Prohibition in overlapping collections
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

<urn:uuid:d0c1a854-191a-4340-9c3c-b211d15abd1e> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected. Permision vs Prohibition in overlapping collections";
    report:policy <urn:uuid:37cfd244-4f7e-407e-8df1-34f4024f2040>, <urn:uuid:a740f9d0-1776-483a-a308-61e415261851>;
    ex:expectedReport <urn:uuid:7d2e2bdc-cfc8-4f70-a3b9-4022c81db31b>.
<urn:uuid:7d2e2bdc-cfc8-4f70-a3b9-4022c81db31b> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T12:35:18.356Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:cbdc9795-1df0-4963-ac9d-0597cb043051>.
<urn:uuid:cbdc9795-1df0-4963-ac9d-0597cb043051> a report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.


```

