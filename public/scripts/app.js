const start = new Prompt(
  adventure.start.text,
  adventure.start.location,
  Prompt.generateChoices(adventure.start.choices)
);

console.log("hello");

start.displayPrompt();

function setDocHeight() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight / 100}px`
  );
}

addEventListener("resize", setDocHeight);

setDocHeight();
