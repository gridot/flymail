const sucessfulUser = {
    firstName: 'Janet',
    lastName: 'Grit',
    email: 'janetgrit@gmail.com',
    password: 'janedot'
  };

  const invalidFirstName = {
    firstName: 'J',
    lastName: 'Grit',
    email: 'janetgrit@gmail.com',
    password: 'janedot'
  };

  const invalidLastName = {
    firstName: 'Janet',
    lastName: '',
    email: 'janetgrit@gmail.com',
    password: 'janedot'
  };

  const invalidUserEmail = {
    firstName: 'Janet',
    lastName: 'Grit',
    email: 'janetgricom',
    password: 'janedot'
  };

  const invalidPassword = {
    firstName: 'Janet',
    lastName: 'Grit',
    email: 'janetgrit@gmail.com',
    password: 'j'
  };

  //POST PARCEL
  const successfulOrder = {
    parcelContent: "A bag of rice",
    weight: "2",
    metric: "kg",
    pickupLocation: "12 Seriki Amass",
    destination: "20 Jupiter Road",
    receiver: "Jonah Fish",
    email:'cowgirl@gmail.com',
    phoneNumber: "09038802899"
  }

  const invalidContent = {
    parcelContent: "",
    weight: "2",
    metric: 'kg',
    pickupLocation: "12 Seriki Amass",
    destination: "20 Jupiter Road",
    receiver: "Jonah Fish",
    email:'cow@gmail.com',
    phoneNumber: "09038802899"
  }


  const invalidWeight = {
    parcelContent: "A bag of rice",
    weight: "0",
    metric: 'kg',
    pickupLocation: "12 Seriki Amass",
    destination: "20 Jupiter Road",
    receiver: "Jonah Fish",
    email: "cow@gmail.com",
    phoneNumber: "09038802899"
  }

  const invalidPickup = {
    parcelContent: "A bag of rice",
    weight: "2",
    metric: 'kg',
    pickupLocation: "",
    destination: "20 Jupiter Road",
    receiver: "Jonah Fish",
    email: "cow@gmail.com",
    phoneNumber: "09038802899"
  }

  const invalidDest = {
    parcelContent: "A bag of rice",
    weight: "2",
    metric: 'kg',
    pickupLocation: "12 Seriki Amass",
    receiver: "Jonah Fish",
    email: "cow@gmail.com",
    phoneNumber: "09038802899"
  }

  const invalidReceiver = {
    parcelContent: "A bag of rice",
    weight: "2",
    metric: 'kg',
    pickupLocation: "12 Seriki Amass",
    destination: "20 Jupiter Road",
    receiver: "123",
    email: "cow@gmail.com",
    phoneNumber: "09038802899"
  }
  const invalidEmail = {
    parcelContent: "A bag of rice",
    weight: "2",
    metric: 'kg',
    pickupLocation: "12 Seriki Amass",
    destination: "20 Jupiter Road",
    receiver: "Jonah Fish",
    email: "comail",
    phoneNumber: "09038"
  }

  const invalidPhone = {
    parcelContent: "A bag of rice",
    weight: "2",
    metric: 'kg',
    pickupLocation: "12 Seriki Amass",
    destination: "20 Jupiter Road",
    receiver: "Jonah Fish",
    email: "cow@gmail.com",
    phoneNumber: "09038"
  }
  
  
  export {
    sucessfulUser, invalidFirstName, invalidLastName, invalidUserEmail, invalidPassword, successfulOrder, invalidContent, invalidWeight, invalidPickup, invalidDest, invalidReceiver, invalidEmail, invalidPhone
  };

  
  // export default sucessfulUser;