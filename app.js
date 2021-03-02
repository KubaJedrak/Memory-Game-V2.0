"use strict"

const tiles = [
    {
        id: 0, 
        name: "butterfly",
        img: "images/butterfly.png"
    },
    {
        id: 1, 
        name: "clownfish",
        img: "images/clown-fish.png"
    },
    {
        id: 2, 
        name: "flamingo",
        img: "images/flamingo.png"
    },
    {
        id: 3, 
        name: "fox",
        img: "images/fox.png"
    },
    {
        id: 4, 
        name: "frog",
        img: "images/frog.png"
    },    
    {
        id: 5,
        name: "owl",
        img: "images/owl.png"
    },
    {
        id: 6,
        name: "parrot",
        img: "images/parrot.png"
    },
    {
        id: 7,
        name: "penguin",
        img: "images/penguin.png"
    },
    {
        id: 8,
        name: "platypus",
        img: "images/platypus.png"
    },
    {
        id: 9,
        name: "rabbit",
        img: "images/rabbit.png"
    },
    {
        id: 10, 
        name: "shark",
        img: "images/shark.png"
    },
    {
        id: 11, 
        name: "sheep",
        img: "images/sheep.png"
    },
    {
        id: 12, 
        name: "squid",
        img: "images/squid.png"
    },
    {
        id: 13,
        name: "stingray",
        img: "images/stingray.png"
    },
    {
        id: 14,
        name: "turtle",
        img: "images/turtle.png"
    },
    {
        id: 15,
        name: "rhino",
        img: "images/rhino.png"
    },
    {
        id: 16,
        name: "ladybug",
        img: "images/ladybug.png"
    },
    {
        id: 17,
        name: "spider",
        img: "images/spider.png"
    },
    {
        id: 18,
        name: "bullfinch",
        img: "images/bullfinch.png"
    },
    {
        id: 19,
        name: "cat",
        img: "images/cat.png"
    },
    {
        id: 20,
        name: "chameleon",
        img: "images/chameleon.png"
    },
    {
        id: 21,
        name: "cow",
        img: "images/cow.png"
    },
    {
        id: 22,
        name: "lion",
        img: "images/lion.png"
    },
    {
        id: 23,
        name: "snake",
        img: "images/snake.png"
    },
    {
        id: 24,
        name: "zebra",
        img: "images/zebra.png"
    },
    {
        id: 25,
        name: "panda",
        img: "images/panda.png"
    }    
]

// change name of variable "difficulty" to else more clear like "selectedGameDifficulty"
// two minor changes to functions (details below in comments)
// add name and popup system
// rework the "intro" animation (info below)
   
const difficultyButtons = document.querySelectorAll(".diff-button")
const startButton = document.querySelector(".game-start-button")
const gameBox = document.querySelector(".game-box")
const displayTime = document.querySelector(".time-display")
const displayNumberOfPairs = document.querySelector(".pairs-left-display")

let difficulty
let numberOfTilesToDraw
let randomNumber
let randomIndecesArray = []
let tilesDrawn = []
let time
let timer

let cardsPaired = []
let parentOne
let parentTwo
let cardID
let cardClass
let currentChoices = []
let currentChoicesIDs = []

let gameInProgress = false
let difficultyAssigned = false

// Difficulty selection:
difficultyButtons.forEach(difficultyButton => difficultyButton.addEventListener("click", (e) => {
    difficulty = e.target.id
    startButton.disabled = false;
    assignDifficulty()
    displayDiffInfo()
}))

function displayDiffInfo() {
    timeDisplay()
    displayPairsNumber()
}

function displayPairsNumber() {
    displayNumberOfPairs.innerHTML = numberOfTilesToDraw - cardsPaired.length
    if (numberOfTilesToDraw === null) {
        displayNumberOfPairs.innerHTML = ""
    }
}

function assignDifficulty() {
    if (difficulty === "diff-easy") {
        numberOfTilesToDraw = 12
        time = 90000
    } else if (difficulty === "diff-med") {
        numberOfTilesToDraw = 16
        time = 150000
    } else if (difficulty === "diff-hard") {
        numberOfTilesToDraw = 20
        time = 210000
    }

    // changes scoreDisplay (Best Times) to currently selected game difficulty on game start:
    scoreDisplayDifficulty = difficulty
    displayScores(scoreDisplayDifficulty)
}

// Game Start:
startButton.addEventListener("click", gameStart)

// start button behaviour
function gameStart() {
    if (!gameInProgress && difficulty) {
        assignDifficulty()
        displayPairsNumber() // to reset the number of pairs to match visible on the screen
        getRandomIndecesArray()
        drawTiles()
        gameInProgressFunc() 
    } else if (gameInProgress) {
        gameLost()
    }
}

