## whenever you do changes to codebase-
1. go into that thing's directory then do this

`docker build -t <thing_name>-image:latest .`

`docker run -d -p 8000:8000 <thing_name>-cont <image-name>`

## to stop/start

`docker start my-nginx`	Starting

`docker stop my-nginx`	Stopping

`docker restart my-nginx`	Restarting


## to start redis
`docker run -d --name redis -p 6379:6379 redis`