class Game{
    answer;
    clue;
    guessesLeft;
    message;
    playing;

    constructor(answer, clue){
        this.answer = answer;
        this.clue = clue;
        this.guessesLeft = 3;
        this.message = "Out of guesses, you lose :(";
        this.playing = true;
    }
}

const clueText = document.getElementById("clueText");
const restartBtn = document.getElementById("restartBtn");
const enterBtn = document.getElementById("Enter");
const inputControls = document.getElementById("inputControl");
const inputBox = document.getElementById("guess");
const gameMessage = document.getElementById("gameMessage");
const guessesLeft = document.getElementById("guessesLeft");

let game = new Game("", "")
let guess = "";

toggleInputControls('none');

restartBtn.addEventListener("click", () => {
    StartGame(game);
});
enterBtn.addEventListener("click", () => {
    guess = inputBox.value;
    if (guess.trim().toLowerCase() == ""){
        return;
    }
    if (game.guessesLeft !=0 && game.playing == true){
        game.guessesLeft = game.guessesLeft - 1;
    }
    if (guess.trim().toLowerCase() == game.answer.toLowerCase()){
        SetMessage("You got it! Well done :)");
        game.playing = false;
        toggleInputControls('none');
        return;
    }
    else if (game.guessesLeft == 0){
        SetMessage("Out of guesses :( the answer was:  " + game.answer);
        game.playing = false;
        toggleInputControls('none');
        shakeInputControls()
        return;
    }
    else{
        shakeInputControls();
    }
    SetMessage();
})

function ValidateAnswer(guess){
    if (guess == ""){
        return false;
    }
}

function StartGame(game){
    game.playing = true;
    game.guessesLeft = 3;
    fetchAnswerAndClue(game, clueText);
    gameMessage.innerText = "";
    SetMessage();
    inputBox.value = "";
    toggleInputControls('inline-block');
    restartBtn.innerText = "Restart";
    //toggleDisplay(enterBtn, 'inline-block');
}

async function fetchAnswerAndClue(game, clueText){
    try{
        const response = await fetch("answers.json");
        let index = Math.floor(Math.random() * 100);
        if (!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        
        game.answer = data[index].artist;
        game.clue = data[index].clue;
        clueText.innerText = game.clue;
    }
    catch(error){
        console.error(error);
    }
}

function EndGame(game){
    gameMessage.innerText = game.gameMessage;
}

function SetMessage(message = "") {
    if (message == ""){
        gameMessage.innerText = "Guesses left: " + game.guessesLeft;
        return;
    }
    gameMessage.innerText = message;
}

function toggleInputControls(display){
    toggleDisplay(inputBox, display);
    toggleDisplay(enterBtn, display);
}

function toggleDisplay(element, display = "none"){
    if (element.style.display != "none" && !game.playing){
        element.style.display = "none";
        return;
    }
    element.style.display = display;
}

function shakeInputControls(){
    inputControls.classList.add("shake");

    setTimeout(function(){
        inputControls.classList.remove("shake");
    }, 500)
}