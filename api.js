import axios from "axios";

const highscoresAPI = axios.create({
  baseURL: "",
});

export const fetchHighscores = () => {
  return highscoresAPI.get("/highscores").then((data) => {
    return response.data.highscores;
  });
};

export const fetchHighscoresByUsername = (username) => {
    return highscoresAPI.get(`/highscores/${username}`).then((data) => {
      return response.data.highscores;
    });
  };