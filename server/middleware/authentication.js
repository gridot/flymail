import 'dotenv/config';
import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

const verifyToken = (request, response, next) => {
    const token = request.headers.authorization || request.body.token;
    if (!token) {
      return response.status(403)
        .json({
          success: false,
          message: 'Please supply a token',
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, authData) => {
      console.log(authData);
      if (error) {
        if (error.message.includes('signature')) {
          return response.status(403)
            .json({
              success: false,
              message: 'Your value is not a valid token. Please supply a valid one',
            });
        }
        return response.status(403)
          .json({
            message: "error here"
          });
      }
      request.authData = authData;
      return next();
    });
};

export {
    generateToken, verifyToken
};
