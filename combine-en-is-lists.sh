#! /bin/bash
# Author: Judy Y. Fong
# Description: Combine English Icelandic dictionaries
# 1. list of english icelandic dictionary files
# 2. combine into general-auto.csv
# 3. remove duplicates
# 4. create English, Icelandic header

# Exit on any error
set -e

processing=processing-en-isl.csv
processingisen=processing-is-en.csv
final=general-semi-auto.csv

if [ -f "$processing" ]; then
    rm "$processing"
    echo "Deleted: $processing"
fi
[ -f "$processingisen" ] && rm "$processingisen"
if [ -f "$final" ]; then
    rm "$final"
    echo "Deleted: $final"
fi

# 1. list of english icelandic dictionary files
FILE="english-islenska-lists.txt"

# 2. combine into an intermediate processing file
while IFS= read -r line; do
  echo "$line"
  cat "$line" >> $processing
done < "$FILE"

# 1. list of icelandic english dictionary files
FILEISEN="islenska-english-lists.txt"

# 2. combine into intermediate processing file
while IFS= read -r line; do
  echo "$line"
  cat "$line" >> $processingisen
done < "$FILEISEN"

#    remove spaces around commas
#    only display the first two columns
sed -i 's/ *, */,/g' $processingisen

awk -F',' '{print $2 "," $1}' $processingisen | grep -v "þýðing,sagnorð" >> $processing

#    only display the first two columns
#    make sure each entry contains both english and Icelandic by only getting lines with commas
#    remove spaces around commas
#    remove windows lines endings
#    remove trailing spaces
# 3. remove duplicates
cut -d',' -f1,2 $processing | grep ',' | grep -v "English" | sed 's/ *, */,/g' | sed 's/\r//' | sed 's/[[:space:]]*$//' | sort | uniq > $final
rm "$processing"
rm "$processingisen"

sed -i '/^,/d' $final
sed -i '/,$/d' $final
# 4. remove entries with quotations
# TODO: process quoted entries better
sed -i '/"/d' $final
# 4. create English, Icelandic header
# This only works to insert on linux
sed -i '1i\English,Icelandic' $final

head $final
wc -l $final

