"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".time-frame__btn");
  const activities = document.querySelectorAll(
    ".time-tracking-dashboard__activity"
  );

  let data = [];

  // Fetch data from the JSON file
  fetch("data.json")
    .then((res) => res.json())
    .then((json) => {
      data = json;
      updateUI("weekly"); // default view
    });

  // Add event listeners to time frame buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const period = button.dataset.period;

      // Toggle active state
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      updateUI(period);
    });
  });

  // Function to update the dashboard
  function updateUI(period) {
    activities.forEach((activity) => {
      const type = activity.dataset.activity;
      const activityData = data.find(
        (item) => item.title.toLowerCase() === type
      );

      if (activityData) {
        const current = activityData.timeframes[period].current;
        const previous = activityData.timeframes[period].previous;

        activity.querySelector(
          ".time-tracking-dashboard__this-week-data"
        ).textContent = `${current}hrs`;
        activity.querySelector(
          ".time-tracking-dashboard__last-week-data"
        ).textContent = `Last ${getPeriodLabel(period)} - ${previous}hrs`;
      }
    });
  }

  // Helper to return correct period label
  function getPeriodLabel(period) {
    switch (period) {
      case "daily":
        return "Day";
      case "weekly":
        return "Week";
      case "monthly":
        return "Month";
    }
  }
});
