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

export const ArrayDate = (tanggalAwal, tanggalAkhir) => {
  const dateAwalSplit = tanggalAwal.split("-");
  const dateAkhirSplit = tanggalAkhir.split("-");

  const dateAwal = new Date(`${dateAwalSplit[1]}-${dateAwalSplit[2]}-${dateAwalSplit[0]}`); 
  const dateAkhir = new Date(`${dateAkhirSplit[1]}-${dateAkhirSplit[2]}-${dateAkhirSplit[0]}`);

  const Difference_In_Time = dateAkhir.getTime() - dateAwal.getTime();
  const Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;

  let tanggal = [];

  for(let i = 1; i <= Difference_In_Days; i++) {
    tanggal.push(i);
  }
  
  return tanggal;
}