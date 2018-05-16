# Meetup Event Search

[https://github.com/jpdjere/Meetup-Search](https://github.com/jpdjere/Meetup-Search)

A web app for searching and favoriting Meetup events. Uses Meetup API.

Uses Express Generator for Node/Express backend boilerplate and Facebook's create-react-app for the React Frontend.

The Express server runs on `port: 3001` and the React Frontend on `port: 3000`.

The React Frontend, created using [`create-react-app`](https://github.com/facebook/create-react-app), is found inside the `client` directory.

## Libraries used

### Node/Express Backend

* [Axios HTTP Client](https://github.com/axios/axios)
* [Mongoose](https://github.com/Automattic/mongoose) -- MongoDB object modeling designed to work in an asynchronous environment. 

### React Frontend

* [react](https://facebook.github.io/react/) -- React.
* [fetch-jsonp](https://github.com/camsong/fetch-jsonp)
* [meetup-web-components](https://github.com/meetup/meetup-web-components) -- A set of React components from Meetup to build Meetup-like UIs.
* [swarm-sasstools](https://meetup.github.io/swarm-sasstools/seldon/doc.html) -- Sass/CSS library that goes along with Meetup's web components.
* [Meetup's API](https://www.meetup.com/meetup_api/) -- Specifically [OpenEvents](https://www.meetup.com/meetup_api/docs/2/open_events/)
* [React-FontAwesome](https://github.com/danawoodman/react-fontawesome) -- A React Font Awesome wrapper.

## Development Instructions

1. On the `root` level, install Node dependencies with `npm install`.
1. Start the Node/Express.js backend server with `npm start`.
1. On another Terminal tab, enter the `client` subdirectory and install the dependencies with `npm install`.
1. Start the Webpack dev-server with `npm start`.
1. In the client's `package.json` file, the `"proxy": "http://localhost:3001"` config proxies requests form the frontend to the Express backend.
1. Navigate to the development build in `localhost:3000`.

## Deploy to production

1. In the `client` subdirectory, create a production build with `npm run build`.
1. Express was configured to point to the `build` directory on the `app.js` file.
1. Deploy your Node app and Express will automatically point to your React build.
1. You can see the production build by starting the Node/Express server and navigating to `localhost:3001`.

## Author

* [**Juan Pablo Djeredjian:**](https://github.com/jpdjere)
