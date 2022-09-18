const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

// Set the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// key:value object to look up URL routes to specific functions
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getStyle,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,
};

// Handle HTTP requests
const onRequest = (request, response) => {
  // Parse url
  const parsedUrl = url.parse(request.url);

  // grab 'accept' headers and split them
  const acceptedTypes = request.headers.accept.split(',');

  // Grab and parse the query parameters
  const params = query.parse(parsedUrl.query);

  // If pathname found, handle response
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes[0], params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes[0], params);
  }
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
