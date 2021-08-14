java -jar .\openapi-generator-cli.jar generate -g python-flask -i ../api/v1.yaml -o ../core ^
-t ./template-core -c config-core.yaml

java -jar .\openapi-generator-cli.jar generate -g typescript-rxjs -i ../api/v1.yaml -o ../vision-line-webapp/src/api ^
-t ./template-webapp