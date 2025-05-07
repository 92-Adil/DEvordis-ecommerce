import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(400).json({
        message: "User is not authenticate",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.ACCESS_SECRET);
    if (!decode) {
      return res.status(400).json({
        message: "Invalid Token",
        success: false,
      });
    }
    req.id = decode.UserId;
    next();
  } catch (error) {
    console.log("Error in the authentication is", error);
  }
};
export default isAuthenticated;
