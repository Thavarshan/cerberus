#!/bin/sh
STRING="README.md"
shopt -s nullglob
for dir in ./apps/*; do
    if [[ $dir != *"$STRING"* ]]; then
        cd $dir && npx -yes -p npm-check-updates ncu -u && npm install && cd ../..
    fi
done
for dir in ./packages/*; do
    if [[ $dir != *"$STRING"* ]]; then
        cd $dir && npx -yes -p npm-check-updates ncu -u && npm install && cd ../..
    fi
done
