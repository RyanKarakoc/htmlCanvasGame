const axios = require("axios");

const highscoresAPI = axios.create({
  baseURL: "https://htmlcanvasgamebackend.onrender.com/api",
});

const fetchHighscores = () => {
  return highscoresAPI.get("/highscores").then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const fetchHighscoresByUsername = (username) => {
  return highscoresAPI
    .get(`/highscore?username=${username}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

const postNewHighscore = (username, score) => {
  postObject = {
    username: username,
    score: score,
  };
  return highscoresAPI.post("/highscore", postObject).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

// postNewHighscore("mike", 12);
// fetchHighscores();
fetchHighscoresByUsername("eggo");
