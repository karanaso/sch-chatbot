export const scrollToBottom = () => {
  setTimeout(() => {
    document.getElementById("scrollArea")?.scrollTo({
      top: document.getElementById("scrollArea")?.scrollHeight + 1000,
      behavior: "smooth",
    });
  }, 100);
}