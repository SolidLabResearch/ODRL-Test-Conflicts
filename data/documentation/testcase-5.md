# Permission vs Prohibition with constraints.
Source: ./data/test_case/testcase-5.ttl

 The challenge is to detect that the conditions of the permission and prohibition are in direct conflict with eachother. 


## Expected Result 

https://w3id.org/force/compliance-report#Conflict

The policies permit and prohibit the action for any possible state of the world.

<h2>Policy <span>http://example.org/policy5a</span></h2>

Alice is permitted to read resource X when her age is 18.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy5a a odrl:Set;
    odrl:description "Alice is permitted to read resource X when her age is 18.";
    odrl:permission [
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX;
        odrl:constraint [
            odrl:leftOperand ex:age;
            odrl:operator odrl:eq;
            odrl:rightOperand 18
        ]
    ].
```

<h2>Policy <span>http://example.org/policy5b</span></h2>

Alice is prohibited to read resource X when her age is 18.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy5b a odrl:Set;
    odrl:description "Alice is prohibited to read resource X when her age is 18.";
    odrl:prohibited [
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX;
        odrl:constraint [
            odrl:leftOperand ex:age;
            odrl:operator odrl:eq;
            odrl:rightOperand 18
        ]
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
    dct:title "Permission vs Prohibition with constraints.";
    dct:description """
The challenge is to detect that the conditions of the permission
and prohibition are in direct conflict with eachother.
"""
].
    
<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy5a, ex:policy5b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:activationState report:Conflict
    ].

```
