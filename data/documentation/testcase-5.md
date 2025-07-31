# Hard conflict detected.

 Permission vs Prohibition with constraints.

source: ./data/test_case/testcase-5.ttl

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
        a odrl:Permission;
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
        a odrl:Prohibition;
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
    dct:title "Hard conflict detected.";
    dct:description " Permission vs Prohibition with constraints."
].
    
<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy5a, ex:policy5b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:ruleReport [
            a report:Report, report:ConflictReport;
            report:attemptState report:Attempted;
            report:activationState report:Conflict
        ]
    ].

```
