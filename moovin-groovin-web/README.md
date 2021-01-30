# moovin-groovin-web

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Session Cookies

To use the same session cookie as the one from prod instance, first find the cookie in the prod instance and copy its value.

Then open localhost url with the frontend app running, and set the cookie as follows:

```js
document.cookie = `moovin-groovin.sid=s%3A75ca04a2-9139-465a-afd7-2a4c9c720edf.UURG%2BVocz4Q5nEMB9ONQP1Yvl%2F4gKU0j6te4CD64qtw; Expires=2021-02-24T23:37:37.461Z; Path=/; Domain=localhost; SameSite=Lax`;
```
