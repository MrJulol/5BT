const map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const issIcon = L.icon({
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const issMarker = L.marker([0, 0], { icon: issIcon }).addTo(map);

async function getISSPosition() {
  const response = await fetch(
    "https://api.wheretheiss.at/v1/satellites/25544"
  );
  const data = await response.json();
  return [data.latitude, data.longitude];
}

async function updateISSPosition() {
  const position = await getISSPosition();
  issMarker.setLatLng(position);
  map.setView(position, map.getZoom());
}

setInterval(updateISSPosition, 1000);
