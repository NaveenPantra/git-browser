const monthsMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const DAY_MAP = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

function getPast12MonthsDates() {
  let currentDate = new Date();
  currentDate.setDate(1);
  const days = [];
  for (let i = 12; i > 0; i--) {
    days.push(getMonthsDates(currentDate));
    currentDate.setMonth(currentDate.getMonth() - 1);
  }
  return days.reverse();
}

function getMonthsDates(date = new Date()) {
  date.setDate(1);
  const currentMonth = date.getMonth();
  const monthData = {
    month: monthsMap[currentMonth],
    year: date.getFullYear(),
  };
  const days = [];
  for (let i = 0; i < date.getDay(); i++) {
    days.push({ type: "dummy-day" });
  }
  let nextDate = date;
  while (true) {
    if (nextDate.getMonth() !== currentMonth) break;
    const monthName = monthsMap[nextDate.getMonth()];
    const month = (nextDate.getMonth() + 1).toString().padStart(2, "0");
    const fullYear = nextDate.getFullYear();
    const day = nextDate.getDate().toString().padStart(2, "0");
    days.push({
      type: "day",
      strDate: `${fullYear}-${month}-${day}`,
      title: `${monthName} ${day}, ${fullYear}`,
    });
    nextDate = new Date(nextDate.getTime() + 86400000);
  }
  monthData.days = days;
  return monthData;
}

export { getPast12MonthsDates };
