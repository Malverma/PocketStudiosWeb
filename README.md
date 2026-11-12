# Pocket Studios Web

The website for Pocket Studios LLC. It is a static site built with plain HTML, CSS, and JavaScript, with no build step. See [spec.md](spec.md) for the full specification.

## Running locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Adding products

Add entries to `window.PRODUCTS` in [`data/products.js`](data/products.js). Each entry needs a `type` of `"application"`, `"game"`, or `"extension"` and a list of `platforms` (`windows`, `linux`, `android`, `apple`; extensions use `firefox`, `chrome`). Extensions appear in the Extensions tab. Thumbnails can go in an `images/` folder.

## Setting the contact email

Set `CONTACT_EMAIL` at the top of [`app.js`](app.js).

## Deploying

In the repository settings, open **Pages** and set the source to the `main` branch, root folder.

## License

Licensed under the [Apache License 2.0](LICENSE).
