# Personal Blog based on next.js

This is the source of https://nilssiegfried.de

Built with:

- next.js
- typescript
- tailwind.css

Shipped with:

- circle-ci

## Getting started

Run `npm install` to install dependencies locally

Start local development mode with `npm run dev`

If you are using vscode, you may run the repo as a dev container.

## Useful commands when writing posts

### Convert all images to WebP

```sh
find . \( -name "*.png" -o -name "*.jpg" \) -exec sh -c 'cwebp -m 6 -q 50 ${0} -o ${0%.*}.webp' {} ';'
```
