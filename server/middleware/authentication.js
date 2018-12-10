import jwt from 'jsonwebtoken';


const generateToken = (payload) => {
  const token = jwt.sign({ payload }, 'gritdotisthenameofourapp', { expiresIn: '1d' });
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
  jwt.verify(token, 'gritdotisthenameofourapp', (error, authData) => {
    if (error) {
      if (error.message.includes('signature')) {
        return response.status(403)
          .json({
            success: false,
            message: 'Your value is not a valid token. Please supply a valid one',
          });
        }
    }
    request.authData = authData;
    return next();
  });
};

export {
  generateToken, verifyToken
};
