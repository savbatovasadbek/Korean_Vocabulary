import data from "../data/dataJson.js";

const answer = document.getElementById("userAnswer");
const answerBtn = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn");
const word = document.getElementById("word");
const response = document.getElementById("response");
const wordImage = document.getElementById("wordImage");
const lang = document.getElementById("lang");
const correct_res = document.getElementById("correct_res");
const songBtn = document.getElementById("song");

let user_answer = "";
let count = 0;
let correctLang = "en";
let song = new Audio("../data/audios/five.mp3");

lang.addEventListener("change", () => {
  correctLang = lang.value;
  if (correctLang == "en") {
    word.innerText = data[count].en;
  } else {
    word.innerText = data[count].uz;
  }
});

word.innerText = data[count].word;
let correctAnswer = data[count].korean;
wordImage.innerHTML = `
  <img
  id="wordImage"
  src="./data/image/${data[0].url}"
  alt="Correct answer's image"/>`;

answerBtn.addEventListener("click", () => {
  user_answer = answer.value;

  if (correctAnswer == user_answer) {
    if (correctLang == "en") {
      response.innerText = "Correct";
    } else if (correctLang == "uz") {
      response.innerText = "To'g'ri";
    }
    correct_res.innerHTML = `<h1>✅</h1>`;

    response.classList.remove("answer-incorrect");
    response.classList.add("answer-correct");
  } else {
    if (correctLang == "en") {
      response.innerText = "In corect";
    } else if (correctLang == "uz") {
      response.innerText = "Noto'g'ri";
    }
    correct_res.innerHTML = `<h1>❌</h1>`;
    response.classList.remove("answer-correct");
    response.classList.add("answer-incorrect");
  }
});

nextBtn.addEventListener("click", () => {
  answer.value = "";
  response.innerText = "";
  correct_res.innerHTML = ``;

  for (let i = 0; i < data.length; i++) {
    if (count == i) {
      correctAnswer = data[i + 1].korean;
      if (correctLang == "en") {
        word.innerText = data[i + 1].en;
      } else if (correctLang == "uz") {
        word.innerText = data[i + 1].uz;
      }
      wordImage.innerHTML = `
        <img
        id="wordImage"
        src="./data/image/${data[count + 1].url}"
        alt="Correct answer's image"/>`;
      song = new Audio(`../data/audios/${data[i + 1].audio}`);
    } else if (count == data.length - 1) {
      count = 0;
      if (correctLang == "en") {
        word.innerText = data[0].en;
      } else if (correctLang == "uz") {
        word.innerText = data[0].uz;
      }
      correctAnswer = data[0].korean;
      song = new Audio(`../data/audios/${data[0].audio}`);
      wordImage.innerHTML = `
        <img
        id="wordImage"
        src="./data/image/${data[0].url}"
        alt="Correct answer's image"/>`;
    }
  }
  count++;
});

songBtn.addEventListener("click", () => {
  song.play();
});
