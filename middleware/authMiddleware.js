const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔴 token hi nahi aaya
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed While Decryption",
        });
      }

      req.body.userId = decode.userId;
      next();
    });
  } catch (error) {
    console.log("AUTH MIDDLEWARE ERROR:", error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed",
    });
  }
};
