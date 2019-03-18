# Generating a flamegraph

Sometimes, we need to display data as a flamegraph, for better view of what is happening.

To do so, run the following:

```bash
node --prof script.js
node --prof-process --preprocess -j isolate-0x21af0c0-v8.log > v8.json
```

Go to https://mapbox.github.io/flamebearer/ and drag and drop the `v8.json` file to the browser window. You will see something similar with the picture below. You can click and navigate into it as much as you like. 

![1](img/Selection_012.png?raw=true)