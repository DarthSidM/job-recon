# job-recon


## Quick Start of project
`cd server`

`npm i`


* if starting with a new db

`npx prisma migrate deploy` 

* if new models added

`npx prisma migrate dev --name <migration_name>` then

`npx prisma generate`