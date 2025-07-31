# Permission vs Prohibition

 One policy permits an action for Alice. The other policy prohibits the same action for Alice. 

source: ./data/test_case/testcase-1.ttl

**Expected Result** : https://w3id.org/force/compliance-report#Conflict

The policies permit and prohibit the action for any possible state of the world.

<h2>Policy <span>http://example.org/policy1a</span></h2>

Alice is permitted to read resource X.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy1a a odrl:Set;
    odrl:description "Alice is permitted to read resource X.";
    odrl:permission [
        a odrl:Permission;
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX ].
```

<h2>Policy <span>http://example.org/policy1b</span></h2>

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

ex:policy1b a odrl:Set;
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

[ a ex:PolicyDemo;
    dct:title "Permission vs Prohibition";
    dct:description """
One policy permits an action for Alice. The other policy prohibits 
the same action for Alice.
"""
].
    
<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy1a, ex:policy1b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:activationState report:Conflict
    ].

```
