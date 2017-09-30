const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// feathers-blob service
const {getBase64DataURI} = require('dauria');
const AWS = require('aws-sdk');
const S3BlobStore = require('s3-blob-store');
const BlobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
// const fs = require('fs-blob-store');
// const blobStorage = fs(__dirname + '/uploads');


const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const sequelize = require('./sequelize');

const authentication = require('./authentication');

const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(sequelize);
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);


// Upload Service
// app.use('/uploads', BlobService({Model: blobStorage}));

// S3 Image Service
const s3 = new AWS.S3({
  accessKeyId: 'AKIAI4NXXMVNEKPISIMQ',
  secretAccessKey: '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'
})

const blobStore = S3BlobStore({
  client: s3,
  bucket: 'stanky-clams'
});

const blobService = BlobService({
  Model: blobStore
});
// TODO: programatically create blob and store galleryId & position as key-values pairs
app.get('/s3/images', (req, res, next) => {
  const blob = {
    uri: getBase64DataURI(new Buffer('hello world'), 'text/plain')
  }

  blobService.create(blob).then(function (result) {
    console.log('Stored blob with result:**', result);
    res.json(result);
  }).catch(err => {
    console.error(err);
  });
})

// TODO: programatically get all images


// TODO: programatically get all images from a specific gallery



// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;