// starts the game
function gameInProgressFunc() {
    timer = setInterval( gameTimer, 10) 
    gameInProgress = true
    difficultyButtons.forEach ( button => {
        button.disabled = true
    })
    startButton.innerText = "End Game"   
}

function gameTimer() {
    time -= 10
    timeDisplay()
    if (cardsPaired.length === numberOfTilesToDraw) { // game won
        clearInterval(timer)
        gameFinished()
    } else if (time === 0) { // game lost
        clearInterval(timer)
        gameLost()
    }
}

function endGame() {
    // resetStats()
    displayPairsNumber()
    gameBox.innerHTML = "" //empties the board (also removes objects with class "empty")
    gameInProgress = false
    difficultyButtons.forEach( button => {
        button.disabled = false
    })
    startButton.innerText = "Start Game"
}

// game ended successfully - player won
function gameFinished() {
    // updateScores()
    showPopUp()
    endGame()
    // window.alert("Congratulations, you won!")  // add a popup
}

// game ended unsuccessfully - player ran out of time
function gameLost() {
    endGame()
    window.alert("Better luck next time")  // add a popup

    clearInterval(timer)
    displayTime.innerHTML = "Time Remaining: "
    resetStats() // added here because of the shift in location on the win condition
}

function resetStats() {
    time = null
    numberOfTilesToDraw = null
    cardsPaired = []
    randomIndecesArray = []
    tilesDrawn = []
}

// // Generate Tiles:
// Generate an array with random indeces:
function getRandomIndecesArray() {
    let randomIndex
    // generate an integer, then check if it isnt part of the array & if so push it in
    while (randomIndecesArray.length < numberOfTilesToDraw) {
        randomIndex = Math.floor(Math.random() * tiles.length)
        if (!randomIndecesArray.includes(randomIndex)) {
            randomIndecesArray.push(randomIndex)
        }
    }
}

// create a new array containing tiles corresponding with generated random IDs (from randomIndicesArray):
function updateTilesDrawn() {
    tiles.forEach( tile => {
        for (let i = 0; i < randomIndecesArray.length; i++ ) {
            if (tile.id === randomIndecesArray[i]) {
                tilesDrawn.push(tile)
            }
        }
    })
}

// duplicate the values in the tiles array and shuffle the array elements
function duplicateTiles() {    
    for (let i = 0; i < numberOfTilesToDraw; i++ ) {
        tilesDrawn.push(tilesDrawn[i])
    }
    tilesDrawn.sort(() => Math.random() - 0.5)    
}

// takes the tile array generated by the updateTilesDrawn func, duplicates
function drawTiles() {
    updateTilesDrawn()
    duplicateTiles()
    generateTiles()
}

// create the HTML components for each tile:
function generateTiles() {

    for (let i = 0; i <= tilesDrawn.length - 1; i++) {
        // create a new tile container - space for flipping
        let newTile = document.createElement("div")
        gameBox.appendChild(newTile)
        newTile.classList.add("tile")
        newTile.classList.add("flip-card")
            
        // create a new flippable object:
        let flipCard = document.createElement("div")
        newTile.appendChild(flipCard)
        flipCard.classList.add("flip-card-inner")
        flipCard.classList.add(`flip-card-${tilesDrawn[i].id}`)
        flipCard.setAttribute("id", i)
            
        // create flip card faces
        let flipCardFront = document.createElement("div")
        let flipCardBack = document.createElement("div")
        
        flipCard.appendChild(flipCardFront)
        flipCardFront.classList.add("flip-card-face")
        flipCardFront.classList.add("flip-card-face--front")
        let imgFront = document.createElement("img")
        imgFront.classList.add("tile-img")
        flipCardFront.appendChild(imgFront)
        imgFront.setAttribute("src", "images/question.png")

        flipCard.appendChild(flipCardBack)
        flipCardBack.classList.add("flip-card-face")
        flipCardBack.classList.add("flip-card-face--back")
        let imgBack = document.createElement("img")
        imgBack.classList.add("tile-img")
        flipCardBack.appendChild(imgBack)
        imgBack.setAttribute("src", tilesDrawn[i].img)

        function flipCardFunc() {
            if (!newTile.classList.contains("empty") && currentChoices.length < 2) {   // first condition prevents clicking empty space, 2nd prevents quickly clicking 3 tiles before timeout triggers
                flipCard.classList.toggle("is-flipped")

                cardID = flipCard.getAttribute("id")
                cardClass = tilesDrawn[i].id

                if (currentChoicesIDs.length >= 0 && currentChoicesIDs[0] !== cardID) { // prevents error when clicking on the same tile twice
                    currentChoicesIDs.push(cardID)
                    currentChoices.push(cardClass)
                } else {
                    currentChoicesIDs = []
                    currentChoices = []
                }

                if (currentChoices.length === 2) {
                    setTimeout(checkForMatch, 500);
                }
            }
        }
        newTile.addEventListener("click", flipCardFunc)
    }
}

