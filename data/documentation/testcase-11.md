# Permission with refinement. Obligation with conflicting refinement
Source: data/test_case/testcase-11.ttl

 The challenge is to detect the conflict between a permission to pay with a refinement to pay more than 10 euro and the obligation to pay with a refinement to pay less than 10 euro for a resource.<br> Why is this a conflict? Due to deontic logic an obligation to pay < 10 euro entails a prohibition pay > 10 euro. This is in conflict with a permission to pay > 10 euro. 


## Expected Result 

https://w3id.org/force/compliance-report#Conflict

The policies permit and prohibit the action for any possible state of the world.

<h2>Policy <span>http://example.org/policy11a</span></h2>

Alice is permitted to pay more than 10 euro for resource X.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.
@prefix dbpedia: <http://dbpedia.org/resource/>.

ex:policy11a a odrl:Set;
    odrl:description "Alice is permitted to pay more than 10 euro for resource X.";
    odrl:permission [
        a odrl:Permission;
        odrl:assignee ex:alice;
        odrl:action [ 
            rdf:value odrl:pay;
            odrl:refinement [
                odrl:leftOperand odrl:payAmmount;
                odrl:operator odrl:gt;
                odrl:rightOperand "10.00"^^xsd:decimal;
                odrl:unit dbpedia:Euro
            ]
        ];
        odrl:target ex:resourceX
    ].
```

<h2>Policy <span>http://example.org/policy11b</span></h2>

Alice has an obligation to pay less than 10 euro for resource X.

```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.
@prefix dbpedia: <http://dbpedia.org/resource/>.

ex:policy11b a odrl:Set;
    odrl:description "Alice has an obligation to pay less than 10 euro for resource X.";
    odrl:obligation [
        a odrl:Obligation;
        odrl:assignee ex:alice;
        odrl:action [ 
            rdf:value odrl:pay;
            odrl:refinement [
                odrl:leftOperand odrl:payAmmount;
                odrl:operator odrl:lt;
                odrl:rightOperand "10.00"^^xsd:decimal;
                odrl:unit dbpedia:Euro
            ]
        ];
        odrl:target ex:resourceX
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
    dct:title "Permission with refinement. Obligation with conflicting refinement";
    dct:description """
The challenge is to detect the conflict between a permission to pay with a
refinement to pay more than 10 euro and the obligation to pay with a 
refinement to pay less than 10 euro for a resource.<br>
Why is this a conflict? Due to deontic logic an obligation to pay < 10 euro
entails a prohibition pay > 10 euro. This is in conflict with a permission to
pay > 10 euro.
"""
].

<> a ex:TestCase, ex:ConflictTestCase;
    report:policy ex:policy11a, ex:policy11b;
    ex:expectedReport [
        a report:PolicyReport, report:ConflictPolicyReport;
        report:activationState report:Conflict
    ].

```
