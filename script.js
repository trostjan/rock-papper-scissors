// overlay rules

var btnRules = document.getElementById("btnRules");
var overlay = document.getElementById("overlay");
var modal = document.getElementById("modal");
var closeModal = document.getElementById("closeModal");

btnRules.addEventListener("click", function(){
    overlay.classList.remove("fade-out");
    modal.classList.remove("fade-out");
    overlay.classList.add("fade-in");
    modal.classList.add("fade-in");
})

closeModal.addEventListener("click", function(){
    overlay.classList.remove("fade-in");
    modal.classList.remove("fade-in");
    overlay.classList.add("fade-out");
    modal.classList.add("fade-out");
})

// gameplay

var playboard = document.getElementById("playboard");
var yourChoice = document.querySelector(".yourChoice");
var houseInitial = document.querySelector(".houseChoice");
var results = document.querySelector(".results"); 
var result = document.querySelector(".result"); 
var scoreCount = document.querySelector(".score-count");
const choices = document.querySelectorAll('.choice')

var score = 0;

var choice =[
    {
        name:"paper",
        beats:"rock"
    },
    {
        name:"scissors",
        beats:"paper",
    },
    {
        name:"rock",
        beats:"scissors",
    }
]

choices.forEach(function(currentBtn){
  currentBtn.addEventListener('click', function(){
      playboard.classList.add("hide");
      results.classList.remove("hide");
      var choiceId = currentBtn.dataset.choice;
      var randomChoiceId = housePicked(choice);
      setTimeout(function(){
        renderFirst(choiceId);
      }, 300);
      setTimeout(function(){
        const choices = document.querySelectorAll('.choice')
        addBouncyAnimation(choices);
      }, 400);
      setTimeout(function(){
        const choices = document.querySelectorAll('.choice')
        addBouncyAnimation(choices);
      }, 1500);
      setTimeout(function(){
        const choices = document.querySelectorAll('.choice')
        addBouncyAnimation(choices);
      }, 1600);
      setTimeout(function(){
          renderSecond(randomChoiceId);
      },2600);
      setTimeout(function(){
          addBouncyAnimation(choices)
          var outcome = declareWinner(choiceId, randomChoiceId);
          renderThird(outcome);
          updatescore(outcome);
          renderForth(score);
          var playagain = document.querySelector(".playagain");
              playagain.addEventListener("click", function(){
              resetGame();
              playboard.classList.remove("hide");
              results.classList.add("hide");
          })
      },3000);

  })
})


//functions

function renderFirst(choiceId){
    var renderYourChoice = `
        <h2>YOU PICKED</h2>
        <button type='button' class='choice ${choiceId}'>
            <img src='images/icon-${choiceId}.svg' alt='${choiceId}'>
        </button>
        `;
    var renderHouseInitial = `
        <h2>HOUSE PICKED</h2>
        <div class="choice emptyCircle"></div>
    `
    yourChoice.innerHTML = renderYourChoice;
    houseInitial.innerHTML = renderHouseInitial;
}

function renderSecond(houseChoiceId){
    var renderHouseChoice = `
    <h2>HOUSE PICKED</h2>
    <button type='button' class='choice ${houseChoiceId}'>
        <img src='images/icon-${houseChoiceId}.svg' alt='${houseChoiceId}'>
    </button>
    `;
    houseInitial.innerHTML = renderHouseChoice;
}

function renderThird(outcome){
    result.classList.remove("hide");
    result.innerHTML = `
    <h1 class="outcome">${outcome}</h1>
    <button type='button' class='playagain'>PLAY AGAIN</button>
    `;
}

function renderForth(score){
    scoreCount.innerHTML = score;
}

function addBouncyAnimation(choices){
    choices.forEach(function(current){
        current.classList.toggle("bounce");
    })
}


function housePicked(choice){
    const random = Math.floor(Math.random() * choice.length);
    var randomChoice = choice[random]["name"];
    return randomChoice;
}


function declareWinner(playerChoice, houseChoice){
        var index = getIndex(houseChoice);
        if(playerChoice == houseChoice){
            var outcome = "TIE";
        }else if(playerChoice == choice[index]["beats"]){
            var outcome = "YOU LOSE";
        }else{
            var outcome = "YOU WIN";
        }
        return outcome;
}

function getIndex(houseChoice){
    for(index in choice){
        if(houseChoice == choice[index]["name"]){
            return index;
        }
    }
}

function updatescore(outcome){
    if(outcome == "YOU WIN"){
        score = score + 1;
        yourChoice.classList.add("winner");
    }else if (outcome == "YOU LOSE"){
        score = score - 1;
        houseInitial.classList.add("winner");
    }
}

function resetGame() {
    yourChoice.innerHTML = "";
    houseInitial.innerHTML = "";
    result.innerHTML ="";
    result.classList.add("hide");
    if(document.querySelector(".winner")){
        var removeWinner = document.querySelector(".winner");
        removeWinner.classList.remove("winner");
    }
}