function checkForMatch() {
    if (currentChoices[0] === currentChoices[1]) {
        emptyPairedTiles()
        resetChoices()
    } else {
        flipBack()
        resetChoices()
    }
}

// Replaces matched tiles with empty space
function emptyPairedTiles() {
    parentOne = document.getElementById(currentChoicesIDs[0]).parentElement
    parentTwo = document.getElementById(currentChoicesIDs[1]).parentElement

    parentOne.classList.remove("tile")
    parentOne.classList.remove("flip-card")
    parentOne.classList.add("empty")

    parentTwo.classList.remove("tile")
    parentTwo.classList.remove("flip-card")
    parentTwo.classList.add("empty")

    document.getElementById(currentChoicesIDs[0]).remove()
    document.getElementById(currentChoicesIDs[1]).remove()

    // push the currently matched pair into an array holding the collection of matched pair IDs
    cardsPaired.push(currentChoices[0])
    // ^ array later is used to check for game finished condition
    displayPairsNumber() //updates when tiles of the same pair are matched together
}

function flipBack() {
    document.getElementById(currentChoicesIDs[0]).classList.toggle("is-flipped")
    document.getElementById(currentChoicesIDs[1]).classList.toggle("is-flipped")
}

function resetChoices() {
    currentChoices = []
    currentChoicesIDs = []
    parentOne = null
    parentTwo = null
    cardClass = null
    cardID = null
}

function timeDisplay() {

    let minutes = Math.floor (time / 60000)
    let seconds = Math.floor((time % 60000) / 1000)
    let miliseconds = Math.floor(time % 1000) / 10

    minutes = minutes + ""
    seconds = seconds + ""
    miliseconds = miliseconds + ""

    if (minutes.length < 2) {
        minutes = "0" + minutes
    }
    if (seconds.length < 2) {
        seconds = "0" + seconds
    }    
    if (miliseconds.length < 2) {
        miliseconds = "0" + miliseconds
    }
    displayTime.innerHTML = `Time Remaining: ${minutes}:${seconds}:${miliseconds}`
}

// ----- BEST SCORES: -----

//check if Best Scores already exist & if not, populate them with empty logs:
let scoresInitialCheck = window.localStorage.getItem("scores")
let savedNameDownloaded = JSON.parse(localStorage.getItem("savedName"))

if (scoresInitialCheck === null) { 
    let zeroScores = [ // change to function
        {
            id: "diff-easy",
            values: [
                {
                    score: 0,
                    name: "-------"
                }, 
                {
                    score: 0,
                    name: "-------"
                }, 
                {
                    score: 0,
                    name: "-------"
                }
            ]
        },
        {  
            id: "diff-med",
            values: [
                {
                    score: 0,
                    name: "-------"
                }, 
                {
                    score: 0,
                    name: "-------"
                }, 
                {
                    score: 0,
                    name: "-------"
                }
            ]
        },
        {        
            id: "diff-hard",
            values: [
                {
                    score: 0,
                    name: "-------"
                }, 
                {
                    score: 0,
                    name: "-------"
                }, 
                {
                    score: 0,
                    name: "-------"
                }
            ]
        }
    ]
    window.localStorage.setItem("scores", JSON.stringify(zeroScores))
}

const scoreDiffButtons = document.querySelectorAll(".score-diff-button")
const firstScore = document.querySelector(".first-score")
const secondScore = document.querySelector(".second-score")
const thirdScore = document.querySelector(".third-score")

const firstName = document.querySelector(".first-name")
const secondName = document.querySelector(".second-name")
const thirdName = document.querySelector(".third-name")

// pull best times
let scores = JSON.parse(window.localStorage.getItem("scores"))
let scoreDisplayDifficulty
let scoreDisplayFocus

let nameChosen
let savedName

// adds Click event listener to Score Display buttons to change displayed scores based on game difficulty
scoreDiffButtons.forEach(button => {

    button.addEventListener("click", (e) => {

        scoreDiffButtons.forEach( button => {  // FRANKSTEIN AGAIN? :D
            button.classList.remove("button-active")
        })

        scoreDisplayDifficulty = e.target.id
        displayScores(scoreDisplayDifficulty)
        e.target.classList.add("button-active") // adds active class to highlight in viewport
    })
})

