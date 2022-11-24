const accordion = document.getElementsByClassName("accordion--el");
const answer = document.getElementsByClassName("answer");
const arrow = document.getElementsByClassName("arrow");
const cloud = document.getElementsByClassName("invisible");
const question = document.getElementsByClassName("question");
let tracking;

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    if (tracking && !answer[i].classList.contains("active")) {
      return;
    } else {
      answer[i].classList.toggle("active");
      arrow[i].classList.toggle("rotate");
      tracking = answer[i].classList.contains("active");
    }
  });
}
