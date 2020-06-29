const dataBar = (data, dateArr) => {
  // VARIABLE
  let jalurMerah = [];
  let jalurKuning = [];
  let jalurHijau = [];
  let result = [];

  for (let i = 0; i < dateArr.length; i++) {
    jalurMerah.push(0);
    jalurKuning.push(0);
    jalurHijau.push(0);
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].kodeJalur === "HL") {
      const index = Number(data[i].waktuSelesai.split("-")[0]) - 1;
      jalurHijau[index] = data[i].jumlah;
    }
    if (data[i].kodeJalur === "K") {
      const index = Number(data[i].waktuSelesai.split("-")[0]) - 1;
      jalurKuning[index] = data[i].jumlah;
    }
    if (data[i].kodeJalur === "M") {
      const index = Number(data[i].waktuSelesai.split("-")[0]) - 1;
      jalurMerah[index] = data[i].jumlah;
    }
  }

  result.push(jalurHijau);
  result.push(jalurKuning);
  result.push(jalurMerah);

  return result;
};

export default dataBar;