// updates the Best Scores display
function displayScores(scoreDisplayDifficulty) {

    scoreDiffButtons.forEach( button => {  //  removes active score display indicator
        button.classList.remove("button-active")
    })

    scores.forEach( score => {
        if (score.id === scoreDisplayDifficulty) {
            parseScoreTime(score.values[0].score, firstScore)
            firstName.innerText = score.values[0].name
            parseScoreTime(score.values[1].score, secondScore)
            secondName.innerText = score.values[1].name
            parseScoreTime(score.values[2].score, thirdScore)
            thirdName.innerText = score.values[2].name
        }
    })

    scoreDiffButtons.forEach( scoreButton => {
        if (scoreButton.id === scoreDisplayDifficulty) {
            scoreButton.classList.add("button-active")
        }
    })
}

// reformats time variable to appear as a clock 
function parseScoreTime(scoreValue, scoreDisplay) {

    let minutes = Math.floor (scoreValue / 60000)
    let seconds = Math.floor((scoreValue % 60000) / 1000)
    let miliseconds = Math.floor(scoreValue % 1000) / 10

    minutes = minutes + ""
    seconds = seconds + ""
    miliseconds = miliseconds + ""

    if (minutes.length < 2) {
        minutes = "0" + minutes
    }
    if (seconds.length < 2) {
        seconds = "0" + seconds
    }    
    if (miliseconds.length < 2) {
        miliseconds = "0" + miliseconds
    }
    scoreDisplay.innerText = `${minutes}:${seconds}:${miliseconds}`
}

// updates score array after game end
function updateScores() {                  // scores.find( score => score.id === "diff-med")
    scores.forEach( score => {
        if (score.id === difficulty) {
            for (let i = 0; i < score.values.length; i++) {
                if (time > score.values[i].score) {

                    let newScore = {
                        score: time,
                        name: nameChosen
                    }

                    score.values.splice(i, 0, newScore)
                    score.values.pop()
                    localStorage.setItem("scores", JSON.stringify(scores))
                    break
                }
            }
        }
    })
    // changes score display to the selected Game Difficulty on game End:
    scoreDisplayDifficulty = difficulty
    displayScores(scoreDisplayDifficulty)
    savedName = nameChosen

    updateSavedName()
    resetStats() // resets stats for the next game
}

function autoUpdateScores() {                  // scores.find( score => score.id === "diff-med")
    scores.forEach( score => {
        if (score.id === difficulty) {
            for (let i = 0; i < score.values.length; i++) {
                if (time > score.values[i].score) {

                    let newScore = {
                        score: time,
                        name: savedNameDownloaded
                    }

                    score.values.splice(i, 0, newScore)
                    score.values.pop()
                    localStorage.setItem("scores", JSON.stringify(scores))
                    break
                }
            }
        }
    })
    // changes score display to the selected Game Difficulty on game End:
    scoreDisplayDifficulty = difficulty
    displayScores(scoreDisplayDifficulty)

    resetStats() // resets stats for the next game
}

// ------- POP-UPs Behaviour: ------- 
const popupWindow = document.querySelector(".popup-box")
const exitButton = document.querySelector(".popup-exit-frame")
const popupContent = document.querySelector(".popup-content")
const popupInput = document.querySelector(".popup-input")
const popupConfirmation = document.querySelector(".popup-confirmation")

const nameInput = document.querySelector("#player-name")
const nameConfirmBtn = document.querySelector(".form-button")

const playAgainYes = document.querySelector(".popup-button-play-yes")
const playAgainNo = document.querySelector(".popup-button-play-no")

// ----------------------
// button event listeners:

exitButton.addEventListener("click", () => {
    popupWindow.style.display = "none"

    autoUpdateScores() // updates scores based on the stored name
})

function updateSavedName() {
    localStorage.setItem("savedName", JSON.stringify(savedName))
}

nameConfirmBtn.addEventListener("click", () => {

    let input = nameInput.value

    if (input != "") {
        nameChosen = nameInput.value.trim();
    
        popupInput.style.display = "none"
        popupConfirmation.style.display = "block"

        updateScores()
    }
})

playAgainYes.addEventListener("click", () => {
    popupWindow.style.display = "none"
    popupConfirmation.style.display = "none"
})

function showPopUp() {
    popupWindow.style.display = "block"
    popupInput.style.display = "block"
}

// --------------------------

