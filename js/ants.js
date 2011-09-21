var DIRECTIONS = { north     : [0,   1]
                 , northeast : [1,   1]
                 , east      : [1,   0]
                 , southeast : [1,  -1]
                 , south     : [0,  -1]
                 , southwest : [-1, -1]
                 , west      : [-1,  0]
                 , northwest : [-1,  1]
                 }

// array is a list of choices
// mapper is a function for an element in array to a weight
//
// weightedChoice([[7, 1], [4, 2], [6, 0]], function (choice) {
//   return choice[1]
// })
var weightedChoice = function (array, mapper) {
  var weightedArray = array.map(mapper)

  var total = weightedArray.reduce(function (acc, el) {
    return acc + el
  }, 0)

  var chosenSlice = randomInt(total)

  var sum = 0
  for (var i = 0; i < weightedArray.length; i++) {
    if (chosenSlice < (weightedArray[i] + sum)) {
      return array[i]
    }
    (sum += weightedArray[i])
  }
}

var antMovementChoices = function (ant, world) {

}

var randomInt = function (max) {
  return Math.floor(Math.random() * max)
}

var randomDirection = function () {
  directions = Object.keys(DIRECTIONS)
  return DIRECTIONS[randomInt(directions.length)]
}


var createContext = function (id) {
  canvas = document.getElementById(id)

  return { drawable: canvas.getContext('2d')
         , width: canvas.width
         , height: canvas.height
         }
}

var createAnt = function(x,y) {
  return { loc: { x: x
                , y: y
                }
         , direction: randomDirection()
         }
}

var drawAnt = function (context, ant, unitSize) {
  context.fillStyle = "333"
  context.fillRect(ant.loc.x * unitSize, ant.loc.y * unitSize, unitSize, unitSize)
}

var moveAnt = function (ant, x, y) {
  return createAnt((ant.loc.x + x) % unitDimension, (ant.loc.y + y) % unitDimension)
}

var createWorld = function (ants) {
  return { ants: ants || [] }
}

var unitDimension = 40;

var drawWorld = function (canvas, context, world) {
  var unitSize = canvas.width / unitDimension

  context.clearRect(0,0, canvas.width, canvas.height)
  world.ants.forEach(function (ant) {
    drawAnt(context, ant, unitSize)
  })
}

var updateWorld = function (world) {
  world.ants = world.ants.map(function (ant) {
    return moveAnt(ant, 1, 1)
  })
  console.log(world)
}

createSim = function () {
  canvas = document.getElementById("simulation-visualization")
  context = canvas.getContext('2d')

  var world = createWorld([createAnt(1,1)])

  // sim the world
  setInterval(function () {
    updateWorld(world)
  }, 100)

  setInterval(function () {
    drawWorld(canvas, context, world)
  }, 100)
}

createSim()
