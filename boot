#!/bin/bash
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

jars=("$dir/backend/target"/*-with-dependencies.jar);
jar=${jars[0]}
tmp="$dir/backend/tmp"

echo "Booting: $jar at http://localhost:8081 ..."

java -Dcom.embercampeurope.netty.port=8081 \
  -Dcom.embercampeurope.netty.webappDir="$dir/site" \
  -Dcom.embercampeurope.db.path="$tmp" -jar $jar
