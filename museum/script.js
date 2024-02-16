// const formButton = document.querySelector('.form__submit-button');
const buyNowButton = document.querySelector("#buy-now");
const bookingForm = document.querySelector(".booking");
const close = document.querySelector(".close");
const burgerMenu = document.querySelector(".header__burger");
const navMenuList = document.querySelector(".nav__menu-list");
const collageImages = document.querySelectorAll(".collage__img");
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const form = document.querySelector(".book__form");
const fraction = document.querySelector(".swiper-pagination-fr"); //TODO  find more good decision 

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const checkSlide = (e) => {
  collageImages.forEach((galleryImage) => {
    const slideInAt =
      window.scrollY + window.innerHeight - galleryImage.height / 2;

    const imageBottom = galleryImage.offsetTop + galleryImage.height;
    const isHalfShown = slideInAt > galleryImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      galleryImage.classList.add("active");
    } else {
      galleryImage.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", debounce(checkSlide));

buyNowButton.addEventListener("click", () => {
  bookingForm.style.display = "block";
});

close.addEventListener("click", () => {
  bookingForm.style.display = "none";
});

const toggleMenu = () => {
  burgerMenu.classList.toggle("active");
  navMenuList.classList.toggle("active");
};

burgerMenu.addEventListener("click", toggleMenu);

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "bullets",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  grabCursor: true,

  keyboard: {
    enable: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  effect: "slide",

  breakpoints: {
    420: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1,
    },
  },
});

fraction.classList.remove('swiper-pagination-lock');//TODO better decision

// const videoSwiper = new Swiper(".video-swiper", {
//   direction: "horizontal",
//   // loop: true,

//   pagination: {
//     el: ".swiper-pagination",
//       clickable: true,
//     type: "bullets",
//     type: "fraction",
//       dynamicBullets: true,
//   },

//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   slidesPerView: 3,

//   // grabCursor: true,

//   keyboard: {
//     enable: true,
//     onlyInViewport: true,
//     pageUpDown: true,
//   },

//   // thumbs: {
//   //   swiper: {
//   //     el: 'image-mini-slider',
//   //     slidesPerView: 3
//   //   }
//   // },
//   pagination: {
//     el: ".swiper-pagination",
//     //   clickable: true,
//     type: "bullets",
//     type: "fraction",
//     //   dynamicBullets: true,
//   },

//   loopedSlides: 5,

//   effect: "slide",
// });

function initComparisons() {
  var x, i;
  /*find all elements with an "overlay" class:*/
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /*once for each "overlay" element:
          pass the "overlay" element as a parameter when executing the compareImages function:*/
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider,
      img,
      clicked = 0,
      w,
      h;
    /*get the width and height of the img element*/
    w = img.offsetWidth;
    h = img.offsetHeight;
    /*set the width of the img element to 50%:*/
    img.style.width = w / 2 + "px";
    /*create slider:*/
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /*insert slider*/
    img.parentElement.insertBefore(slider, img);
    /*position the slider in the middle:*/
    slider.style.top = h / 2 - slider.offsetHeight / 2 + "px";
    slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      pos = getCursorPos(e);
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }
    function getCursorPos(e) {
      var a,
        x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px";
    }
  }
}

initComparisons();

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGVuY2h5OTIiLCJhIjoiY2t1anB3MWMxMTA2NTJ4bjZvb29vOG04eiJ9.OQHTzFw2qXGiUzOUAda3AA";
mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v8",
  center: [2.3376, 48.8613],
  zoom: 15.6,
});

///player-vedeo-section

async function formSend(e) {
  e.preventDefault();

  let error = formValidate(form);
}

function formValidate(form) {
  let error = 0;
  let formReq = document.querySelector("._req");

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index];
    formRemoveError(input);

    if (input.classList.contains("email")) {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
  }
}

function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function formAddError(input) {
  input.parentElement.classList.add("_error");
  input.classList.add("_error");
}

function formRemoveError(input) {
  input.parentElement.classList.remove("_error");
  input.classList.remove("_error");
}

form.addEventListener("submit", formSend);

const togglePlay = () => {
  const method = video.paused ? "play" : "pause";
  video[method]();
};

function updateVideoButton() {
  const icon = this.paused ? "▷" : "▯ ▯";
  toggle.textContent = icon;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleprogress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateVideoButton);
video.addEventListener("pause", updateVideoButton);
video.addEventListener("timeupdate", handleprogress);
toggle.addEventListener("click", togglePlay);

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
