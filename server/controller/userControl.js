import bcrypt, { compareSync } from 'bcrypt';
import { createUser } from '../db/sql';

import { generateToken } from '../middleware/authentication';
import pool from '../db/connection';

class UserHandler {
  static userSignup(request, response) {
    const { firstName, lastName, email } = request.body;
    const values = [
      firstName,
      lastName,
      email,
      bcrypt.hashSync(request.body.password, 10)
    ];

    pool.query(createUser, values)
      .then((data) => {
        const authUser = data.rows[0];
        //  const username = authUser.email.split('@')[0];
        const token = generateToken(authUser);
        const { name, email, registered } = authUser;
        const Details = { name, email, registered };

        return response.status(201)
          .json({
            success: true,
            message: 'Sign up is successful',
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
}

const { userSignup } = UserHandler;

export default userSignup;
