import { ref } from "vue";

export default function useSidebar() {
  const linksCarouselSettings = ref(null);

  function toggleLinksCarousel(number) {
    let tempArray = linksCarouselSettings.value;
    tempArray[number] = !tempArray[number];
    linksCarouselSettings.value = tempArray;
    localStorage.setItem(
      "linksCarouselSettings",
      JSON.stringify(linksCarouselSettings.value)
    );
  }

  function beforeMount(role) {
    const settings = localStorage.getItem("linksCarouselSettings");
    if (!settings) {
      let initValues = [];
      switch (role) {
        case "root":
          initValues = [true, true];
      }
      localStorage.setItem("linksCarouselSettings", JSON.stringify(initValues));
      linksCarouselSettings.value = initValues;
    } else {
      linksCarouselSettings.value = JSON.parse(settings);
    }
  }

  return { linksCarouselSettings, toggleLinksCarousel, beforeMount };
}
