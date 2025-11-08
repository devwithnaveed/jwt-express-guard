const rateLimitStore = new Map();

function rateLimiter(limit = 10, timeWindow = 60000) {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!rateLimitStore.has(ip)) {
      rateLimitStore.set(ip, { count: 1, firstRequestTime: now });
      return next();
    }

    const data = rateLimitStore.get(ip);

    if (now - data.firstRequestTime > timeWindow) {
      data.count = 1;
      data.firstRequestTime = now;
      return next();
    }

    if (data.count >= limit) {
      return res
        .status(429)
        .json({ success: false, message: "Too many requests" });
    }

    data.count++;
    next();
  };
}

function roleGuard(allowedRoles = []) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}

module.exports = { rateLimiter, roleGuard };
