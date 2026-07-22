const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const timestamp = new Date().toISOString();
    
    const logEntry = `[${timestamp}] [ReqID: ${req.requestId}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms - IP: ${ip}`;
    console.log(logEntry);
  });

  next();
};

module.exports = requestLogger;
