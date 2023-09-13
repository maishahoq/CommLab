// JavaScript to toggle the dropdown menu on click
document
  .getElementById("categories-button")
  .addEventListener("click", function () {
    var dropdownContent = document.querySelector(".dropdown-content");
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });

// Close the dropdown if the user clicks outside of it
window.addEventListener("click", function (event) {
  var dropdown = document.querySelector(".dropdown");
  if (event.target !== dropdown && !dropdown.contains(event.target)) {
    var dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display = "none";
  }
});
