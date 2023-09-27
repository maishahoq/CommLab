const searchInput = document.querySelector("[data-search]");

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

//Search bar
function searchWebpage() {
  let input = document.getElementById("searchbar").value.toLowerCase();
  let contentElements = document.querySelectorAll(".content");

  contentElements.forEach((element) => {
    let contentText = element.textContent.toLowerCase();
    let dataTitle = element.getAttribute("data-title");

    if (
      contentText.includes(input) ||
      (dataTitle && dataTitle.toLowerCase().includes(input))
    ) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });

  // Search for images with matching alt attributes
  let images = document.querySelectorAll("img[alt]");
  images.forEach((image) => {
    if (image.alt.toLowerCase().includes(input)) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  });

  // Search for videos with matching titles
  let videos = document.querySelectorAll("iframe[data-title]");
  videos.forEach((video) => {
    let videoTitle = video.getAttribute("data-title");
    if (videoTitle.toLowerCase().includes(input)) {
      video.style.display = "block";
    } else {
      video.style.display = "none";
    }
  });
}

/*phtoto carousal feature inspired from the following website: https: //www.codingnepalweb.com/responsive-image-slider-html-css-javascript/*/

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
