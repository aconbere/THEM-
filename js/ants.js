var range = function (start, end) {
  if (arguments.length == 1) {
    end = start, start = 0
  }

  array = []
  for (var i = start; i < end; i++) {
    array.push(i)
  }

  return array
}

var UNIT_DIMENSION = 40;

var ANT_COUNT = 20

var DIRECTIONS = { north     : { x: 0,  y:  1}
                 , northeast : { x: 1,  y:  1}
                 , east      : { x: 1,  y:  0}
                 , southeast : { x: 1,  y: -1}
                 , south     : { x: 0,  y: -1}
                 , southwest : { x: -1, y: -1}
                 , west      : { x: -1, y:  0}
                 , northwest : { x: -1, y:  1}
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
  // take the position of the ant
  // take the direction of that ant
  // look in the square to the left of where it's facing
  // look in the square to the right of where it's facing
  // look in the square in the direction it's facing
  //
  // in each of these cases see if there is food / pheremone / home and if there's an ant there
  //
  // if there's an ant in that location dismiss it
  // if there's food +1 to the weight
  // if there's pheremone +1 to the weight

  
}

var randomInt = function (max) {
  return Math.floor(Math.random() * max)
}

var randomDirection = function () {
  directions = Object.keys(DIRECTIONS)
  return DIRECTIONS[directions[randomInt(directions.length)]]
}


var createContext = function (id) {
  canvas = document.getElementById(id)

  return { drawable: canvas.getContext('2d')
         , width: canvas.width
         , height: canvas.height
         }
}

var createAnt = function(loc) {
  return { loc: loc
         , direction: randomDirection()
         }
}

var drawAnt = function (context, ant, unitSize) {
  context.fillStyle = "333"
  context.fillRect(ant.loc.x * unitSize, ant.loc.y * unitSize, unitSize, unitSize)
}

var bounded = function (i, by) {
  if (i < 0) {
    return (by + i) % by
  } else {
    return i % by
  }

}

var moveAnt = function (ant) {
  loc = { x: bounded(ant.loc.x + ant.direction.x, UNIT_DIMENSION)
        , y: bounded(ant.loc.y + ant.direction.y, UNIT_DIMENSION)
        }
  return createAnt(loc)
}

var createWorld = function (ants) {
  return { ants: ants || [] }
}

var drawWorld = function (canvas, context, world) {
  var unitSize = canvas.width / UNIT_DIMENSION

  context.clearRect(0,0, canvas.width, canvas.height)
  world.ants.forEach(function (ant) {
    drawAnt(context, ant, unitSize)
  })
}

var updateWorld = function (world) {
  world.ants = world.ants.map(function (ant) {
    return moveAnt(ant)
  })
  console.log(world)
}

var locationInArray = function (array, loc) {
  return array.map(function (el) {
    return (el.x == loc.x && el.y == loc.y)
  }).reduce(function (acc, i) {
    return acc || i
  }, false)
}

var generateLocation = function (locations, maxX, maxY) {
  var loc = { x: randomInt(maxX)
            , y: randomInt(maxY)
            }

  if (!locationInArray(locations, loc)) {
    return loc
  } else {
    return null
  }
}

var generateRandomLocations = function (total, maxX, maxY) {
  var locs = range(total).reduce(function (locations, i) {
    var loc
    while (!loc) {
      loc = generateLocation(locations, maxX, maxY)
    }
    //var loc = generateLocation(locations, maxX, maxY)
    //console.log(loc)

    locations.push(loc)
    return locations
  }, [])

  return locs
}

var createSim = function () {
  canvas = document.getElementById("simulation-visualization")
  context = canvas.getContext('2d')

  ants = generateRandomLocations(ANT_COUNT, UNIT_DIMENSION, UNIT_DIMENSION).map(function (loc) {
    return createAnt(loc)
  })
  var world = createWorld(ants)

  // sim the world
  setInterval(function () {
    updateWorld(world)
  }, 100)

  setInterval(function () {
    drawWorld(canvas, context, world)
  }, 100)
}

//createSim()
