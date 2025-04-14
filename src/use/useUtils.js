export default function useTextUtils() {
  function capitalize(text) {
    if (text.length > 0) {
      let formattedText = "";
      for (let idx in text) {
        idx == 0
          ? (formattedText += text[idx].toUpperCase())
          : (formattedText += text[idx]);
      }
      return formattedText;
    }
    return text;
  }
  return { capitalize };
}
