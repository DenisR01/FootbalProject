import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/footbalPlayers'; 

export default {
  getFootbalPlayers() {
    return axios.get(apiUrl);
  },
  getFootbalPlayer(id){
    return axios.get(`${apiUrl}/${id}`)
  },
  addFootbalPlayer(newFootbalPlayer) {
    return axios.post(apiUrl, newFootbalPlayer);
  },
  editFootbalPlayer(id, modifiedFootbalPlayer) {
    return axios.put(`${apiUrl}/${id}`, modifiedFootbalPlayer);
  },
  deleteFootbalPlayer(id) {
    return axios.delete(`${apiUrl}/${id}`);
  },
};