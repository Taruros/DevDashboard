export function initDate() {
  const headerDate = document.querySelector("#header-date");
  const footerYear = document.querySelector("#footer-year");

  function updateDate() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hourCycle: "h24",
    };

    headerDate.textContent = new Date().toLocaleString("en-US", options);
    footerYear.textContent = new Date().getFullYear();
  }

  console.log(new Date().getHours());

  updateDate();
  setInterval(updateDate, 1000);
}
