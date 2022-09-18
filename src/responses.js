// Sends a response
const respond = (request, response, status, type, object) => {
  // Set status code and content type
  response.writeHead(status, { 'Content-Type': type });

  if (type === 'text/xml') {
    // Assemble the XML
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    if (object.id) {
      responseXML = `${responseXML} <id>${object.id}</id>`;
    }

    responseXML = `${responseXML} </response>`;

    // Write content to the response
    response.write(responseXML);

    // Send it
    return response.end();
  }

  // Stringify the object and write it to the response
  response.write(JSON.stringify(object));

  // Send it
  return response.end();
};

const success = (request, response, type) => {
  // Create object with message
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success',
  };

  // Send JSON with status code
  respond(request, response, 200, type, responseJSON);
};

const badRequest = (request, response, type, params) => {
  // Create object
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'success',
  };

  // Check for a "valid=true" query parameter
  if (!params.valid || params.valid !== 'true') {
    // Change message
    responseJSON.message = 'Missing valid query parameter set to true';
    // Change id
    responseJSON.id = 'badRequest';
    // Send JSON with status code
    return respond(request, response, 400, type, responseJSON);
  }

  // Send JSON with status code
  return respond(request, response, 200, type, responseJSON);
};

const unauthorized = (request, response, type, params) => {
  // Create object
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'success',
  };

  // Check for a "loggedIn=yes" query parameter
  if (params.loggedIn !== 'yes') {
    // Change message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    // Change id
    responseJSON.id = 'unauthorized';
    // Send JSON with status code
    return respond(request, response, 401, type, responseJSON);
  }

  // Send JSON with status code
  return respond(request, response, 200, type, responseJSON);
};

const forbidden = (request, response, type) => {
  // Create object
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  // Send JSON with status code
  respond(request, response, 403, type, responseJSON);
};

const internal = (request, response, type) => {
  // Create object
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  // Send JSON with status code
  respond(request, response, 500, type, responseJSON);
};

const notImplemented = (request, response, type) => {
  // Create object
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  respond(request, response, 501, type, responseJSON);
};

const notFound = (request, response, type) => {
  // Create object
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // Send JSON with status code
  respond(request, response, 404, type, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
