const createUser = 'insert into userTable (firstName, lastName, email, password) values ($1, $2, $3, $4, $5) returning *';

const queryUsersByEmail = 'select * from userTable where email = $1';

const createOrder = 'insert into parcelTable (user_id, parcelContent, price, trackingID, weight, metric, pickupLocation, destination, receiver, email, phoneNumber, currentLocation) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *';


export {
    createUser, queryUsersByEmail, createOrder
};