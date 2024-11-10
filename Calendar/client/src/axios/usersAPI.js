import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5102";

export function register(user) {
axios.post('User/Register', user)
    .then(function (response) {

      console.log(response);


    })
    .catch(function (error) {

      console.log(error);

    });


}

export async function login(UserId, Password) {
  console.log(UserId);
  console.log(Password);
  return await axios.post('User/Login',
    {
      "userId": UserId,
      "password": Password
    }

  ).then(function (response) {
    console.log(response);
    return response
  })
    .catch(function (error) {
      console.log(error);
    });

}



