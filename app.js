const express = require('express')
const expressHandlebars  = require('express-handlebars')
const app = express()
const session = require("express-session")
const { sequelize } = require("./models")

// Controllers
const {home} = require('./controllers/home')
const {blogPost} = require('./controllers/post')
const {notFound} = require('./controllers/notFound')
const {loginPage, login} = require('./controllers/login')
const {logout} = require('./controllers/logout')
const {dashboard} = require('./controllers/dashboard')
const {signupPage, signup} = require('./controllers/signup')
const {createPostPage, createPost} = require('./controllers/createPost')
const {createComment} = require('./controllers/createComment')

// Middleware
const {isLoggedIn} = require('./middleware/isLoggedIn')

// initialize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const store = new SequelizeStore({db: sequelize, checkExpirationInterval: 15 * 60 * 1000, expiration: 24 * 60 * 60 * 1000})



// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))

// Views
app.engine('handlebars', expressHandlebars.engine())
app.set('view engine', 'handlebars')

app.use(
  session({
    secret: "mvc blog",
    store,
    resave: false,
    saveUninitialized: true
  })
)
store.sync()

// Routes
app.get('/', home)
app.get('/posts/:id', blogPost)
app.get('/create-post', isLoggedIn, createPostPage)
app.post('/create-post', isLoggedIn, createPost)
app.get('/login', loginPage)
app.post('/login', login)
app.get('/logout', logout)
app.get('/signUp', signupPage)
app.post('/signUp', signup)
app.get('/dashboard', isLoggedIn, dashboard)
app.post('/create-comment', createComment)

app.get('*', notFound) // 404 page as a catch all

exports.app = app