#!/bin/bash

for f in ./data/test_case/*; do
    ./bin/make_documentation.js $f
done