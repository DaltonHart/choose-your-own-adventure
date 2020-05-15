const astroidField = {
  text: "Board ship and head to astroid field.",
  location: "mars",
  prompt: {
    text:
      "You are flying through space in an astroid field. You recieve a distress signal.",
    location: "astroid field",
    choices: [
      {
        text: "Answer the Distress Signal",
        location: "astroid field",
        prompt: {
          text: "A cyborg is found injured in a drifting ship.",
          location: "drifting ship",
          choices: [
            {
              text: "let doctor examine cyborg",
              location: "drifting ship",
              prompt: {
                choices: [],
              },
            },
            {
              text: "let cyborg repair antenna",
              location: "drifting ship",
              prompt: {
                choices: [],
              },
            },
          ],
        },
      },
    ],
  },
};

const adventure = {
  start: {
    text:
      "Your alarm goes off. You decide whether to wake up or hit the snooze button and rest for ten more minutes.",
    location: "mars",
    choices: [
      {
        text: "Wake Up",
        prompt: {
          text: "You wake up, taking some extra time to get ready and stretch.",
          location: "mars",
          choices: [
            {
              text: "Help fix Old Pinball Machine",
              prompt: {
                text: "You helped fix the pinball machine",
                location: "mars",
                choices: [],
              },
            },
            {
              text: "Don't Help fix Old Pinball Machine",
              prompt: {
                text: "You did not help fix the pinball machine",
                location: "mars",
                choices: [],
              },
            },
            {
              text: "Have Head Engineer Fix Old Pinball Machine",
              prompt: {
                text: "The Engineer fixs the machine.",
                location: "mars",
                choices: [],
              },
            },
          ],
        },
      },
      {
        text: "Snooze",
        prompt: {
          text:
            "You hit snooze and attempt to rest for ten more minutes, however you accidentally turned off the alarm clock instead, cuasing you to sleep in for much longer than planned. You are awakened by the piercing blaring of alarms and quickly get dressed with little to no regard for your appearance.",
          location: "mars",
          choices: [astroidField],
        },
      },
    ],
  },
};

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

const game = buildGame(adventure);

game.displayPrompt();
