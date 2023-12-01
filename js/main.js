let $ = document;
let list = _id("list");
let inputText = _id("inputText");
let userInput = _id("userInput");
let firstLi = _class("first-li")[0];
let inputTextMessage = "Add an item to your todo list and press Enter";
let pencilIcon = _id("pencilIcon");
let firstLiText = $.querySelector(".first-li > span");
let topText = _id("topText");

function _id(elementId) {
    return $.getElementById(elementId);
}
function _class(elementClass) {
    return $.querySelectorAll(`.${elementClass}`);
}
window.addEventListener("load", function () {
    inputText.innerHTML = inputTextMessage;
});
userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !userInput.value) {
        inputText.innerHTML = "Input is empty!";
        inputText.style.color = "red";
        setTimeout(function () {
            inputText.innerHTML = inputTextMessage;
            inputText.style.color = "#fff";
        }, 3000);
    } else if (e.key === "Enter") {
        firstLi.classList.remove("round");
        let newLiElement = $.createElement("li");
        let spanElement = $.createElement("span");
        let trashIconElement = $.createElement("i");
        spanElement.innerHTML = userInput.value.trim();
        trashIconElement.classList.add("bi", "bi-trash", "trash");
        newLiElement.appendChild(spanElement);
        newLiElement.appendChild(trashIconElement);
        list.appendChild(newLiElement);
        userInput.value = "";
        trashIconElement.addEventListener("click", function (e) {
            topText.innerHTML = "";
            let undo = $.createElement("span");
            undo.id = "undo";
            undo.innerHTML = "undo";
            let ulChildCount = e.target.parentElement.parentElement.childElementCount;
            if (ulChildCount === 2)
                firstLi.classList.add("round");
            let parentText = e.target.parentElement.firstElementChild.textContent;
            let removedElement = e.target.parentElement;
            function undoHandler() {
                list.append(removedElement);
                firstLi.classList.remove("round");
                topText.style.visibility = "hidden";
            }
            e.target.parentElement.remove();
            topText.innerHTML = `The to do item "${parentText}" was removed!`;
            topText.appendChild(undo);
            topText.style.visibility = "visible";
            undo.addEventListener('click', undoHandler);
            setTimeout(function () {
                topText.style.visibility = "hidden";
                undo.removeEventListener('click', undoHandler);
            }, 5000);
        });
    }
});
pencilIcon.addEventListener("click", function (e) {
    let newInput = $.createElement("input");
    newInput.classList.add("newInput");
    if (e.target.classList.contains("bi-pencil-square")) {
        e.target.previousSibling.remove();
        e.target.parentElement.prepend(newInput);
        e.target.classList.remove("bi-pencil-square");
        e.target.classList.add("bi-check2");
        newInput.focus()
    } else if (e.target.classList.contains("bi-check2")) {
        let newFirstLiValue = e.target.previousElementSibling.value;
        e.target.previousElementSibling.remove();
        e.target.classList.remove("bi-check2");
        e.target.classList.add("bi-pencil-square");
        e.target.parentElement.prepend(newFirstLiValue);
    }
});
