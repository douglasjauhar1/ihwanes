import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import Moment from "moment";
import axios from "axios";
import "./style.css";
import moment from "moment";

// IMPORT : DummyData
import DummyData from "../data/dummyBar.json";

// IMPORT : Libs
import { ArrayDate } from "../libs/rangeData.lib";
import DataBar from "../libs/dataBar.lib";

export default class DokumenSelesai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStatistik: [],
      tanggalAwal: null,
      tanggalAkhir: null,
      kodePanel: "SD",
      isActive: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    let newData = JSON.parse(localStorage.getItem("tanggalAkhir"));
    if (newData !== this.state.tanggalAkhir) {
      this.getDataStatistik();
      this.setState({
        tanggalAkhir: newData,
      });
    } else {
      console.log("no reload");
    }
  }
  componentDidMount() {
    this.getDataStatistik();
  }
  getDataStatistik = () => {
    const nip = "198912242010121002";
    const kodeKantor = "040300";
    const tanggalAkhir = JSON.parse(localStorage.getItem("tanggalAkhir"));
    const tanggalAwal = JSON.parse(localStorage.getItem("tanggalAwal"));

    // const idHeader = JSON.parse(localStorage.getItem('idHeader')) || null
    this.setState({
      loading: true,
    });
    if (this.state.isActive === false) {
      axios({
        method: "GET",
        url:
          `${process.env.REACT_APP_PFPD}/pemeriksaan-dokumen/statistik-dokumen-pabean/` +
          kodeKantor +
          "/" +
          nip +
          "/" +
          this.state.kodePanel +
          "/tanggalAwal=" +
          tanggalAwal +
          "/tanggalAKhir=" +
          tanggalAkhir,
        headers: {
          "beacukai-api-key": process.env.REACT_APP_SECRET_KEY_PFPD,
        },
      })
        .then((res) => {
          console.log(res);
          let result = res.data;
          console.log("resnya,", result);
          this.setState({
            dataStatistik: result,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
          });
        });
    } else {
      axios({
        method: "GET",
        url:
          `${process.env.REACT_APP_PFPD}/pemeriksaan-dokumen/statistik-dokumen-pabean/` +
          kodeKantor +
          "/" +
          nip +
          "/" +
          "RK" +
          "/tanggalAwal=" +
          tanggalAwal +
          "/tanggalAKhir=" +
          tanggalAkhir,
        headers: {
          "beacukai-api-key": process.env.REACT_APP_SECRET_KEY_PFPD,
        },
      })
        .then((res) => {
          console.log(res);
          let result = res.data;
          console.log("resnya,", result);
          this.setState({
            dataStatistik: result,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
          });
        });
    }
  };

  changeData = () => {
    this.setState({
      isActive: true,
      // kodePanel : "RK"
    });
    this.getDataStatistik();
    console.log(this.state.isActive);
  };
  changeData2 = () => {
    this.setState({
      isActive: false,
      // kodePanel : "RK"
    });
    this.getDataStatistik();
    console.log(this.state.isActive);
  };
  render() {
    const tglAwal = JSON.parse(localStorage.getItem("tanggalAwal"));
    const tglAkhir = JSON.parse(localStorage.getItem("tanggalAkhir"));

    const date = moment(tglAkhir, "DD-MM-YYYY");
    let n = date.format("D");
    //  let nilaiDate = tglAkhir.getDate()
    console.log("month", n);
    //  console.log("date", nilaiDate)
    let a = 26;
    let b = [];
    for (let i = 1; i <= n; i++) {
      console.log(i);
      b.push(i);
    }

    const tanggalBulanini = ArrayDate(tglAwal, tglAkhir);
    const dataBar = DataBar(DummyData.data, tanggalBulanini);

    //console.log("[debug] tanggalBulanini?", tanggalBulanini);
    // console.log("[debug] dataBar?", dataBar);

    const data = {
      labels: tanggalBulanini,
      datasets: [
        {
          label: "Jalur Hijau",
          backgroundColor: "green",
          borderWidth: 1,
          stack: 1,
          data: dataBar[0].data,
        },
        {
          label: "Jalur Merah",
          backgroundColor: "red",
          borderWidth: 1,
          stack: 1,
          data: dataBar[2].data,
        },
        {
          label: "Jalur Kuning",
          backgroundColor: "yellow",
          borderWidth: 1,
          stack: 1,
          data: dataBar[1].data,
        },
      ],
    };

    const options = {
      responsive: true,
      legend: {
        display: false,
      },
      type: "bar",
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    };

    return (
      <div>
        <div class="row title">
          <div class="column">
            <div id="block_container">
              <div id="block1">
                <i
                  class="fa fa-line-chart "
                  aria-hidden="true"
                  style={{ color: "#627EFF", fontSize: 16 }}
                >
                  {" "}
                </i>
              </div>
              <div id="block1">
                <p style={{ fontWeight: "bold" }}>Statistik Dokumen</p>
              </div>
            </div>
          </div>
          <div
            class={this.state.isActive === false ? "column active" : "column"}
          >
            <div id="block3">
              <p onClick={this.changeData2}>Dokumen Per Hari</p>
            </div>
          </div>
          <div class={this.state.isActive ? "column active" : "column"}>
            <div id="block2">
              <p onClick={this.changeData}>Hari Per Dokumen</p>
            </div>
          </div>
        </div>
        <br></br>

        <div style={{ marginTop: 0 }}>
          <Bar data={data} width={null} height={null} options={options} />
        </div>
      </div>
    );
  }
}
