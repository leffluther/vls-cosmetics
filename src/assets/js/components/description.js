const boxes = Array.from(document.querySelectorAll(".box"));

boxes.forEach((box) => {
    box.addEventListener("click", boxHandler);
});

function boxHandler(e) {
    e.preventDefault();
    let currentBox = e.target.closest(".box");
    let currentContent = e.target.nextElementSibling;
    currentBox.classlist.toggle("active");
    if (currentBox.classlist.conains("active")) {
        currentContent.style.maxHeight = currentContent + "px";
    } else {
        currentContent.style.maxHeight = 0;
    }
}