#! /bin/bash
# Author: Judy Y. Fong
# Description: Combine English Icelandic dictionaries
# 1. list of english icelandic dictionary files
# 2. combine into general-auto.csv
# 3. remove duplicates
# 4. create English, Icelandic header

# Exit on any error
set -e

processing=processing.csv
final=general-semi-auto.csv

if [ -f "$processing" ]; then
    rm "$processing"
    echo "Deleted: $processing"
fi
if [ -f "$final" ]; then
    rm "$final"
    echo "Deleted: $final"
fi

# 1. list of english icelandic dictionary files
FILE="english-islenska-lists.txt"

# 2. combine into general-auto.csv
while IFS= read -r line; do
  echo "$line"
  cat "$line" >> $processing
done < "$FILE"

# 3. remove duplicates
cut -d',' -f1,2 $processing | grep -v "English" | sort | uniq > $final
rm "$processing"

sed -i '/^,/d' $final
# 4. remove entries with quotations
# TODO: process quoted entries better
sed -i '/"/d' $final
# 4. create English, Icelandic header
# This only works to insert on linux
sed -i '1i\English,Icelandic' $final

head $final
wc -l $final

