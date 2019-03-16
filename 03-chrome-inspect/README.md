# Performance inspect using Google Chrome

As I mentioned in the first page, Google Chrome has a builtin code inspector. Luckly, this can work with any Node.JS instance. Switch Node.Js into inspection mode using: 

```bash
node --inspect=0.0.0.0:3333
```

Of course you can use any other port than `3333`. Now start Google Chrome and enter the following web address: `chrome://inspect`. Click on "Open dedicated DevTools for Node" and add a new connection to `localhost:3333`. Now you can use any of the tabs above: `Console`, `Profiler`, etc

For example, click on the `Console` tab and enter the following: `process.memoryUsage().heapUsed / 1024 / 1024;`. This will display the amount of heap memory used by the running Node.JS process