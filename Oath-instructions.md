# Instructions for setting up Google Oauth with Passport

## Google Developers

1. visit `https://console.developers.google.com/`
2. at the top bar, click the `Select a project`
3. in the modal window that comes up, click the `NEW PROJECT` link
4. give a project name, a location and an organization name if applicable
5. then at the OAuth consent screen, add an App name, a user support email and the developer's email
6. press save at `Scopes` and `Test Users` screens
7. click at the `Credentials` link at the left column and create an API KEY, an Oath cliend ID, a client secret and note them down
8. at the top click the `CREATE CREDENTIALS` link and then select `API key`
9. copy and store the `API key`
10. then click again the `CREATE CREDENTIALS` link and then select `OAuth client ID`
11. select `Web application` as `application type`
12. give it some name
13. at `Authorized Javasript origins` give the web address of your server e.g. `http://localhost:5000` 
14. at `Authorized redirect URIs` give the callback path of your server e.g. `http://localhost:5000/users/google/callback`
15. press `CREATE` and copy and store the `Client ID` and the `Client Secret`

## Client

1.  add to the client an `a` element with href pointing to the google auth endpoint e.g. `/users/google`
2. install to client `http-proxy-middleware`
3. create in client the file `setupProxy.js` inside the `src` folder
4. note that each change in the setupProxy.js requires a restart of the dev server
5. add the following content to this file:
```
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  app.use(
    '/posts',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```
6. any new concepts e.g. `/comments` besides the `/users` and `/posts` that are currently in the `setupProxy.js` file, need to be added as well

## Server
1. install passport and the appropriate strategy for google: `npm i passport-google-oauth20 passport`
2. import passport to server:
`const passport = require('passport')`
3. create Strategy for google like that:
`const GoogleStrategy = require('passport-google-oauth20').Strategy`
4. add passport middleware: 
```
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/users/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {

    const email = profile._json.email

    // check if there is such a user in db
    const user = await User.findOne({email})

    // if there is such user then return it
    if (user) return done(null, user);

    // create a new user to insert to the db
    const newUser = new User({
        username: profile.id,
        email,
        pass: email
    })

    const savedUser = await newUser.save();

    return done(null, savedUser)
}))
```
5. add the google auth route:
```
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']})); 
```
6. add the google callback route:
```
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/users/google/failure',
    session: false
}), async (req, res) => {

    // generate a token for the user
    const token = await req.user.generateToken({id: req.user._id}, '1d')
    

    res.cookie('cookiename', token);

    // check if there https is being used in order to form the redirect url
    const prefix = req.socket.encrypted ? 'https://' : 'http://'

    let site = process.env.NODE_ENV === 'production' ? 
        req.headers.host :
        'localhost:3001'

    site += '/glogin/' + req.user._id
    
    res.redirect(prefix + site)
})
```
7. if required implement more routes for the redirection in the server and implement the necessary login to the client