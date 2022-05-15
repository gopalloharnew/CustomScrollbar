const scrollingCardWraper = document.querySelector(".scrolling-card-wraper");
const customScrollbarTrack = document.querySelector(".custom-scrollbar-track");
const customScrollbarHandle = document.querySelector(
  ".custom-scrollbar-handle"
);

customScrollbarHandle.style.height =
  (scrollingCardWraper.offsetHeight * 100) / scrollingCardWraper.scrollHeight +
  "%";

scrollingCardWraper.addEventListener("scroll", () => {
  customScrollbarHandle.style.transform = `translateY(${
    (scrollingCardWraper.scrollTop * customScrollbarTrack.offsetHeight) /
      scrollingCardWraper.scrollHeight +
    "px"
  })`;
});

// Listen to Handle
let isHandleDown = false;
let handleDownY = 0;
let customScrollbarTrackRect = customScrollbarTrack.getBoundingClientRect();
let scrollingCardWrapMaxScrollable =
  scrollingCardWraper.scrollHeight - scrollingCardWraper.offsetHeight;

const setScrollTop = (e) => {
  scrollingCardWraper.scrollTop =
    scrollingCardWrapMaxScrollable *
    ((e.y - customScrollbarTrackRect.y - handleDownY) /
      (customScrollbarTrack.offsetHeight - customScrollbarHandle.offsetHeight));
};

const handleMove = (e) => {
  if (e.y < customScrollbarTrackRect.y) {
    scrollingCardWraper.scrollTop = 0;
  } else if (
    e.y >
    customScrollbarTrackRect.y + customScrollbarTrack.offsetHeight
  ) {
    scrollingCardWraper.scrollTop = scrollingCardWrapMaxScrollable;
  } else {
    setScrollTop(e);
  }
};

const handleDown = (e) => {
  isHandleDown = true;
  window.addEventListener("mouseup", handleUp);
  window.addEventListener("mousemove", handleMove);
  handleDownY = e.layerY;
};

const handleUp = (e) => {
  isHandleDown = false;
  window.removeEventListener("mousemove", handleMove);
  window.removeEventListener("mouseup", handleUp);
};

customScrollbarHandle.addEventListener("mousedown", handleDown);

window.addEventListener("resize", () => {
  customScrollbarTrackRect = customScrollbarTrack.getBoundingClientRect();
  scrollingCardWrapMaxScrollable =
    scrollingCardWraper.scrollHeight - scrollingCardWraper.offsetHeight;
});
