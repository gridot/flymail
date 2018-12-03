import { createUser, queryUsersByEmail } from '../db/sqlQueries';
import bcrypt, { compareSync } from 'bcrypt';

import {generateToken} from '../middlewares/authentication';
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
        const username = authUser.email.split('@')[0];
        const token = generateToken(authUser);
        let {name, email, registered} = authUser;
        let Details = {name,email,registered}
      
        return response.status(201)
          .json({
            success: true,
            message: 'Sign up is successful',
           token: token,
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
