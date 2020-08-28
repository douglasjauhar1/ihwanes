/*
 * RANGE DATE
 * by Sam1Dz { Pratama Dimas } @Nashta
 *
 **/

export const RangeDate = () => {
  const dateLibs = new Date();
  const monthList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const month = dateLibs.getMonth();
  const year = dateLibs.getFullYear();
  let result = [];

  const leapYear = (year) => {
    if (Number(year) % 4 === 0) {
      if (Number(year) % 100 === 0) {
        if (Number(year) % 400 === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const isLeapYear = leapYear(year);

  if (month === 1) {
    if (isLeapYear === true) {
      result.push(`${year}-${monthList[Number(month)]}-01`);
      result.push(`${year}-${monthList[Number(month)]}-29`);
    } else {
      result.push(`${year}-${monthList[Number(month)]}-01`);
      result.push(`${year}-${monthList[Number(month)]}-28`);
    }
  } else {
    if (
      month === 0 ||
      month === 2 ||
      month === 4 ||
      month === 6 ||
      month === 7 ||
      month === 9 ||
      month === 11
    ) {
      result.push(`${year}-${monthList[Number(month)]}-01`);
      result.push(`${year}-${monthList[Number(month)]}-31`);
    } else {
      result.push(`${year}-${monthList[Number(month)]}-01`);
      result.push(`${year}-${monthList[Number(month)]}-30`);
    }
  }

  return result;
};

/**
 * @author Pratama "Sam1Dz" Dimas
 * @param {string} startDate Tanggal Awal
 * @param {string} endDate Tanggal Akhir
 * @returns {string[]} Return Data berisi Range Tanggal berdasarkan Range yang dipilih user
 */

export const ArrayDate = (startDate, endDate) => {
  /* CONFIG VARIABLE */
  const startDateSplit = startDate.split("-");
  const endDateSplit = endDate.split("-");

  const startYear = Number(startDateSplit[0]);
  const endYear = Number(endDateSplit[0]);
  const startMonth = Number(startDateSplit[1]) - 1;
  const endMonth = Number(endDateSplit[1]) - 1;
  const startDay = Number(startDateSplit[2]);
  const endDay = Number(endDateSplit[2]);

  /* MAIN VARIABLE */
  let rangeMonthInAYear = [];
  let monthRange = [];
  let dateBar = [];

  // console.log("[debug] ArrayDate @startDateSplit", startDateSplit);
  // console.log("[debug] ArrayDate @endDateSplit", endDateSplit);

  // console.log("[debug] startMonth?", startMonth);
  // console.log("[debug] endMonth?", endMonth);

  // console.log("[debug] rangeMonthInAYear?", rangeMonthInAYear);
  // console.log("[debug] monthRange?", monthRange);

  /* CHECK IF IS LEAP YEAR */
  const leapYear = (year) => {
    if (Number(year) % 4 === 0) {
      if (Number(year) % 100 === 0) {
        if (Number(year) % 400 === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const generateDateBar = (dateStart, dateEnd, month, year) => {
    for (let i = dateStart; i <= dateEnd; i++) {
      const dateVar = `${i < 10 ? `0${i}` : i}-${
        month < 10 ? `0${month}` : month
      }-${year}`;
      dateBar.push(dateVar);
    }
  };

  /** [DONT TOUCH!! START FROM BELLOW THIS LINE] **/

  /* COMPLICATED LOGIC */
  // GENERATE DATE BAR
  if (startMonth === endMonth && startYear === endYear) {
    generateDateBar(startDay, endDay, startMonth + 1, startYear);
  } else {
    // Generate rangeMonthInAYear
    if (startYear === endYear) {
      rangeMonthInAYear.push(endMonth - startMonth);
    } else {
      for (let i = startYear; i <= endYear; i++) {
        if (startYear === i) {
          rangeMonthInAYear.push(11 - startMonth);
        } else if (endYear === i) {
          rangeMonthInAYear.push(0 + endMonth);
        } else {
          rangeMonthInAYear.push(11);
        }
      }
    }

    // Generate monthRange
    for (let i = 0; i < rangeMonthInAYear.length; i++) {
      for (let j = 0; j <= rangeMonthInAYear[i]; j++) {
        if (rangeMonthInAYear.length !== 1) {
          if (i === rangeMonthInAYear.length - 1) {
            monthRange.push(0 + j);
          } else {
            monthRange.push(11 - rangeMonthInAYear[i] + j);
          }
        } else {
          monthRange.push(startMonth + j);
        }
      }
    }

    // Generate Date
    let yearGenerateDate = startYear;
    for (let i = 0; i < monthRange.length; i++) {
      const firstDate = i === 0 ? startDay : 1;
      let lastDate = 31;

      if (monthRange[i] === 0) yearGenerateDate++;

      if (monthRange[i] === 1) {
        if (leapYear(yearGenerateDate)) {
          lastDate = i === monthRange.length - 1 ? endDay : 29;
          generateDateBar(
            firstDate,
            lastDate,
            monthRange[i] + 1,
            yearGenerateDate
          );
        } else {
          lastDate = i === monthRange.length - 1 ? endDay : 28;
          generateDateBar(
            firstDate,
            lastDate,
            monthRange[i] + 1,
            yearGenerateDate
          );
        }
      } else {
        if (
          monthRange[i] === 0 ||
          monthRange[i] === 2 ||
          monthRange[i] === 4 ||
          monthRange[i] === 6 ||
          monthRange[i] === 7 ||
          monthRange[i] === 9 ||
          monthRange[i] === 11
        ) {
          lastDate = i === monthRange.length - 1 ? endDay : 31;
          generateDateBar(
            firstDate,
            lastDate,
            monthRange[i] + 1,
            yearGenerateDate
          );
        } else {
          lastDate = i === monthRange.length - 1 ? endDay : 30;
          generateDateBar(
            firstDate,
            lastDate,
            monthRange[i] + 1,
            yearGenerateDate
          );
        }
      }
    }
  }

  // console.log(rangeMonthInAYear);
  // console.log(monthRange)

  return dateBar;
};
