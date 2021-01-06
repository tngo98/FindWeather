const bars = document.querySelector("#bars");
const menu = document.querySelector("#menu");

bars.addEventListener("click", () => {
  if (menu.classList.contains("hidden") && window.innerWidth < 768) {
    menu.classList.remove("hidden");
    menu.classList.add(
      "flex",
      "flex-col",
      "text-center",
      "bg-purple-600",
      "w-full",
      "absolute",
      "top-16"
    );
  } else {
    menu.classList.add("hidden");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    menu.classList.add("hidden");
    menu.classList.remove(
      "flex",
      "flex-col",
      "text-center",
      "bg-purple-600",
      "w-full",
      "absolute",
      "top-16"
    );
  }
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const errorMsg = document.querySelector("#errorMsg");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageFour = document.querySelector("#message-4");
const messageFive = document.querySelector("#message-5");
const forecastDiv = document.querySelector("#forecast");

messageOne.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  errorMsg.textContent = "Loading...";
  if (!forecastDiv.classList.contains("hidden")) {
    forecastDiv.classList.add("hidden");
  }

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorMsg.textContent = data.error;
      } else {
        errorMsg.textContent = "";
        messageOne.textContent = data.location;
        messageTwo.textContent = data.description;
        document.querySelector("#message-3").src = data.icon;
        messageFour.textContent = "Currently: " + data.temperature;
        messageFive.textContent = "Feels Like: " + data.feelslike;
        forecastDiv.classList.remove("hidden");
      }
    });
  });
});
