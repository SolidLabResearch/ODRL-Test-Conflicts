# Permission date in 2025, Prohibition date before 2026.
Source: ./data/test_case/testcase-9.ttl

 The challenge is in detecting the conflict in logical constraints where Alice is allowed to read a resource in 2025 but is prohibited to read the resource before 2026. 


## Expected Result 

https://w3id.org/force/compliance-report#Conflict

The policies permit and prohibit the action for any possible state of the world.

<h2>Policy <span>http://example.org/policy9a</span></h2>

Alice is permitted to read resource X in 2025.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy9a a odrl:Set;
    odrl:description "Alice is permitted to read resource X in 2025.";
    odrl:permission [
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX;
        odrl:constraint [
            a odrl:LogicalConstraint;
            odrl:and [
                a odrl:Constraint;
                odrl:leftOperand odrl:dateTime;
                odrl:operator odrl:gteq;
                odrl:rightOperand "2025-01-01"^^xsd:date
            ] , [
                a odrl:Constraint;
                odrl:leftOperand odrl:dateTime ;
                odrl:operator odrl:lteq;
                odrl:rightOperand "2025-12-31"^^xsd:date
            ]  
        ]
    ].
```

<h2>Policy <span>http://example.org/policy9b</span></h2>

Alice is not allowed to read resource X before 2026.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy9b a odrl:Set;
    odrl:description "Alice is not allowed to read resource X before 2026.";
    odrl:prohibition [
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX;
        odrl:constraint [
            a odrl:Constraint;
            odrl:leftOperand odrl:dateTime ;
            odrl:operator odrl:lt;
            odrl:rightOperand "2026-01-01"^^xsd:date
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
    dct:title "Permission date in 2025, Prohibition date before 2026.";
    dct:description """
The challenge is in detecting the conflict in logical constraints where
Alice is allowed to read a resource in 2025 but is prohibited to read
the resource before 2026.
"""
].

<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy9a, ex:policy9b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:activationState report:Conflict
    ].

```
