# Permission vs Prohibition in overlapping collections.
Source: ./data/test_case/testcase-7.ttl

 The challenge is to detect that the permitted and prohibited resources are from overlapping collections. Alice is permitted to read documents from one collection. However, all these documents are also in another collection that is prohibited to read. 


## Expected Result 

https://w3id.org/force/compliance-report#Conflict

The policies permit and prohibit the action for any possible state of the world.

<h2>Policy <span>http://example.org/policy7a</span></h2>

Alice is allowed to read collection X.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy7a a odrl:Set;
    odrl:description "Alice is allowed to read collection X.";
    odrl:permission [
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:collectionX
    ].

# CollectionX with two documents
ex:collectionX a odrl:AssetCollection.

ex:document1 a dct:Document;
    dct:title "Annual Report 2020";
    odrl:partOf ex:collectionX.

ex:document2 a dct:Document;
    dct:title "Annual Report 2021";
    odrl:partOf ex:collectionX.
```

<h2>Policy <span>http://example.org/policy7b</span></h2>

Alice is prohibited to read collection Y.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

# CollectionY also contains all documents from CollectionX
ex:collectionY a odrl:AssetCollection.

ex:document1 a dct:Document;
    dct:title "Annual Report 2020";
    odrl:partOf ex:collectionY.

ex:document2 a dct:Document;
    dct:title "Annual Report 2021";
    odrl:partOf ex:collectionY.

ex:document3 a dct:Document;
    dct:title "Annual Report 2022";
    odrl:partOf ex:collectionY.

ex:policy7b a odrl:Set;
    odrl:description "Alice is prohibited to read collection Y.";
    odrl:prohibition [
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:collectionY
    ].
```

## Test

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

[
    a ex:PolicyDemo;
    dct:title "Permission vs Prohibition in overlapping collections.";
    dct:description """
The challenge is to detect that the permitted and prohibited resources
are from overlapping collections. Alice is permitted to read documents
from one collection. However, all these documents are also in another
collection that is prohibited to read.
"""
].

<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy7a, ex:policy7b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:activationState report:Conflict
    ].

```
