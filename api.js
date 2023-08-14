const baseURL = "https://htmlcanvasgamebackend.onrender.com/api";

export const fetchHighscores = () => {
  return fetch(`${baseURL}/highscores`)
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
};

export const fetchHighscoresByUsername = (username) => {
  return fetch(`${baseURL}/highscore?username=${username}`)
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
};

export const postNewHighscore = (username, score) => {
  const postObject = {
    username: username,
    score: score,
  };
  return fetch(`${baseURL}/highscore`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      return data;
    });
};

// fetchHighscores();
// fetchHighscoresByUsername("ryan");
// postNewHighscore("tester12", 5);
