export const scrollToBottom = () => {
  setTimeout(() => {
    const elm = document.getElementById("scrollArea")
    if (elm) {
      elm.scrollTo({
        top: elm.scrollHeight + 1000,
        behavior: "smooth",
      });
    }
  }, 100);
}