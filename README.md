# GitHub Repo Search (TA Frontend Assignment)

[https://github-repo-search.herokuapp.com/](https://github-repo-search.herokuapp.com/)

A web app for searching Github repos, list them by popularity and list their top contributors. Uses Github Developer API v3.

Based on the [Express + React starter boilerplate](https://github.com/jpdjere/ExpressReactStarterProject), which is in turn based on Express Generator and Facebook Incubators' Create-React-App.

The Express server runs on `port: 3001` and the React Frontend on `port: 3000`.

The React Frontend, created using [`create-react-app`](https://github.com/facebook/create-react-app), is found inside the `client` directory.

## Libraries used

### Node/Express Backend

* [GitHub REST API client for Node.js](https://github.com/octokit/rest.js)
* [Axios HTTP Client](https://github.com/axios/axios)

### React Frontend

* [React-Redux](https://github.com/reactjs/redux): Predictable state container for JavaScript apps
* [Redux-Thunk](https://github.com/gaearon/redux-thunk): Thunk middleware for Redux
* [React-Router](https://github.com/ReactTraining/react-router): Declarative routing for React
* [Redux-Form](https://github.com/erikras/redux-form): A Higher Order Component using react-redux to keep form state in a Redux store
* [Material-UI](https://github.com/mui-org/material-ui): React components that implement Google's Material Design.
* [React-Transition-Group](https://github.com/reactjs/react-transition-group/tree/v1-stable): An easy way to perform animations when a React component enters or leaves the DOM.
* [React-FontAwesome](https://github.com/danawoodman/react-fontawesome): A React Font Awesome component.
* [React-Emoji-Render](https://github.com/tommoor/react-emoji-render): Normalize and render emoji's the way your users expect.


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
