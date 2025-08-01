# Permission X, Permission Y and Prohibition (X & Y).
Source: ./data/test_case/testcase-8.ttl

 The challenge is in the OWL `intersectionOf` (if this is supported). The conflict is alike the "drink & drive" problem. If one is prohibited to drink and drink, it means that one is permitted to drink, permitted to drive, but not permitted to drink and drive. 


## Expected Result 

https://w3id.org/force/compliance-report#Conflict

The policies permit and prohibit the action for any possible state of the world.

<h2>Policy <span>http://example.org/policy8a</span></h2>

Alice is allowed to rent collection X.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy8a a odrl:Set;
    odrl:description "Alice is allowed to rent collection X.";
    odrl:permission [
        odrl:assignee ex:alice;
        odrl:action ex:rent;
        odrl:target ex:collectionX
    ].
```

<h2>Policy <span>http://example.org/policy8b</span></h2>

Alice is allowed to sell collection X.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy8b a odrl:Set;
    odrl:description "Alice is allowed to sell collection X.";
    odrl:permission [
        odrl:assignee ex:alice;
        odrl:action ex:sell;
        odrl:target ex:collectionX
    ].
```

<h2>Policy <span>http://example.org/policy8c</span></h2>

Alice is prohibited to rent and sell collection X.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

# This would probably not be a conflict but an illegal policy
# when such kind of conjunctions would be allowed
ex:rent a owl:Class.
ex:sell a owl:Class.

ex:rentsell a owl:Class ;
    owl:equivalentClass [
        a owl:Class;
        owl:intersectionOf (ex:rent ex:sell)
    ].

ex:policy8c a odrl:Set;
    odrl:description "Alice is prohibited to rent and sell collection X.";
    odrl:prohibition [
        odrl:assignee ex:alice;
        odrl:action ex:rentsell;
        odrl:target ex:collectionX
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
    dct:title "Permission X, Permission Y and Prohibition (X & Y).";
    dct:description """
The challenge is in the OWL `intersectionOf` (if this is supported). The
conflict is alike the "drink & drive" problem. If one is prohibited to
drink and drink, it means that one is permitted to drink, permitted to 
drive, but not permitted to drink and drive.
"""
].

<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy8a, ex:policy8b, ex:policy8c;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:activationState report:Conflict
    ].

```
