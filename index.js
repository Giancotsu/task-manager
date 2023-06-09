const placeholderData = [
    {
      id: 0,
      name: "In Coda",
      tasks: [
        { id: 0, name: "Rispondere alle email" },
        { id: 1, name: "Allenare gambe" },
        { id: 2, name: "Ricaricare credito telefono" },
        { id: 3, name: "Prenotare visita dentista" },
      ],
    },
    {
      id: 1,
      name: "Aperto",
      tasks: [],
    },
    {
      id: 2,
      name: "In Revisione",
      tasks: [],
    },
    {
      id: 3,
      name: "Completato",
      tasks: [],
    },
];

let data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : placeholderData

generaTask();


const tasks = document.querySelectorAll(".task");
const colonne = document.querySelectorAll(".colonna");

let dragItem = null;
let dragData = null;

tasks.forEach(task =>{
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
});

function dragStart(){
    console.log("start");

    setTimeout(() => this.classList.add("hidden"), 0);
    dragItem = this;

    const indexColonna = data.findIndex((colonna) => {
        return colonna.id == this.parentElement.getAttribute("data-column");
    });

    const indexTask = data[indexColonna].tasks.findIndex((task) => {
        return task.id == this.getAttribute("data-task");
    });

    dragData = data[indexColonna].tasks.splice(indexTask, 1)[0];
    localStorage.setItem("data", JSON.stringify(data));

}

function dragEnd(){
    console.log("end");

    this.classList.remove("hidden");
    dragItem = null;

    data[this.parentElement.getAttribute("data-column")].tasks.push(dragData);
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
}

colonne.forEach(col => {
    col.addEventListener("dragover", dragOver);
    col.addEventListener("dragenter", dragEnter);
    col.addEventListener("dragleave", dragLeave);
    col.addEventListener("drop", drop);
})

function dragOver(e){
    console.log("over");

    e.preventDefault();
}

function dragEnter(){
    console.log("enter");
}

function dragLeave(){
    console.log("leave");
}

function drop(){
    console.log("drop");

    this.append(dragItem);
}

function generaTask(){
    data.forEach((colonna) => {
        const targetColonna = document.querySelector(`[data-column="${colonna.id}"]`);
        colonna.tasks.forEach((task) => {
            const element = document.createElement("div");
            element.className = "task p-4 rounded-xl shadow-xl bg-white";
            element.setAttribute("draggable", true);
            element.setAttribute("data-task", task.id);
            const text = document.createTextNode(task.name);
            element.appendChild(text);
            targetColonna.appendChild(element);
        });
    });
}