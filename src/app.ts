let appId = "abc";
const button = document.querySelector("button");

const addCodeQuality = (n1: number, n2: number) => {
  if (n1 + n2 > 0) {
    return n1 + n2
  }
  return;

}

const clickHandler = (message: string) => {
  let userName = "Max";
  console.log("Clicked!" + message);
};

// a comment
if (button) {
  button.addEventListener("click", clickHandler.bind(null, "You're Welcome!"));
}
