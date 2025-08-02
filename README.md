# Test Conflicts

This repository contains a collection of [ODRL](https://www.w3.org/TR/odrl-model/) test cases investigating various forms of policy conflicts. 

Using [ODRL Vocabulary & Expression 2.2](https://www.w3.org/TR/odrl-vocab/).

See [documentation](https://github.com/SolidLabResearch/ODRL-Test-Conflicts/tree/main/data/documentation) for an overview of the test cases.

See [quiz](https://github.com/SolidLabResearch/ODRL-Test-Conflicts/tree/main/quiz) for a (growing) collection of deontic quizzes for which no hints are provided.

## Dependencies

```
npm install
```

## Layout

- **data/policies** : test policies
- **data/test_case** : test cases for the policies
- **quiz/** : test cases without hints which type of conflict is the result

## Conflicts

- `NonConflict` : no conflict found
- `Conflict` : rules that contradict eachother
- `Ambiguous` : rules that permit an action in one state of the world but deny it in another
- `Underspecified` : rules that never will trigger