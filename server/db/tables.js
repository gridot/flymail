import pool from '../connection';
import bcrypt from 'bcrypt';

const createTables = `DROP TABLE IF EXISTS userTable, parcelTable CASCADE;
  CREATE TABLE userTable (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR (128) NOT NULL,
    lastName VARCHAR (128) NOT NULL,
    otherNames VARCHAR (128) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT (NOW()),
    isAdmin BOOLEAN NOT NULL DEFAULT (false),
    password VARCHAR (128) NOT NULL
),
  CREATE TABLE parcelTable (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) references users (user_id) on delete cascade,
    parcelContent VARCHAR (128) NOT NULL,
    placedBy INT NOT NULL,
    price FLOAT (11) NOT NULL,
    trackingID CHARACTER VARYING(100) NOT NULL,
    weight FLOAT (11) NOT NULL,
    metric VARCHAR (20) NOT NULL,
    pickupLocation VARCHAR (128) NOT NULL,
    destination VARCHAR (128) NOT NULL,
    status CHARACTER VARYING(10) NOT NULL DEFAULT ('Pending')
    receiver VARCHAR (128) NOT NULL,
    email VARCHAR (355) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    currentLocation VARCHAR (128) NOT NULL,
    sentOn TIMESTAMP NOT NULL DEFAULT (NOW()),
    deliveredOn VARCHAR
)`;

const sql = 'insert into users (firstName, lastName, username, email, isAdmin, password) values ($1, $2, $3, $4, $5, $6, $7)';
const password = bcrypt.hashSync('admindot', 10);
const variables = ['Admin', 'gritdot', 'grit', 'gritdot@gmail.com', 'true', password];

class tableHandler {
    static defaultTables() {
        const create = pool.query(createTables)
            .then(result => console.log(res))
            .catch(error => console.log(error));
        return create;
    }

    static createAdmin() {
        const create = pool.query(sql, variables)
            .then((result => console.log(`Admin account ${result.command}ED`)))
            .catch((error) => {
                console.log(error);
            });
        return create;
    }
}

const { defaultTables, createAdmin } = tableHandler;

export {defaultTables, createAdmin};

