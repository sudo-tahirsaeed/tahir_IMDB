const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const routes = require('./controllers/routes');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/', routes);
module.exports = app; // Export the app
if (!module.parent) {
  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
