# wfs-3-hackathon
WFS Web Frontend Client


## My Little WFS 3 Project

Simple WFS capabilities and get features client.

## Run

```npm i```


### to change the code:

```./node_modules/.bin/watchify -p tsify index.ts -o index.js```

### to run the server in development mode:

```./node_modules/.bin/live-server```

### to compile in production mode:

```./node_modules/.bin/browserify -p tsify index.ts -o index.js```
