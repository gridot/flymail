// Funct. to display error to user
const displayError = (feedback)  => {
    const alert = document.getElementById('alert');
    alert.innerHTML = feedback;
    alert.style.display = 'inline-block';
   
  }
  
  // Funct. that processes fetch api call
  const post = (event) => {
  // Inputs from user
  let parcelContent = document.getElementById('parcel-content').value;
  let weight = document.getElementById('weight').value;
  let metric = document.getElementById('kg').value;
  let pickupLocation = document.getElementById('pickup').value;
  let destination = document.getElementById('destination').value;
  let receiver = document.getElementById('receiver').value;
  let email = document.getElementById('email').value;
  let phoneNumber = document.getElementById('phone').value;
  let submit = document.getElementById('submit');
  
  //This prevents submit btn default action until requirement is met
    event.preventDefault();
  
    // When submit is clicked 
    if (event.target === submit) {
  
      // BaseURL
  //  const url = `http://localhost:5400/api/v1/auth/signup?`;
    const url = `https://gritdot.herokuapp.com/api/v1/parcels`
   
       // The data we are going to send in our request
       let data = {
        parcelContent: parcelContent,
        weight: weight,
        metric: metric,
        pickupLocation: pickupLocation,
        destination: destination,
        receiver: receiver,
        email: email,
        phoneNumber: phoneNumber
    }
    console.log(data);
    const token = localStorage.getItem('token');
 
    // The parameters we are going to pass to the fetch function
    let fetchData = { 
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          Authorization: token
        }
    }
    fetch(url, fetchData)
  
      // Handle response you get from the server
    .then(response => response.json())
    .then((data) => {
      console.log(data.Details);
        let errMsg = '';
        // Send the error msg gotten if any to user
        errMsg = 'Please make sure to input correct values';
        let msg = JSON.stringify(data.message).replace(/^"(.*)"$/, '$1');
         
        if (data.message) {          
          displayError(msg);
          return;
        }else {
          // And redirect user to Create parcel page
          // location.assign('index.html');
        }
  
    })
  
  }   
  } 
  
    // Attach the function to login form
  document.getElementById('parcel-form').addEventListener('click', post);
  
      