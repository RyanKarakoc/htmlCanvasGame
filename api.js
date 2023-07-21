const axios = require("axios");

const highscoresAPI = axios.create({
  baseURL: "https://htmlcanvasgamebackend.onrender.com/api",
});

export const fetchHighscores = () => {
  return highscoresAPI.get("/highscores").then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export const fetchHighscoresByUsername = (username) => {
  return highscoresAPI
    .get(`/highscore?username=${username}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export const postNewHighscore = (username, score) => {
  postObject = {
    username: username,
    score: score,
  };
  return highscoresAPI.post("/highscore", postObject).then((response) => {
    console.log(response.data);
    return response.data;
  });
};