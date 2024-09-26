const grid = document.querySelector(".grid");
const btnNew = document.querySelector("#btn-new");
const btnMode = document.querySelector("#btn-mode");
const tools = document.querySelector(".tools")
let mode = "black";
let pMode = document.createElement("p")
pMode.innerText = "current mode: " + mode;
tools.appendChild(pMode);


function createRow(rowSize, columnNumber) {
    let row = document.createElement("div");
    row.classList.add("row");
    grid.appendChild(row);
    for(let i = 0; i < rowSize; i++) {
        let block = document.createElement("div");
        block.classList.add("block");
        block.setAttribute("id", "block" + columnNumber + i);
        block.style.opacity = "0.5";
        row.appendChild(block);
        block.addEventListener("mouseover", () => { 
            switch (mode) {
                case "black":
                    block.style.backgroundColor = "black";
                    if (Number(block.style.opacity) < 0.5) {
                        block.style.opacity = "0.5"
                    }
                    mode = "black";
                    break;
                case "random":
                    block.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
                    if (Number(block.style.opacity) < 0.5) {
                        block.style.opacity = "0.5";
                    }
                    mode = "random";
                    break;
                case "darken":
                    block.style.opacity = Number(block.style.opacity) + 0.1;
                    break;
                case "whiten":
                    block.style.opacity = Number(block.style.opacity) - 0.1;
                    break;
            }
        
        });
    }
}

function createGrid(size) {
    let columnNumber = 0;
    for(let i = 0; i < size; i++) {
        columnNumber = i;
        createRow(size, columnNumber);
    }
}

function clearGrid() {
    let size = prompt("please choose size", 16);
    while(size > 100) {
        size = prompt("100 is the max");
    }
    let rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
        row.remove();
    });
    createGrid(size);
}

createGrid(16);

btnMode.addEventListener("click" , () => {
    switch (mode) {
        case "black":
            mode = "random";
            pMode.innerText = "current mode: " + mode;
            break;
        case "random":
            mode = "darken";
            pMode.innerText = "current mode: " + mode;
            break;
        case "darken":
            mode = "whiten";
            pMode.innerText = "current mode: " + mode;
            break;
        case "whiten":
            mode = "black";
            pMode.innerText = "current mode: " + mode;
            break;
    }
    console.log(mode);
});

btnNew.addEventListener("click" , () => {
    clearGrid();
});