#!/usr/bin/env bash

if [[ -d "$1"/node_modules ]]; then
    echo "Nothing to install, skipping."
else
    npm install
fi