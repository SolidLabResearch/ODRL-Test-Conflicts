# Test Suite

This repository contains a collection of [ODRL](https://www.w3.org/TR/odrl-model/) test cases investigating various forms of policy conflicts

## Dependencies

```
npm install
```

## Layout

- **data/documentation** : documentation of the test cases
- **data/policies** : test policies
- **data/test_case** : test cases for the policies

## Tools

- **bin/make_policy.js** : create a sample policy
- **bin/make_constraint.js** : create a sample constraint
- **bin/make_testcase.js** : create a test case and documentation for a policy

## Contribute

Policies are ODRL documents stored in the `data/policies` directory with a file name pattern `policy-<name>.ttl`. Policies should not use blank nodes and should use UUID URI-s instead.

An example ODRL policy is provided below:

```ttl
@prefix odrl: <http://www.w3.org/ns/odrl/2/>.
@prefix ex: <http://example.org/>.
@prefix temp: <http://example.com/request/>.
@prefix dct: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix report: <https://w3id.org/force/compliance-report#>.

<> a ex:PolicyDemo;
    dct:title "Hard conflict detected.";
    dct:description "Permission vs Prohibition.".

<urn:uuid:d9e83b91-d274-4305-82d5-f96d951dc60f> a odrl:Set;
    odrl:uid <urn:uuid:d9e83b91-d274-4305-82d5-f96d951dc60f>;
    odrl:description "Alice is permitted to read resource X";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:permission <urn:uuid:3dc0814a-f626-491f-86eb-d10bec83a0f8>.
<urn:uuid:3dc0814a-f626-491f-86eb-d10bec83a0f8> a odrl:Permission;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:resourceX.

<urn:uuid:6ccb9180-f9e4-42b9-9473-9601cf4a037c> a odrl:Set;
    odrl:uid <urn:uuid:6ccb9180-f9e4-42b9-9473-9601cf4a037c>;
    odrl:description "Alice is prohibited to read resource X";
    odrl:source <https://github.com/SolidLabResearch/ODRL-Test-Conflicts/>;
    odrl:prohibition <urn:uuid:a933af56-7977-4970-a08b-3818430470a5>.
<urn:uuid:a933af56-7977-4970-a08b-3818430470a5> a odrl:Prohibition;
    odrl:assignee ex:alice;
    odrl:action odrl:read;
    odrl:target ex:resourceX.
```

- Each policy begins with an introduction that includes a title and a description of the policy and its corresponding test case. 
- Every policy in this repository must simulate a conflict, that is, one or more policies that result in inconsistent rules.
  - The nature of these inconsistencies is left to the interpretation and insight of the policy designer.

To ease the development of new ODRL policies, without requiring UUID-s by hand, two tools are available:

- **bin/make_policy.js** : generates a new ODRL policy from scratch that can be edited in your favorite editor.
- **bin/make_constraint.js** : generates an ODRL constraint that can be copy-and-paste in your policy

To create the test cases and documentation run the following command:

```
./bin/make_testcase.js <policy_file>
```

where `<policy_file>` is the path to your new policy.

Generating a new ODRL policy that expresses a conflict typically involves running several `./bin/make_policy.js` commands, optionally combined with `./bin/make_constraint.js`, followed by copying, pasting, and editing the necessary parts.

For inspiration, consult the `data/policies` directory.