import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Store } from "./Store.jsx";
import { GameName } from "./GameName.jsx";
import { GameOver } from "./GameOver.jsx";
import { Foe } from "./Foe.jsx";
import { Header } from "./Header.jsx";
import { Bonus } from "./Bonus.jsx";
import lightning from "../img/lightning.jpg";
import sword from "../img/sword.jpg";
import dragon from "../img/dragon.jpg";
import gun from "../img/gun.png";
import raygun from "../img/raygun.jpg";
import poison from "../img/poison.png";
import flamethrower from "../img/flamethrower.png";
import armor from "../img/armor.png";
import potion from "../img/potion.png";
import bomb from "../img/bomb.png";
import zombie from "../img/zombie.png";
import robot from "../img/robot.png";
import shark from "../img/shark.png";
import ghost from "../img/ghost.png";
import bam from "../img/bam.jpg";
import $ from "jquery";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.images = { poison, bam, armor };
    this.state = { ...this.initialState, record: { Wins: 0, Losses: 0 }, userName: "Warrior" };
  }
  get initialState() {
    return {
      funds: 100,
      itemCount: 0,
      yourHealth: 100,
      currentFoe: 0,
      Armor: "No",
      ArmorTurns: 0,
      Bonus: false,
      items: [
        {
          id: 0,
          name: "Sword",
          picture: sword,
          count: 0,
          cost: 2,
          text: "The sword can be used to stab opponents.",
          damage: [2, 1, 1, 2, 8],
        },
        {
          id: 1,
          name: "Bomb",
          picture: bomb,
          count: 0,
          cost: 8,
          text: "The bomb can blow things up.",
          damage: [7, 6, 4, 2, 8],
        },
        {
          id: 2,
          name: "Lightning",
          picture: lightning,
          count: 0,
          cost: 10,
          text: "A streak of lightning can be more effective on frailer foes",
          damage: [9, 9, 5, 12, 5],
        },
        {
          id: 3,
          name: "Gun",
          picture: gun,
          count: 0,
          cost: 3,
          text: "It's a gun. What would you expect to do with it?",
          damage: [4, 2, 2, 5, 2],
        },
        {
          id: 4,
          name: "Ray gun",
          picture: raygun,
          count: 0,
          cost: 4,
          text: "A gun that shoots radioactive fluid",
          damage: [5, 4, 3, 4, 4],
        },
        {
          id: 5,
          name: "Flamethrower",
          picture: flamethrower,
          count: 0,
          cost: 10,
          text: "A flamethrower",
          damage: [11, 13, 6, 2, 4],
        },
        {
          id: 6,
          name: "Poison",
          picture: poison,
          count: 0,
          cost: 3,
          text: "Slowly inflicts damage over time",
          damage: [1, 0, 1, 3, 1],
        },
        { id: 7, name: "Potion", picture: potion, count: 0, cost: 10, text: "Can be used to regain 20 health" },
        {
          id: 8,
          name: "Armor",
          picture: armor,
          count: 0,
          cost: 7,
          text: "Weakens damage taken by 20% for 10 turns",
        },
      ],
      foes: [
        { id: 0, name: "Zombie", status: "healthy", picture: zombie, health: 15, maxHealth: 15, attack: 8 },
        { id: 1, name: "Robot", status: "healthy", picture: robot, health: 31, maxHealth: 31, attack: 5 },
        { id: 2, name: "Ghost", status: "healthy", picture: ghost, health: 10, maxHealth: 10, attack: 8 },
        { id: 3, name: "Shark", status: "healthy", picture: shark, health: 40, maxHealth: 40, attack: 7 },
        { id: 4, name: "Dragon", status: "healthy", picture: dragon, health: 25, maxHealth: 25, attack: 12 },
      ],
    };
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.itemCount !== 0 && this.state.itemCount === 0 && this.state.funds !== 100) {
      this.handleLoss("outOfItems");
    }
  };
  handleNameChange = (e) => {
    this.setState({ userName: e.target.value });
  };
  handleIncrement = (item) => {
    if (this.state.funds - item.cost >= 0) {
      const items = [...this.state.items];
      items[item.id].count++;
      this.setState((prevState) => {
        return {
          funds: prevState.funds - item.cost,
          items,
        };
      });
    }
  };
  handleDecrement = (item) => {
    if (item.count > 0) {
      const items = [...this.state.items];
      items[item.id].count--;
      this.setState((prevState) => {
        return {
          funds: prevState.funds + item.cost,
          items,
        };
      });
    }
  };
  resetStore = () => {
    const items = this.state.items.map((item) => {
      item.count = 0;
      return item;
    });
    this.setState({
      funds: 100,
      items,
    });
  };
  handleZero = (item) => {
    const items = [...this.state.items];
    const count = [...item.count];
    items[item.id].count = 0;
    this.setState((prevState) => {
      return {
        funds: prevState.funds + item.cost * count,
        items,
      };
    });
  };
  handleLevelButtons = (level) => {
    switch (level) {
      case 0:
        $("#btn1").removeClass("btn-secondary");
        $("#btn1").addClass("btn-primary");
        break;
      case 1:
        $("#btn2").addClass("btn-danger");
        break;
      case 2:
        $("#btn3").addClass("btn-warning");
        break;
      case 3:
        $("#btn4").addClass("btn-info");
        break;
      case 4:
        $("#btn5").addClass("btn-success");
        break;
      case "reset":
        $("#btn1").addClass("btn-secondary");
        $("#btn1").removeClass("btn-primary");
        $("#btn2").removeClass("btn-danger");
        $("#btn3").removeClass("btn-warning");
        $("#btn4").removeClass("btn-info");
        $("#btn5").removeClass("btn-success");
        break;
      default:
        break;
    }
  };
  handleWin = () => {
    $("#gameOverText").html("You won. Congratulations!!");
    setTimeout(() => {
      $("#game").fadeOut(3000, () => {
        $(".gameOver").show();
      });
    }, 500);
    const record = { ...this.state.record };
    record.Wins++;
    this.setState({ record });
  };
  handleLoss = (method) => {
    switch (method) {
      case "outOfItems":
        $("#gameOverText").html("Game over. You ran out of items.");
        break;
      case "giveUp":
        $("#gameOverText").html("You have given up and brought shame to your nobel family.");
        break;
      case "health":
        $("#gameOverText").html("Game over. You died.");
        $(".yourHealthBar").animate({ width: "0%" }, 500, "linear");
        break;
      default:
        break;
    }
    setTimeout(() => {
      $("#game").fadeOut(2000, () => {
        $(".gameOver").show();
      });
    }, 500);
    this.updateRecord("Loss");
  };
  handleBonusChoice = (type, amount, bonusItemId, itemName) => {
    $(".shownValue").hide();
    $(".hiddenValue").show();
    $(`#bonusItem${bonusItemId}`).addClass("chosen");
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`bonusItem${i}`).style.pointerEvents = "none";
    }
    switch (type) {
      case "cash":
        this.setState((prevState) => {
          return {
            funds: prevState.funds + amount,
          };
        });
        break;
      case "item":
        const items = this.state.items.map((item) => {
          if (item.name === itemName) {
            item.count += amount;
          }
          return item;
        });
        this.setState((prevState) => {
          return {
            itemCount: prevState.itemCount + amount,
            items,
          };
        });
        break;
      default:
        break;
    }
  };
  handleBonus = () => {
    this.setState({ Bonus: true });
    $("#game").hide();
  };
  handleBonusEnd = () => {
    this.setState({ Bonus: false });
  };
  updateRecord(result) {
    let record = { ...this.state.record };
    if (result === "Win") {
      record.Wins++;
    } else if (result === "Loss") {
      record.Losses++;
    }
    this.setState({ record });
  }
  handleAttack = (foes, currentFoe, useItem) => {
    const poisonDamageToFoe = currentFoe.status === "Poisoned" ? 2 : 0,
      attackDamageToFoe =
        useItem.name === "Poison" ? useItem.damage[currentFoe.id] : Math.floor(Math.random() * 3) - 1 + useItem.damage[currentFoe.id], //Damage +/- 1, don't +/- 1 if poison
      totalDamageToFoe = poisonDamageToFoe + attackDamageToFoe;
    const attackDamageToYou = currentFoe.attack + Math.floor(Math.random() * 5) - 2,
      totalDamageToYou = this.state.Armor === "Yes" ? Math.floor(attackDamageToYou * 0.8) : attackDamageToYou,
      yourHealth = this.state.yourHealth - totalDamageToYou;
    if (yourHealth <= 0) {
      this.handleLoss("health");
      return;
    }
    $("#theirItem").html(`<img src=${this.images.bam} class="itemImage" /> ${totalDamageToYou} Damage!`);
    $("#theirItem").show();
    if (currentFoe.health - totalDamageToFoe > 0) {
      //Foe still alive
      foes[currentFoe.id].health = currentFoe.health - totalDamageToFoe;
      const theirHealth = currentFoe.health * (100 / currentFoe.maxHealth);
      if (currentFoe.status === "Poisoned") {
        $("#yourItem").html(
          `<img src=${useItem.picture} class="itemImage" /> ${attackDamageToFoe} Damage! <img src=${this.images.poison} class="itemImage" /> ${poisonDamageToFoe} Damage!`
        );
      } else {
        $("#yourItem").html(`<img src=${useItem.picture} class="itemImage" /> ${totalDamageToFoe} Damage!`);
      }
      $("#yourItem").show();
      $(".yourHealthBar").animate({ width: `${yourHealth}%` }, 200);
      this.renderFoe(currentFoe.id, theirHealth);
    } else {
      //handle kill
      $("#yourItem").html(`<img src=${useItem.picture} class="itemImage" /> ${currentFoe.health} Damage!`);
      foes[currentFoe.id].health = 0;
      this.handleKill(currentFoe);
    }
    this.setState({ yourHealth });
  };
  handlePotion = () => {
    const yourHealth = this.state.yourHealth <= 80 ? this.state.yourHealth + 20 : 100;
    $(".yourHealthBar").animate({ width: `${yourHealth}%` }, 500);
    this.setState({ yourHealth });
  };
  handleArmorDeduction = () => {
    if (this.state.ArmorTurns > 1) {
      this.setState((prevState) => {
        return { ArmorTurns: prevState.ArmorTurns - 1 };
      });
    } else if (this.state.ArmorTurns === 1) {
      this.setState({ ArmorTurns: 0, Armor: "No" });
      $("#yourStatus").html("");
    }
  };
  renderFoe = (id, theirHealth, newFoe) => {
    ReactDOM.render(<Foe key={id} foe={this.state.foes[id]} />, document.getElementById("foe"), () => {
      $(".theirHealthBar").animate({ width: `${theirHealth}%` }, 200);
      if (newFoe) {
        this.handleLevelButtons(id);
        $(`#foe${id}`).show();
      }
    });
  };
  handleKill = (currentFoe) => {
    $(".theirHealthBar").animate({ width: "1%" }, 500, "linear", () => {
      $(`#foe${currentFoe.id}`).fadeOut(3000);
      if (currentFoe.id === this.state.foes.length - 1) {
        this.handleWin();
      } else {
        const foeNumber = currentFoe.id + 1;
        this.setState({ currentFoe: foeNumber });
        if (foeNumber === 2) {
          this.handleBonus();
        } else {
          this.renderFoe(foeNumber, 100, true);
        }
      }
    });
    $("#yourItem").hide();
    $("#theirItem").hide();
  };
  handleTurn = (useItem) => {
    let items,
      currentFoeId = this.state.currentFoe;
    items = [...this.state.items];
    const index = items.indexOf(useItem);
    items[index].count--;
    let foes = [...this.state.foes];
    const currentFoe = foes[currentFoeId];

    if (useItem.name === "Armor") {
      $("#yourStatus").html(`<img src=${this.images.armor} height='40px' width='40px' />`);
      this.setState({ Armor: "Yes", ArmorTurns: 10 });
    } else if (useItem.name === "Potion") {
      this.handlePotion();
    } else {
      this.handleAttack(foes, currentFoe, useItem);
    }
    if (useItem.name === "Poison" && currentFoe.name !== "Robot") {
      currentFoe.status = "Poisoned";
      $(".theirStatus").html(`<img src=${this.images.poison} height='40px' width='40px' />`);
      $(".theirStatus").show();
    }
    this.setState((prevState) => {
      return {
        itemCount: prevState.itemCount - 1,
        items,
        foes,
      };
    });
    if (this.state.ArmorTurns >= 1) {
      this.handleArmorDeduction();
    }
  };
  playGame = () => {
    $("#store").hide();
    $("#game").show();
    this.renderFoe(this.state.currentFoe, 100, true);
    let itemsBought = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      itemsBought += this.state.items[i].count;
    }
    this.setState({ itemCount: itemsBought });
    $("#yourItem").hide();
    $("#theirItem").hide();
  };
  playAgain = () => {
    this.setState(this.initialState);
    this.handleLevelButtons("reset");
    $(".theirHealthBar").width("100%");
    $(".yourHealthBar").width("100%");
    $("#store").show();
    $("#game").hide();
    $(".gameOver").hide();
    $("#yourStatus").html("");
    $(".theirStatus").html("");
    $(".theirStatus").hide();
  };
  render() {
    return (
      <React.Fragment>
        <Header userName={this.state.userName} record={this.state.record} funds={this.state.funds} />
        <Store
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onReset={this.resetStore}
          onPlay={this.playGame}
          onZero={this.handleZero}
          funds={this.state.funds}
          items={this.state.items}
          currentFoe={this.state.currentFoe}
          onNameChange={this.handleNameChange}
        />
        <div id="game">
          <GameName
            yourHealth={this.state.yourHealth}
            foes={this.state.foes}
            items={this.state.items}
            onGiveUp={this.handleLoss}
            onTurn={this.handleTurn}
            userName={this.state.userName}
          />
        </div>
        <div id="bonus">
          {this.state.Bonus ? (
            <Bonus
              onBonusChoice={this.handleBonusChoice}
              onBonusEnd={this.handleBonusEnd}
              bonusItems={[1, 2, 3, 4]}
              items={this.state.items}
              renderFoe={this.renderFoe}
            />
          ) : null}
        </div>
        <GameOver onPlayAgain={this.playAgain} />
      </React.Fragment>
    );
  }
}
