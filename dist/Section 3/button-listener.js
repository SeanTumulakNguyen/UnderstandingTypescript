"use strict";
const button = document.querySelector("button");
// a comment
if (button) {
    button.addEventListener("click", () => {
        console.log("Clicked!");
    });
}
