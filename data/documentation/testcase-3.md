
# Hard conflict detected. Obligation vs Prohibition.
**Source**: https://github.com/SolidLabResearch/ODRL-Test-Conflicts/
> Alice has the obligation to read resource X.
Alice is prohibited to read resource X.
## ODRL Policy
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

<urn:uuid:e25f27b1-5421-444e-b897-6b4bea85ae7c> a odrl:Set;
    odrl:uid <urn:uuid:e25f27b1-5421-444e-b897-6b4bea85ae7c>;
    odrl:description "Alice has the obligation to read resource X.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:obligation <urn:uuid:1190268c-5e4d-483d-ad79-6f3ca0c0a035>.
<urn:uuid:1190268c-5e4d-483d-ad79-6f3ca0c0a035> a odrl:Duty;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:resourceX.

<urn:uuid:1d2c33dc-0939-46a6-9452-36981342add6> a odrl:Set;
    odrl:uid <urn:uuid:1d2c33dc-0939-46a6-9452-36981342add6>;
    odrl:description "Alice is prohibited to read resource X.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:prohibition <urn:uuid:8836cb6b-8c2f-47cf-b820-58292dee18df>.
<urn:uuid:8836cb6b-8c2f-47cf-b820-58292dee18df> a odrl:Prohibition;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:resourceX.


```
## ODRL Request
## State of the world
## Evaluation result: Compliance Report
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

<urn:uuid:356bcc16-8af6-44a3-90f7-5f6b02bc1c42> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected. Obligation vs Prohibition.";
    report:policy <urn:uuid:e25f27b1-5421-444e-b897-6b4bea85ae7c>, <urn:uuid:1d2c33dc-0939-46a6-9452-36981342add6>;
    ex:expectedReport <urn:uuid:17adc5fb-4b9e-480e-a8a2-da8bf9fc7fcc>.
<urn:uuid:17adc5fb-4b9e-480e-a8a2-da8bf9fc7fcc> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T11:45:32.842Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:d0326793-91c6-494d-81df-9a2ffa90531c>.
<urn:uuid:d0326793-91c6-494d-81df-9a2ffa90531c> a report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.


```

