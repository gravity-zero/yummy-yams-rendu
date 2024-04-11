#!/bin/bash

echo "Lancement script"

mongoimport --verbose -u root -p root --authenticationDatabase admin --collection pastries --type json --file /docker-entrypoint-initdb.d/pastries.json --jsonArray

echo "un jour viendra"