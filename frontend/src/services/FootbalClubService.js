import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/footbalClubs'; 

export default {
  getFootbalClubs() {
    return axios.get(apiUrl);
  },
  getFootbalClub(id){
    return axios.get(`${apiUrl}/${id}`)
  },
  addFootbalClub(newFootbalClub) {
    return axios.post(apiUrl, newFootbalClub);
  },
  editFootbalClub(id, modifiedFootbalClub) {
    return axios.put(`${apiUrl}/${id}`, modifiedFootbalClub);
  },
  deleteFootbalClub(id) {
    return axios.delete(`${apiUrl}/${id}`);
  },
};