java -jar .\openapi-generator-cli.jar generate -g python-flask -i ../api/v1.yaml -o ../core ^
-t ./template-core -c config-core.yaml --ignore-file-override .core.openapi-generator-ignore