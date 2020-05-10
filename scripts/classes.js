const adventure = {
  start: {
    text:
      "Your alarm goes off. You decide whether to wake up or hit the snooze button and rest for ten more minutes.",
    choices: [
      {
        text: "Wake Up",
        prompt: {
          text: "You wake up, taking some extra time to get ready and stretch.",
          choices: [],
        },
      },
      {
        text: "Snooze",
        prompt: {
          text:
            "You hit snooze and attempt to rest for ten more minutes, however you accidentally turned off the alarm clock instead, cuasing you to sleep in for much longer than planned. You are awakened by the piercing blaring of alarms and quickly get dressed with little to no regard for your appearance.",
          choices: [],
        },
      },
    ],
  },
};

class Prompt {
  constructor(text, choices) {
    this.text = text;
    this.choices = choices;
  }

  static generateChoices(choices) {
    return choices.map((choice) => {
      return new Choice(choice.text, Choice.generatePrompt(choice.prompt));
    });
  }

  displayPrompt() {
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
      return new Prompt(prompt.text, Prompt.generateChoices(prompt.choices));
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
    Prompt.generateChoices(adventure.start.choices)
  );
  return start;
}

const game = buildGame(adventure);

game.displayPrompt();
