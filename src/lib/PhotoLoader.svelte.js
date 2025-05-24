// exports a load photos function, which takes a photoguid and derivative checksums, returns a promise. function stores photo metadata and corresponding promise in a global Map, and puts photo guid in a queue

// internal flush function, when called examines length of queue and calls the API request function if there are enough elements, and then removes them from the queue

// request function calls the API, and then uses the checksums stored in the map to match the returned urls to the photos, and then fulfils the corresponding promise with the returned urls. 

// setinterval loop to periodically call internal flush function