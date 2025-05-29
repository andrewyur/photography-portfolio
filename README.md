# photography-portfolio

portfolio website for my photography

piggybacks off of a reverse-engineered private apple API for displaying photos in a shared album instead of storing photos locally

metadata for photos are periodically fetched by this [service](https://github.com/andrewyur/photography-fetcher#), stored in a cloud storage bucket, which is then loaded by the client and used to fetch urls for the photos.

The private apple API does not include CORS headers in its JSON responses, so instead of using a dynamic route handler to proxy requests to the API, which would add a substantial amount to the startup time, it uses NGINX to route requests to the /api route to a [musl compiled binary](https://github.com/andrewyur/cors-bypass-server) which makes the request, and statically serves the rest of the files.

## Todo

- [x] initial photo metdatata processing
- [x] PhotoBatch
- [x] photo loader service
- [x] PhotoCard
- [x] fullscreen photo viewing
- [x] decoration
  - [x] album title and title photo
  - [x] favicon & page title

## Resources

- <https://www.icloud.com/sharedalbum/#B25JtdOXmhS13T>
