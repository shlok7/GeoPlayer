const locations = [
  {name: "Paris", coords: [2.3522,48.8566]},
  {name: "New York", coords: [-74.0060, 40.7143]},
  {name: "Sydney", coords: [151.2093, -33.8688]},
  {name: "London", coords: [0.1278, 51.5074]},
  {name: "Tokyo", coords: [139.6917, 35.6895]},
  {name: "Delhi", coords: [77.0697, 28.6790]}
];

let currentLOCATION;
let map;
let pinpoint;
let attempts = 3;
let score = 0;

function initMap() {
  currentLOCATION = locations[Math.floor(Math.random() * locations.length)];

  map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(currentLOCATION.coords),
      zoom: 15
    })
  });

  pinpoint = new ol.Overlay({
    position: ol.proj.fromLonLat(currentLOCATION.coords),
    positioning: "center-center",
    element: document.getElementById("pinpoint"),
    stopEvent: false
  });
  map.addOverlay(pinpoint);

  document.getElementById("coordinates").innerHTML = `Longitude: ${currentLOCATION.coords[0]}, Latitude: ${currentLOCATION.coords[1]}`;
}

function checkGuess() {
  const guess = document.getElementById("guess").value;

  if (guess.toLowerCase() === currentLOCATION.name.toLowerCase()) {
    document.getElementById("result").innerHTML = "Correct!";
    document.getElementById("result").className = "correct";
    score = score + 1;
  } 
  else {
    attempts--;
    document.getElementById("result").innerHTML = "Incorrect!";
    document.getElementById("result").className = "incorrect";
  }

  document.getElementById("score").innerHTML = `Score: ${score}`;

  if (attempts === 0) {
    alert("Game Over! Your final score is " + score);
    resetGame();
  } 
  else {
    document.getElementById("guess").value = "";
    chooseLocation();
  }
}

function chooseLocation() {
  currentLOCATION = locations[Math.floor(Math.random() * locations.length)];
  map.getView().setCenter(ol.proj.fromLonLat(currentLOCATION.coords));
  pinpoint.setPosition(ol.proj.fromLonLat(currentLOCATION.coords));
  document.getElementById("coordinates").innerHTML = `Longitude: ${currentLOCATION.coords[0]}, Latitude: ${currentLOCATION.coords[1]}`;
}

function resetGame() {
  attempts = 3;
  score = 0;

  map.getView().setZoom(10);
  chooseLocation();

  document.getElementById("result").innerHTML = "";
  document.getElementById("result").className = "";
  document.getElementById("guess").value = "";
  document.getElementById("score").innerHTML = `Score: ${score}`;
}

initMap();

