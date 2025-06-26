#!/bin/bash

for f in data/test_case/testcase* ; do
    B=$(basename $f | sed -e 's/.*-//' | sed -e 's/\..*//')
    if [ -f data/policies/policy-$B.ttl ]; then
        echo "$f data/policies/policy-$B.ttl"
        ./bin/make_documentation.js data/policies/policy-$B.ttl $f > data/documentation/testcase-$B.md
    fi
done