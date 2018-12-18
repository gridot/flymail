let signupBtn  = document.getElementById('signup-btn');
const alert = document.getElementById('alert');
const signup = (event) => {
  event.preventDefault();
  if (event.target === signupBtn) {
const url = `http://localhost:5400/api/v1/parcels?`;
// fetch(url)
//   .then((resp) => resp.json())
//   .then(function(data) {
//     let authors = data.results;
//     return authors.map(function(author) {
//       // let li = createNode('li'),
//       //     img = createNode('img'),
//       //     span = createNode('span');
//       // img.src = author.picture.medium;
//       alert.innerHTML = `${author.weight} ${author.metric}`;
//       console.log(JSON.stringify(authors));
//     })
//   })
//   .catch(function(error) {
//     console.log(error);
//   });   
// }

fetch(url)
    .then(function (res) {
        let co = res.json();
        console.log(co);
    })
  //   "allOrders": [
  //     {
  //         "id": 1,
  //         "receiver": "Jonah Fish",
  //         "trackingid": "l0_XQxQV7",
  //         "parcelcontent": "A bag of rice",
  //         "weight": 2,
  //         "pickuplocation": "12 Seriki Amass",
  //         "destination": "20 Jupiter Road",
  //         "currentlocation": "Lagos",
  //         "price": 1000,
  //         "senton": "2018-12-13T17:07:17.182Z",
  //         "metric": "kg",
  //         "user_id": 2,
  //         "email": "cowgirl@gmail.com",
  //         "status": "Pending"
  //     }
  // ]
    .then(function (data) {
      let result = `<h2> User Info From AllOrders </h2>`;
      for (val in data) {
            result +=
            `<div>
                <h5> User ID: ${data[val].id} </h5>
                <ul class="w3-ul">
                    <li> User Name : ${data[val].receiver}</li>
                    <li> parcel Status: ${data[val].status} </li>
                </ul>
            </div>`;

            console.log(result);
        };
       
       })
       
}
}    
  
     document.getElementById('signup-box').addEventListener('click', signup);

 