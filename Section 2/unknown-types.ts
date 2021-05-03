// unknown type
let userInput: unknown;
let userNameTwo: string;

userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
  userNameTwo = userInput;
}

// never type

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

const result = generateError("An error occured!", 500);
console.log(result)
