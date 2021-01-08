
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
    }
]
   
const difficultyButtons = document.querySelectorAll(".diff-buttons")
const gameBox = document.querySelector(".game-box")

let difficulty
let numberOfTilesToDraw
let randomNumber
let randomIndecesArray = []
let tilesDrawn = []


// Difficulty selection:
difficultyButtons.forEach(difficultyButton => difficultyButton.addEventListener("click", (e) => {
    difficulty = e.target.id
    console.log(difficulty)
    assignDifficulty()
}))

function assignDifficulty() {
    if (difficulty === "diff-easy") {
        numberOfTilesToDraw = 6
    } else if (difficulty === "diff-med") {
        numberOfTilesToDraw = 12
    } else if (difficulty === "diff-hard") {
        numberOfTilesToDraw = 18
    }
    return numberOfTilesToDraw
}

// // Generate Tiles:

// Generate an array with random indeces from the tiles array:
function getRandomIndecesArray() {
    let randomIndex

    function getRandomTilesIndex() {
        randomIndex = Math.floor(Math.random() * tiles.length)
        return randomIndex
    }
    
    for (let i = 0; i < numberOfTilesToDraw; i++) {
        getRandomTilesIndex()

        // check if numbers in randomIndecesArray repeat and if so replace them
        while (randomIndecesArray.indexOf(randomIndex) !== -1 ) {
            getRandomTilesIndex()
        }
        randomIndecesArray.push(randomIndex)
    }
    console.log(`Original array: ${randomIndecesArray}`)
    return randomIndecesArray
}

// clear randomIndecesArray       // unnecessary ??
function clearRandomIndecesArray() {
    randomIndecesArray = []
}

// --------------------------------------------------------------------------------------

// transform random indices into an array with corresponding tiles:
function updateTilesDrawn() {

    tiles.forEach( tile => {
        for (i = 0; i < randomIndecesArray.length; i++ ) {
            if (tile.id === randomIndecesArray[i]) {
                tilesDrawn.push(tile)
            }
        }
    })

    return tilesDrawn
}

// duplicate the values in the tiles array
function duplicateTiles() {

    for (let i = 0; i < numberOfTilesToDraw; i++ ) {
        tilesDrawn.push(tilesDrawn[i])
    }
}

// randomize the order of tiles:
function randomizeTiles() {
    tilesDrawn.sort(() => Math.random() - 0.5)
}

// draw tiles:
function drawTiles() {
    
    updateTilesDrawn()
    duplicateTiles()
    randomizeTiles()

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

        newTile.addEventListener("click", () => {
            flipCard.classList.toggle("is-flipped")
        })
    }
}