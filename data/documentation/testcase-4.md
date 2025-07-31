# A duty which is prohibited to be fulfilled.
Source: ./data/test_case/testcase-4.ttl

 The challenge is to detect that the duty that is required for a permission is prohibited. 


## Expected Result 

https://w3id.org/force/compliance-report#Conflict

The policies permit and prohibit the action for any possible state of the world.

<h2>Policy <span>http://example.org/policy4a</span></h2>

Alice is permitted to use resource X if she signs a contract with Bob.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy4a a odrl:Set;
    odrl:description "Alice is permitted to use resource X if she signs a contract with Bob.";
    odrl:permission [
        a odrl:Permission;
        odrl:assignee ex:alice;
        odrl:action odrl:use;
        odrl:target ex:resourceX ;
        odrl:duty [
            a odrl:Duty ;
            odrl:action ex:signContract ;
            odrl:assignee ex:alice ; 
            odrl:assigner ex:bob ; 
            odrl:target ex:contract
        ]
    ].
```

<h2>Policy <span>http://example.org/policy4b</span></h2>

Alice is prohibited to sign Bob's contract.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy4b a odrl:Set;
    odrl:description "Alice is prohibited to sign Bob's contract.";
    odrl:prohibition [
        a odrl:Prohibition;
        odrl:assignee ex:alice;
        odrl:assigner ex:bob ;
        odrl:action ex:signContract;
        odrl:target ex:contract ].
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
    dct:title "A duty which is prohibited to be fulfilled.";
    dct:description """
The challenge is to detect that the duty that is required for a 
permission is prohibited.
"""
].

<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy4a, ex:policy4b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:activationState report:Conflict
    ].

```
