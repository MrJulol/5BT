function showAlert() {
  alert("Yip Yip");
}
function openWiki() {
  window.open("https://en.wikipedia.org/wiki/Fennec_fox", "_blank");
}
function displayDateTime() {
  const now = new Date();
  const formattedDateTime = now.toLocaleString();
  document.getElementById("time").innerText = formattedDateTime;
}
document.addEventListener("DOMContentLoaded", function () {
  displayDateTime();
  setInterval(displayDateTime, 1000);
});
