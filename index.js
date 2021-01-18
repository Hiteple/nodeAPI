const container = require('./src/startup/container');
const server = container.resolve('app');
const { MONGO_URI } = container.resolve('config');

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
   .then(() => server.start())
   .catch((err) => console.log(err.message));