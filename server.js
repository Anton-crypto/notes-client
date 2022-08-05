const express = require('express');
const port = 8080
const app = express();

app.use(express.static('./dist/notes-client'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/notes-client/'}),
);

app.listen(process.env.PORT || port, function() {
  console.log("Node Express server for " + app.name + " listening on http://localhost:" + port);
});
