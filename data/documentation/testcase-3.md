# Obligation vs Prohibition.
Source: ./data/test_case/testcase-3.ttl

 The challenge is to detect that the obligation is a direct conflict of the prohibition. 


## Expected Result 

https://w3id.org/force/compliance-report#Conflict

The policies permit and prohibit the action for any possible state of the world.

<h2>Policy <span>http://example.org/policy3a</span></h2>

Alice has the obligation to read resource X.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy3a a odrl:Set;
    odrl:description "Alice has the obligation to read resource X.";
    odrl:obligation [ 
        a odrl:Duty;
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX ].
```

<h2>Policy <span>http://example.org/policy3b</span></h2>

Alice is prohibited to read resource X.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy3b a odrl:Set;
    odrl:description "Alice is prohibited to read resource X.";
    odrl:prohibition [
        a odrl:Prohibition;
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX ].


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
    dct:title "Obligation vs Prohibition.";
    dct:description """
The challenge is to detect that the obligation is a direct conflict
of the prohibition.
"""
].

<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy3a, ex:policy3b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:activationState report:Conflict
    ].

```
