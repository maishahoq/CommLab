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

//JavaScript for Categories section

// JavaScript for horizontal video carousel
// document.querySelectorAll(".category").forEach(function (category) {
//   const videoCarousel = category.querySelector(".video-carousel");
//   const videoItems = videoCarousel.querySelectorAll(".video-item");
//   let scrollPosition = 0;
//   const itemWidth = videoItems[0].offsetWidth;

//   /*// Show or hide carousel buttons based on scroll position
//     function toggleCarouselButtons() {
//         const leftButton = category.querySelector(".carousel-button.left");
//         const rightButton = category.querySelector(".carousel-button.right");

//         leftButton.style.display = scrollPosition > 0 ? "block" : "none";
//         rightButton.style.display = scrollPosition < videoItems.length - 1 ? "block" : "none";
//     }*/

//   // Handle left arrow button click
//   category
//     .querySelector(".carousel-button.left")
//     .addEventListener("click", function () {
//       if (scrollPosition > 0) {
//         scrollPosition--;
//         videoCarousel.scrollTo({
//           left: scrollPosition * itemWidth,
//           behavior: "smooth",
//         });
//         toggleCarouselButtons();
//       }
//     });

//   // Handle right arrow button click
//   category
//     .querySelector(".carousel-button.right")
//     .addEventListener("click", function () {
//       if (scrollPosition < videoItems.length - 1) {
//         scrollPosition++;
//         videoCarousel.scrollTo({
//           left: scrollPosition * itemWidth,
//           behavior: "smooth",
//         });
//         toggleCarouselButtons();
//       }
//     });

//   // Initialize button visibility
//   toggleCarouselButtons();
// });

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
