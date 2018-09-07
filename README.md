# 'Scrollytelling' narrative for ABoVE report

This is the narrative portion of a report for the ABoVE project, implemented in a 'scrollytelling' style.

This is built using, among other things:

 * [webpack boilerplate](https://github.com/cvgellhorn/webpack-boilerplate)
 * [leaflet](https://leafletjs.com) for maps
 * [picnicss](https://picnicss.com) for design framework
 * [scrollama](https://github.com/russellgoldenberg/scrollama) for scroll effects

## How to work on this project

### Setup
Install dependencies:

```sh
$ npm install
```

### Project layout

```
./index.ejs  <-- where to include other template files
./templates/  <-- where partial templates live
./assets/styles  <-- hello styles!  scss flavor
./assets/images  <-- hello images!
./app  <-- JS used to build the page lives here
./scripts  <-- a few utility scripts for munging data
```

### Development

Run the local webpack-dev-server with livereload and autocompile on [http://localhost:8080/](http://localhost:8080/)

```sh
$ npm run dev
```

A few notes:
 - The page is broken into sections, where each section generally has its own EJS/JS/SCSS files.  They need to be added to `./index.ejs`, `./app/index.js` and `./assets/styles/index.scss` respectively.
 - The build process uses [stylelint](https://github.com/stylelint/stylelint) to enforce conventions for SCSS.  If the compilation of the project fails during development due to a style violation, the CSS won't hot-reload in the browser.
 - Keep an eye on the terminal window showing the build process while working on this.  If you see errors, you may need to fix them and restart the dev server.
 - Background images in SCSS need to reference images via a module resolution, not path.  For example, this is correct: `background-image: url(~images/my-picture.jpg)`.

## Deployment
Build the current application:

```sh
$ npm run build
```

...and deploy to the appropriate location!
