const toDoBox = document.getElementById("to-do");
const inProgressBox = document.getElementById("in-progress");
const doneBox = document.getElementById("done");

const itemsList = [...document.getElementsByClassName("item")];

itemsList.forEach((element) => {
  element.addEventListener("dragstart", dragHandler);
});

let itemSelected = null;

function dragHandler(ev) {
  itemSelected = ev.target;
}

const dropZone = [...document.querySelectorAll('.box[dropzone="true"]')];
dropZone.forEach((element) => {
  element.addEventListener("dragover", (ev) => {
    ev.preventDefault();
  });
  element.addEventListener("drop", (ev) => {
    ev.target.appendChild(itemSelected);
    itemSelected = null;
  });
});
