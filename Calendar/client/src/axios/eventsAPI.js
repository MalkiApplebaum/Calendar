import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5102";


export function saveEvent(eventId,userId,title,description,startDate,endDate) {
axios.post( "/Event",

  {
    "eventId": eventId,
    "userId": userId,
    "title": title,
    "description":description,
    "startDate": startDate,
    "endDate":endDate
  }
)
    .then(function (response) {
      console.log(response);

      

    })
    .catch(function (error) {

      console.log(error);
     
    });
}


export async  function userEvent(userId) {

  return await axios.get(`/Event/${userId}`)
    .then(function (response) {
      console.log(response);
      return response
    })
    .catch(function (error) {
      console.log(error);
    });

}
export async  function DeleteEvent(eventId) {
  console.log(eventId);
  return await axios.delete(`/Event/${eventId}`)
    .then(function (response) {
      console.log(response);
      return response
    })
    .catch(function (error) {
      console.log(error);
    });

}

