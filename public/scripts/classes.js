class Prompt {
  constructor(text, location, choices) {
    this.text = text;
    this.location = location;
    this.choices = choices;
  }

  static generateChoices(choices) {
    return choices.map(function (choice) {
      return new Choice(choice.text, Choice.generatePrompt(choice.prompt));
    });
  }

  // time for more comments
  
  displayPrompt() {
    const location = document.createElement("div");
    location.id = this.location.toLowerCase().replace(/\s/g, "");
    document.querySelector("#location").innerHTML = "";
    document.querySelector("#location").appendChild(location);

    document.querySelector("#prompt").textContent = this.text;
    document.querySelector("#choices").innerHTML = "";
    this.choices.forEach(function (choice) {
      choice.displayChoice();
    });
  }
}

class Choice {
  constructor(text, promptOutcome) {
    this.text = text;
    this.promptOutcome = promptOutcome;

    this.clicked = this.clicked.bind(this);
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

  clicked() {
    this.promptOutcome.displayPrompt();
  }
}
