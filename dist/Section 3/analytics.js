"use strict";
console.log("Sending...");
let logged;
const sendAnalytics = (data) => {
    console.log(data);
    logged = true;
    logged = "Max";
};
sendAnalytics("The data");
