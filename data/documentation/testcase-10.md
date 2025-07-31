# Hard conflict detected.

Permission student. Permission employee. Prohibition (student + employee)

source: ./data/test_case/testcase-10.ttl

<h2>Policy <span>http://example.org/policy10a</span></h2>

Alice is allowed to read if she is a student or an employee

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:alice 
    a ex:student , ex:employee .

ex:policy10a a odrl:Set;
    odrl:description "Alice is allowed to read if she is a student or an employee";
    odrl:permission [
        a odrl:Permission ;
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX;
        odrl:constraint [
            a odrl:Constraint;
            odrl:leftOperand odrl:recipient ;
            odrl:operator odrl:isA;
            odrl:rightOperand ex:student
        ]
    ] , [
        a odrl:Permission ;
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX;
        odrl:constraint [
            a odrl:Constraint;
            odrl:leftOperand odrl:recipient;
            odrl:operator odrl:isA;
            odrl:rightOperand ex:employee
        ]
    ].
```

<h2>Policy <span>http://example.org/policy10b</span></h2>

Alice is prohibited to read if she is both a student and employee

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

ex:policy10b a odrl:Set;
    odrl:description "Alice is prohibited to read if she is both a student and employee";
    odrl:prohibition [
        a odrl:Prohibition ;
        odrl:assignee ex:alice;
        odrl:action odrl:read;
        odrl:target ex:resourceX;
        odrl:constraint [
            a odrl:LogicalConstraint;
            odrl:and [
                a odrl:Constraint;
                odrl:leftOperand odrl:recipient ;
                odrl:operator odrl:isA;
                odrl:rightOperand ex:student
             ], [
                a odrl:Constraint;
                odrl:leftOperand odrl:recipient ;
                odrl:operator odrl:isA;
                odrl:rightOperand ex:employee
             ]
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
    dct:description "Permission student. Permission employee. Prohibition (student + employee)"
].

<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy10a, ex:policy10b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:ruleReport [
            a report:Report, report:ConflictReport;
            report:attemptState report:Attempted;
            report:activationState report:Conflict
        ]
    ].

```
