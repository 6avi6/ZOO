## How to run backend?
In console run:
`docker-compose up --build` 
or
`docker-compose up --build -d`

## How to open db in console?
1. Install psql tool.
2. Restart PC and add this tool to PATH.
3. Run `docker exec -it zoo-db psql -U admin -d zoo`