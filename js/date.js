export function initDate() {
  const headerDate = document.querySelector("#header-date");
  const footerYear = document.querySelector("#footer-year");
  const h1 = document.querySelector("h1");

  // Setting header text to match the hour
  let phaseOfDay;
  let hour = new Date().getHours();
  if (hour >= 5 && hour < 12) phaseOfDay = "morning";
  else if (hour >= 12 && hour < 17) phaseOfDay = "afternoon";
  else if (hour >= 17 && hour < 21) phaseOfDay = "evening";
  else phaseOfDay = "night";
  h1.textContent = `Good ${phaseOfDay}`;

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

  updateDate();
  setInterval(updateDate, 1000);
}
