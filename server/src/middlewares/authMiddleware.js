import jwt from "jsonwebtoken";
import { responseError } from "../helpers/restResponse.helper.js";

const JWT_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(responseError("Access token is missing"));
  }

  const access_token = token.split(" ")[1];

  jwt.verify(access_token, JWT_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json(responseError("Invalid Access Token"));
    }

    console.log("Decoded JWT Token:", decoded);

    if (decoded && decoded.user && decoded.user.user_id) {
      req.local_user = decoded.user.user_id;
      next();
    } else {
      console.error("Invalid JWT Token Structure");
      return res.status(401).json(responseError("Invalid Access Token Structure"));
    }
  });
};

export default authMiddleware;
