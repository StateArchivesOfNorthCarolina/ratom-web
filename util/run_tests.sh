#!/bin/bash
URL=http://localhost:8000/api/v1/reset-sample-data/
echo "############ Running Cypress tests ###############"
echo "############ Reseting server sample data #########"

python ./util/run_tests.py
if [[ $? == 0 ]]
then
  echo "########## Starting the Cypress suite ##########"
  cypress open
else
  echo "###########Something went wrong. Exiting."
fi
