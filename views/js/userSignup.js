// Funct. to display error to user
const displayError = (feedback)  => {
  const alert = document.getElementById('alert');
  alert.innerHTML = feedback;
  alert.style.display = 'inline-block';
 
}

// Funct. that processes fetch api call
const signup = (event) => {
  // Get signup submit btn
let signupBtn  = document.getElementById('signup');
// Inputs from user
let firstName = document.getElementById('firstname').value;
let lastName = document.getElementById('lastname').value;
let email = document.getElementById('email').value;
let password = document.getElementById('password').value;

//This prevents submit btn default action until requirement is met
  event.preventDefault();

  // When submit is clicked 
  if (event.target === signupBtn) {

    // BaseURL
//  const url = `http://localhost:5400/api/v1/auth/signup?`;
  const url = `https://gritdot.herokuapp.com/api/v1/auth/signup?`
 
     // The data we are going to send in our request
     let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
  }
  
  // The parameters we are going to pass to the fetch function
  let fetchData = { 
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
  }
  fetch(url, fetchData)

    // Handle response you get from the server
  .then(response => response.json())
  .then((data) => {
      let errMsg = '';
      // Send the error msg gotten if any to user
      errMsg = 'Please make sure to input correct values';
      if (data.message === errMsg) {
        let err = data.errors;

        displayError(JSON.stringify(err.invalidInput));
        return;
      }else {
        // Else save token generated in localStorage
        localStorage.setItem('token', data.token);
        // And redirect user to Create parcel page
        location.assign('parcel.html');
      }

  })

}   
} 

  // Attach the function to login form
document.getElementById('signup-form').addEventListener('click', signup);

    