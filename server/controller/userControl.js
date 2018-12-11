import bcrypt, { compareSync } from 'bcrypt';
import { createUser, queryUsersByEmail } from '../db/sql';

import { generateToken } from '../middleware/authentication';
import pool from '../db/connection';

class UserHandler {
  static userSignup(request, response) {
    const { firstName, lastName, email, isadmin } = request.body;
    const values = [
      firstName,
      lastName,
      email,
      isadmin,
      bcrypt.hashSync(request.body.password, 10)
    ];

    pool.query(createUser, values)
      .then((data) => {
        const authUser = data.rows[0];
        const token = generateToken(authUser);
        const { name, email, registered } = authUser;
        const Details = { name, email, registered };

        return response.status(201)
          .json({
            success: true,
            message: `Sign up is successful`,
            token,
            Details

          });
      })
      .catch(error => response.status(500)
        .json({
          success: false,
          message: error.message
        }));
  }
  static userLogin(request, response) {
    const emailValue = [request.body.email];
    const errors = {};
    pool.query(queryUsersByEmail, emailValue)
      .then((result) => {
        if (result.rowCount !== 0) {
          const comparePassword = compareSync(request.body.password, result.rows[0].password);
          if (comparePassword) {
            const authUser = result.rows[0];
            const username = emailValue[0].split('@')[0];
            const token = generateToken(authUser);
            return response.status(200)
              .json({
                success: true,
                message: `Welcome back ${username}`,
                token: token
              });
          }

          errors.password = "Make sure your password is correct"
        }
        if (result.rowCount === 0) {
          errors.email = "Email is not found, please enter correct email or signup"
        }
        console.log(result.rows[0]);
        if (JSON.stringify(errors) !== '{}') {
          return response.status(400)
            .json({
              success: false,
              message: "Please make sure to input correct values",
              errors
            });
        }
      })
      .catch((error) => {
        response.json({
          success: false,
          message: error.message
        });
      });
  }
}

const { userSignup, userLogin } = UserHandler;

export {userSignup, userLogin};
