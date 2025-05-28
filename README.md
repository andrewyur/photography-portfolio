# photography-portfolio

portfolio website for my photography

piggybacks off of a reverse-engineered private apple API for displaying photos in a shared album instead of storing photos locally

metadata for photos are periodically fetched by this [service](https://github.com/andrewyur/photography-fetcher#), stored in a cloud storage bucket, which is then loaded by the client and used to fetch urls for the photos.

the website passes calls to the url generation API through a private forward proxy which attaches CORS headers, because the apple API does not include them.

## Todo

- [x] initial photo metdatata processing
- [x] PhotoBatch
- [x] photo loader service
- [x] PhotoCard
- [x] fullscreen photo viewing
- [ ] decoration
  - [ ] repeating wall texture
  - [ ] photo frames and time cards
  - [ ] album title and title photo
  - [ ] paper texture for closeup
  - [ ] film click and blink on closup switch

## Resources

- <https://www.icloud.com/sharedalbum/#B25JtdOXmhS13T>
