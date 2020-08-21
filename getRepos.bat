cd lib/classes

rd /s /q crud
if exist crud rd /s /q crud
git clone -b v2.0.0 https://github.com/ConciseConstructs/CRUDDynamoDBAbstractClasses.git

rd /s /q lambdahandler
if exist lambdahandler rd /s /q lambdahandler
git clone https://github.com/ConciseConstructs/lambdahandler.git

cd..
cd interfaces


rd /s /q icrud
if exist icrud rd /s /q icrud
git clone -b v2.0.0 https://github.com/ConciseConstructs/ICRUD.git

cd ..
cd ..
