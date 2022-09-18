const fs = require('fs');

// Load index fully into memory
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
// Load css fully into memory
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

// Handle index page
const getIndex = (request, response) => {
  // set status code and content type
  response.writeHead(200, { 'Content-Type': 'text/html' });

  // write an HTML string to the response
  response.write(index);

  // Send it
  response.end();
};

// Handle tylesheet
const getStyle = (request, response) => {
  // set status code and content type
  response.writeHead(200, { 'Content-Type': 'text/css' });

  // write a css string to the response
  response.write(style);

  // Send it
  response.end();
};

module.exports = {
  getIndex,
  getStyle
};
