// Simplified auth middleware - no JWT, just pass through
// In production, you should implement proper session management

export const protect = async (req, res, next) => {
  // For now, just pass through without authentication
  // You can implement session-based auth or other methods here
  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    // For now, just pass through without role checking
    // You can implement proper role checking based on session here
    next();
  };
};
