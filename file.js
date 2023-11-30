document.addEventListener("DOMContentLoaded", function () {
  const rulebox = document.querySelector(".rulecontainer");
  const open = document.querySelector(".rulebutton");
  const close = document.querySelector(".close-btn");
  const choice = document.querySelector(".handchoices");
  const result = document.querySelector(".resultbox");
  const selectall = document.querySelectorAll(".userchoice");
  const next = document.querySelector(".next");
  const winpage = document.querySelector(".winsection");
  const newgame = document.querySelector(".newgame");
  const playagain = document.querySelector(".playagain");
  const topelement = document.querySelector(".top");
  const userpic = document.querySelector("#userpicimage");
  const userpc = document.querySelector("#pcpick");
  const pcscore = document.querySelector("#cSCORE");
  const userscore = document.querySelector("#uSCORE");
  const htop = document.querySelector("#changehead1");
  const hbottom = document.querySelector("#changehead2");

  function saveToLocal() {
    localStorage.setItem("pcScore", pcscore.innerHTML);
    localStorage.setItem("userScore", userscore.innerHTML);
  }
  function retrieveLocal() {
    const pcScoreFromStorage = localStorage.getItem("pcScore");
    const userScoreFromStorage = localStorage.getItem("userScore");
    if (pcScoreFromStorage !== null && userScoreFromStorage !== null) {
      pcscore.innerHTML = pcScoreFromStorage;
      userscore.innerHTML = userScoreFromStorage;
    }
  }
  retrieveLocal();

  next.addEventListener("click", () => {
    choice.style.display = "none";
    result.style.display = "none";
    topelement.style.display = "none";
    next.style.display = "none";
    winpage.style.display = "block";
  });
  const play = () => {
    topelement.style.display = "flex";
    choice.style.display = "flex";
    result.style.display = "none";
    winpage.style.display = "none";
    next.style.display = "none";
  };
  newgame.addEventListener("click", play);
  playagain.addEventListener("click", play);
  const handOptions = {
    rock: "assets/rock.png",
    paper: "assets/paper.png",
    scissor: "assets/scissor.png",
  };
  const pickPc = () => {
    let a = ["rock", "paper", "scissor"];
    let b = a[Math.floor(Math.random() * 3)];
    userpc.src = handOptions[b];
    return b;
  };
  const pickUser = (hand) => {
    choice.style.display = "none";
    result.style.display = "flex";
    userpic.src = handOptions[hand];
    const compchoice = pickPc();
    compare(hand, compchoice);
  };
  selectall.forEach((element) => {
    element.addEventListener("click", (event) => {
      const value = event.target.getAttribute("id");
      if (value) {
        pickUser(value);
      }
    });
  });
  close.addEventListener("click", () => (rulebox.style.display = "none"));
  open.addEventListener("click", () => (rulebox.style.display = "flex"));

  function pulseShowUser() {
    let pulse1 = document.querySelector(".pulse1");
    pulse1.style.visibility = "visible";
  }
  function pulseShowComp() {
    let pulse2 = document.querySelector(".pulse2");
    pulse2.style.visibility = "visible";
  }

  function pulseHideUser() {
    let pulse1 = document.querySelector(".pulse1");
    pulse1.style.visibility = "hidden";
  }
  function pulseHideComp() {
    let pulse2 = document.querySelector(".pulse2");
    pulse2.style.visibility = "hidden";
  }

  const tie = () => {
    htop.innerHTML = "TIE UP";
    playagain.innerHTML = "REPLAY";
    hbottom.style.visibility = "hidden";
    next.style.display = "none";
    pulseHideUser();
    pulseHideComp();
  };
  const lost = () => {
    ++pcscore.innerHTML;
    htop.innerHTML = "YOU LOST";
    playagain.innerHTML = "PLAY AGAIN";
    hbottom.style.visibility = "visible";
    next.style.display = "none";
    pulseShowComp();
    pulseHideUser();
  };
  const won = () => {
    ++userscore.innerHTML;
    htop.innerHTML = "YOU WIN";
    playagain.innerHTML = "PLAY AGAIN";
    hbottom.style.visibility = "visible";
    next.style.display = "block";
    pulseShowUser();
    pulseHideComp();
  };
  function compare(hand, compchoice) {
    if (hand === "rock" && compchoice === "rock") {
      tie();
    } else if (hand === "rock" && compchoice === "paper") {
      lost();
    } else if (hand === "rock" && compchoice === "scissor") {
      won();
    } else if (hand === "paper" && compchoice === "paper") {
      tie();
    } else if (hand === "paper" && compchoice === "rock") {
      won();
    } else if (hand === "paper" && compchoice === "scissor") {
      lost();
    } else if (hand === "scissor" && compchoice === "rock") {
      lost();
    } else if (hand === "scissor" && compchoice === "paper") {
      won();
    } else if (hand === "scissor" && compchoice === "scissor") {
      tie();
    }
    saveToLocal();
  }
  saveToLocal();
});
