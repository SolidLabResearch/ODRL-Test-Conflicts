#!/bin/bash

for f in data/policies/policy* ; do
    echo $f
    ./bin/make_testcase.js $f
done