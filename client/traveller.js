(function () {
  'use strict';
  var iPoint,
    x,
    y,
    board = document.getElementById("board"),
    boardContext = board.getContext("2d"),
    boardLeft = board.offsetLeft,
    boardTop = board.offsetTop,
    boardWidth = board.width,
    boardHeight = board.height,
    startPoint = {x : boardWidth / 2, y : boardHeight / 2},
    points = [],
    way = [startPoint],
    distance = 0,
    startTime,
    duration;

  boardContext.fillStyle = "#000000";

  boardContext.fillRect(399, 299, 3, 3);

  function viewAddPoint(point) {
    boardContext.lineTo(point.x, point.y);
    boardContext.stroke();
    document.getElementById("distance").innerHTML = distance;
    document.getElementById("time").innerHTML = duration;
  }
  
  function addPoint(point) {
    var lastPoint = way[way.length - 1],
      dx = point.x - lastPoint.x,
      dy = point.y - lastPoint.y,
      squareDist = dx * dx + dy * dy;
    way.push(point);
    distance += Math.sqrt(squareDist);
    duration = new Date().getTime() - startTime;
    viewAddPoint(point);
  }
  
  board.addEventListener('click', function (event) {
    x = event.pageX - boardLeft;
    y = event.pageY - boardTop;
    points.forEach(function (point) {
      if (y > point.y - 10 && y < point.y + 10 && x > point.x - 10 && x < point.x + 10) {
        addPoint(point);
      }
    });
  }, false);


  for (iPoint = 0; iPoint < 10; iPoint = iPoint + 1) {
    x = Math.floor(Math.random() * board.width);
    y = Math.floor(Math.random() * board.height);
    points.push({x : x, y : y});
    boardContext.fillRect(x - 1, y - 1, 3, 3);
  }
  boardContext.moveTo(startPoint.x, startPoint.y);
  startTime = new Date().getTime();
  
}());
