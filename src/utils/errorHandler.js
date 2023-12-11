function handleJoiError(res, error) {
    res.status(400).json({ error: error.details.map(detail => detail.message) });
  }

function conflict(res, message) {
    res.status(409).json({ error: message });
  }
  
  function unauthorized(res, message) {
    res.status(401).json({ error: message });
  }
  
  function forbidden(res, message) {
    res.status(403).json({ error: message });
  }
  
  function notFound(res, message) {
    res.status(404).json({ error: message });
  }
  
  function internalServerError(res, message) {
    res.status(500).json({ error: message });
  }
  
  module.exports = {
    conflict,
    unauthorized,
    forbidden,
    notFound,
    internalServerError,
    handleJoiError
  };
  