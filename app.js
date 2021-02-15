"use strict"
// ISSUES TO RESOLVE:
// 2. prevent clicking on the same tile twice messing up      
// ==> if (cardChoicesIDs[0] !== cardID) ?? not this exactly, but getting closer

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
    }
]
   
const difficultyButtons = document.querySelectorAll(".diff-buttons")
const startButton = document.querySelector(".game-start-button")
const gameBox = document.querySelector(".game-box")
const displayTime = document.querySelector(".time-display")

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
}))

// Difficulty info:
difficultyButtons.forEach(difficultyButton => difficultyButton.addEventListener("mouseover", (e) => {
    // add later
}))

function assignDifficulty() {
    if (difficulty === "diff-easy") {
        numberOfTilesToDraw = 10
        time = 59900
    } else if (difficulty === "diff-med") {
        numberOfTilesToDraw = 15
        time = 119900
    } else if (difficulty === "diff-hard") {
        numberOfTilesToDraw = 20
        time = 179900
    }
}

// Game Start:
startButton.addEventListener("click", gameStart)

function gameStart() {

    if (!gameInProgress && difficulty) {
        assignDifficulty()
        getRandomIndecesArray()
        drawTiles()
        gameInProgressFunc() 
    } else if (gameInProgress) {
        gameLost()
    }
}

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
    if (cardsPaired.length === numberOfTilesToDraw) {
        clearInterval(timer)
        gameFinished()
    } else if (time === 0) {
        clearInterval(timer)
        gameLost()
    }
}

function endGame() {
    resetStats()
    gameBox.innerHTML = ""
    gameInProgress = false
    difficultyButtons.forEach( button => {
        button.disabled = false
    })
    startButton.innerText = "Start Game"
}

function gameFinished() {
    endGame()
    window.alert("Congratulations, you won!")  // add a popup
}

function gameLost() {
    endGame()
    window.alert("Better luck next time")  // add a popup

    clearInterval(timer)
    displayTime.innerHTML = "Time Remaining: "
}

function resetStats() {
    time = null
    numberOfTilesToDraw = null
    cardsPaired = []
    randomIndecesArray = []
    tilesDrawn = []
}

// // Generate Tiles:
// Generate an array with random indeces from the tiles array:
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

// clear randomIndecesArray       // remove later ??
function clearRandomIndecesArray() {
    randomIndecesArray = []
}

// transform random indices into an array with corresponding tiles:
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
    for (let i = 0; i < numberOfTilesToDraw; i++ ) { // simplify this section
        tilesDrawn.push(tilesDrawn[i])
    }
    tilesDrawn.sort(() => Math.random() - 0.5)    
}

// draw tiles:
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
