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
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
