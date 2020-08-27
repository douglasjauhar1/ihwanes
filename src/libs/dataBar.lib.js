/**
 *
 * @author Pratama "Sam1Dz" Dimas
 * @param {string[]} data Data yang akan di Convert ke Data Bar
 * @param {string[]} dateArr Data yang berisi Range Tanggal
 * @returns {object[]} Return Data yang berisi Data Jalur Merah, Kuning, dan Hijau
 */

const dataBar = (data, dateArr) => {
  // VARIABLE
  let jalurMerah = [];
  let jalurKuning = [];
  let jalurHijau = [];
  let result = [];

  for (let i = 0; i < dateArr.length; i++) {
    const dataRed = data.find(
      (x) =>
        x.waktuSelesai.toString() === dateArr[i].toString() &&
        x.kodeJalur === "M"
    );
    const dataYellow = data.find(
      (x) =>
        x.waktuSelesai.toString() === dateArr[i].toString() &&
        x.kodeJalur === "K"
    );
    const dataGreen = data.find(
      (x) =>
        x.waktuSelesai.toString() === dateArr[i].toString() &&
        x.kodeJalur === "HL"
    );

    if (typeof dataRed !== "undefined") {
      jalurMerah[i] = dataRed.jumlah;
    } else jalurMerah.push(0);

    if (typeof dataYellow !== "undefined") {
      jalurKuning[i] = dataYellow.jumlah;
    } else jalurKuning.push(0);

    if (typeof dataGreen !== "undefined") {
      jalurHijau[i] = dataGreen.jumlah;
    } else jalurHijau.push(0);
  }

  result.push({
    title: "Jalur Hijau",
    data: jalurHijau,
  });
  result.push({
    title: "Jalur Kuning",
    data: jalurKuning,
  });
  result.push({
    title: "Jalur Merah",
    data: jalurMerah,
  });

  return result;
};

export default dataBar;
