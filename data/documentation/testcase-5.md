
# Hard conflict detected.
 Permission vs Prohibition with constraints.
> Alice is permitted to read resource X when her age is 18.
Alice is prohibited to read resource X when her age is 18.

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

<> a ex:PolicyDemo;
    dct:title "Hard conflict detected.";
    dct:description " Permission vs Prohibition with constraints.".

<urn:uuid:7087a379-d4ca-430f-b4d4-c17c53ab3c24> a odrl:Set;
    odrl:uid <urn:uuid:7087a379-d4ca-430f-b4d4-c17c53ab3c24>;
    odrl:description "Alice is permitted to read resource X when her age is 18.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:permission <urn:uuid:c72be35e-dd6f-463e-bf37-ef95d0308d26>.
<urn:uuid:c72be35e-dd6f-463e-bf37-ef95d0308d26> a odrl:Permission;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:resourceX;
    odrl:constraint <urn:uuid:4944c4df-6587-4ce4-ad41-199c61e3594c>.
<urn:uuid:4944c4df-6587-4ce4-ad41-199c61e3594c> 
    odrl:leftOperand ex:age;
    odrl:operator odrl:eq;
    odrl:rightOperand 18.

<urn:uuid:6116a93f-cbeb-4d5c-bcde-8f57320d48db> a odrl:Set;
    odrl:uid <urn:uuid:6116a93f-cbeb-4d5c-bcde-8f57320d48db>;
    odrl:description "Alice is prohibited to read resource X when her age is 18.";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:permission <urn:uuid:a62986fb-a654-4428-8cfc-1af2d67c94c6>.
<urn:uuid:a62986fb-a654-4428-8cfc-1af2d67c94c6> a odrl:Permission;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:resourceX;
    odrl:constraint <urn:uuid:31dce567-428b-4fa8-b6b8-6d0b906695b2>.
<urn:uuid:31dce567-428b-4fa8-b6b8-6d0b906695b2> 
    odrl:leftOperand ex:age;
    odrl:operator odrl:eq;
    odrl:rightOperand 18.

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

<urn:uuid:f3b0c52c-7692-47b9-95d5-0a8588610ab1> a ex:TestCase, ex:ConflictTestCase;
    dct:title "Hard conflict detected.";
    report:policy <urn:uuid:7087a379-d4ca-430f-b4d4-c17c53ab3c24>, <urn:uuid:6116a93f-cbeb-4d5c-bcde-8f57320d48db>;
    ex:expectedReport <urn:uuid:b49eff4e-39ff-458b-876e-f721094e4bd6>.
<urn:uuid:b49eff4e-39ff-458b-876e-f721094e4bd6> a report:PolicyReport, report:ConflictPolicyReport;
    dct:created "2025-06-26T16:03:42.577Z"^^xsd:dateTime;
    report:ruleReport <urn:uuid:4850f41e-cc16-488d-8b75-1e3739df4e91>.
<urn:uuid:4850f41e-cc16-488d-8b75-1e3739df4e91> a report:Report, report:ConflictReport;
    report:attemptState report:Attempted;
    report:activationState report:Conflict.

```
