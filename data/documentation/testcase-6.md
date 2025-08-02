# Permission vs Prohibition in collection and partOf.
Source: ./data/test_case/testcase-6.ttl

 The challenge is to detect that conflict between a permission to read a file that is part of a collection that is prohibited to read. 


## Expected Result 

https://w3id.org/force/compliance-report#Conflict

The policies permit and prohibit the action for any possible state of the world.

<h2>Policy <span>http://example.org/policy6a</span></h2>

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

ex:policy6a a odrl:Set;
    odrl:description "Alice is allowed to read collection X.";
    odrl:permission [
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:collectionX
    ].

ex:collectionX a odrl:AssetCollection;
    odrl:uid <http://somewhere.org/collection/x/>.
```

<h2>Policy <span>http://example.org/policy6b</span></h2>

Alice is prohibited to read document2 (that is part of collection X).

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:collectionX a odrl:AssetCollection;
    odrl:uid <http://somewhere.org/collection/x/>.

ex:document2 a dct:Document;
    dct:title "Annual Report 2021";
    odrl:partOf <http://somewhere.org/collection/x/>.

ex:policy6b a odrl:Set;
    odrl:description "Alice is prohibited to read document2 (that is part of collection X).";
    odrl:prohibition [
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:document2 
    ] .
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
    dct:title "Permission vs Prohibition in collection and partOf.";
    dct:description """
The challenge is to detect that conflict between a permission to
read a file that is part of a collection that is prohibited to read.
""" 
].
    
<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy6a , ex:policy6b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:activationState report:Conflict
    ].

```
