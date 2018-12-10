const createUser = 'insert into userTable (firstName, lastName, email, password) values ($1, $2, $3, $4) returning *';

const queryUsersByEmail = 'select * from userTable where email = $1';

const createOrder = 'insert into parcelTable (user_id, parcelContent, price, trackingID, weight, metric, pickupLocation, destination, receiver, email, phoneNumber, currentLocation) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *';


const selectAllOrders = `select parcelTable.id, parcelTable.receiver, parcelTable.TrackingID, parcelTable.parcelContent, parcelTable.weight,parcelTable.pickupLocation,parcelTable.destination, parcelTable.currentLocation, parcelTable.price, parcelTable.sentOn, parcelTable.metric, parcelTable.user_id, parcelTable.email, parcelTable.status from parcelTable left join userTable on parcelTable.user_id = userTable.user_id order by id desc`;


export {
  createUser, queryUsersByEmail, createOrder, selectAllOrders
};
