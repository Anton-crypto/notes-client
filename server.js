// function requireHTTPS(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//       return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }

// const port = 8080
// const express = require('express');
// const app = express();

// app.use(requireHTTPS);
// app.use(express.static('dist/notes-client'));

// app.get('/*', (req, res) =>
//   res.sendFile('index.html', {root: 'dist/notes-client/'}),
// );

// app.listen(port, (err) => {
//   if (err) console.log(err);
//   console.log("Node Express server for " + app.name + " listening on http://localhost:" + port);
// });

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
