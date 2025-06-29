export const formatNumber = (num: number) => {
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateScales = (swiper: any) => {
  swiper.slides.forEach((slide: HTMLElement, index: number) => {
    const distance =
      Math.abs(index - swiper.activeIndex) % swiper.slides.length;

    slide.style.transition = "transform 0.1s";
    slide.style.transform = "scale(1)";

    if (distance === 0) {
      slide.style.transform = "scale(1.3)";
    } else if (distance === 1 || distance === swiper.slides.length - 1) {
      slide.style.transform = "scale(1.1)";
    } else if (distance === 2 || distance === swiper.slides.length - 2) {
      slide.style.transform = "scale(0.95)";
    } else {
      slide.style.transform = "scale(0.85)";
    }
  });
};
