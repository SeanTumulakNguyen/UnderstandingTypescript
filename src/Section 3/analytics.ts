console.log("Sending...");

let logged;

const sendAnalytics = (data: string) => {
  console.log(data);
  logged = true;
  logged = "Max";
};

sendAnalytics("The data");
