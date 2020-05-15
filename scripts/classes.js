class Prompt {
  constructor(text, location, choices) {
    this.text = text;
    this.location = location;
    this.choices = choices;
  }

  static generateChoices(choices) {
    return choices.map((choice) => {
      return new Choice(choice.text, Choice.generatePrompt(choice.prompt));
    });
  }

  displayPrompt() {
    const location = document.createElement("div");
    location.id = this.location.toLowerCase().replace(/\s/g, "");
    document.querySelector("#location").innerHTML = "";
    document.querySelector("#location").appendChild(location);

    document.querySelector("#prompt").textContent = this.text;
    document.querySelector("#choices").innerHTML = "";
    this.choices.forEach((choice) => {
      choice.displayChoice();
    });
  }
}

class Choice {
  constructor(text, promptOutcome) {
    this.text = text;
    this.promptOutcome = promptOutcome;
  }

  static generatePrompt(prompt) {
    if (prompt)
      return new Prompt(
        prompt.text,
        prompt.location,
        Prompt.generateChoices(prompt.choices)
      );
  }

  displayChoice() {
    const li = document.createElement("li");
    li.textContent = this.text;
    li.classList.add("choice");
    document.querySelector("#choices").appendChild(li);
    li.addEventListener("click", this.clicked);
  }

  clicked = () => {
    this.promptOutcome.displayPrompt();
  };
}

function buildGame(adventure) {
  const start = new Prompt(
    adventure.start.text,
    adventure.start.location,
    Prompt.generateChoices(adventure.start.choices)
  );
  return start;
}
