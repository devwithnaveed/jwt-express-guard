const { verifyToken } = require("./token");

function jwtGuard({ secret }) {
  if (!secret) throw new Error("JWT secret key is required");

  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const result = verifyToken(token, secret);

    if (!result.valid) {
      return res.status(401).json({ success: false, message: result.error });
    }

    req.user = result.decoded;
    next();
  };
}

module.exports = {
  jwtGuard,
  ...require("./guards"),
};
