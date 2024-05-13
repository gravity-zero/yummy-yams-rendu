#!/bin/bash

echo "Lancement script"

username="root"
password="root"
authenticationDatabase="admin"
database="bakery"
collection="pastries"

sleep 5
# Vérifie si la base de données bakery existe
if ! mongosh --quiet -u root -p root --authenticationDatabase "admin" --eval "db.getMongo().getDBNames().indexOf('bakery') > -1" | grep true > /dev/null; then
    echo "La base de données $database n'existe pas. Création en cours..."
    mongoimport --verbose -u $username -p $password --authenticationDatabase $authenticationDatabase --db $database --collection $collection --type json --file /docker-entrypoint-initdb.d/pastries.json --jsonArray
else
    echo "La base de données $database existe déjà."
fi

echo "un jour viendra"
