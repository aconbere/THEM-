var createContext = function (id) {
  canvas = document.getElementById(id)

  return { drawable: canvas.getContext('2d')
         , width: canvas.width
         , height: canvas.height
         }
}

var createAnt = function(x,y) {
  return { x: x, y: y }
}

var drawAnt = function (context, ant, unitSize) {
  context.fillStyle = "333"
  context.fillRect(ant.x * unitSize, ant.y * unitSize, unitSize, unitSize)
}

var moveAnt = function (ant, x, y) {
  return createAnt((ant.x + x) % unitDimension, (ant.y + y) % unitDimension)
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

createSim = function () {
  canvas = document.getElementById("simulation-visualization")
  context = canvas.getContext('2d')

  var world = createWorld([createAnt(1,1)])

  // sim the world
  setInterval(function () {
    world.ants = world.ants.map(function (ant) {
      return moveAnt(ant, 1, 0)
    })
    console.log(world)
  }, 100)

  setInterval(function () {
    drawWorld(canvas, context, world)
  }, 100)
}

createSim()
