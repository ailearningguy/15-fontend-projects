const toDoBox = document.getElementById("to-do");
const inProgressBox = document.getElementById("in-progress");
const doneBox = document.getElementById("done");

console.log(typeof toDoBox, toDoBox);
console.log(inProgressBox);
console.log(doneBox);

const itemsToDo = [...toDoBox.getElementsByClassName("item")];

itemsToDo.forEach((element) => {
  element.addEventListener("dragstart", dragHandler);
});

const itemsInProgress = [...inProgressBox.getElementsByClassName("item")];

itemsInProgress.forEach((element) => {
  element.addEventListener("dragstart", dragHandler);
});

const itemsDone = [...doneBox.getElementsByClassName("item")];

itemsDone.forEach((element) => {
  element.addEventListener("dragstart", dragHandler);
});

function dragHandler(ev) {
  const etarget = ev.target;
  console.log(etarget);
}
