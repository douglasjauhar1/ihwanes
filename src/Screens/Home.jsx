import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Card, DatePicker } from "antd";
import Moment from "moment";
import StatistikDokumen from "./StatistikDokumen";
import Denda from "./Denda";
import DokumenSelesai from "./DokumenSelesai";
import KonfirmasiNilaiPabean from "./KonfirmasiNilaiPabean";

// IMPORT : LIBS
import { RangeDate } from "../libs/rangeData.lib";

const { RangePicker } = DatePicker;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      timeStart: "",
      timeEnd: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.tglAwal !== prevProps.tglAwal ||
      this.props.tglAkhir !== prevProps.tglAkhir
    ) {
      this.setState({
        timeStart: Moment(this.props.tglAwal).format("DD-MM-YYYY"),
        timeEnd: Moment(this.props.tglAkhir).format("DD-MM-YYYY"),
      });
    }
  }

  handleVisible = (flag) => {
    this.setState({
      visible: flag,
    });
  };
  onChangeDate = (date) => {
    const timeStart = Moment(date[0]).format("DD-MM-YYYY");
    const timeEnd = Moment(date[1]).format("DD-MM-YYYY");

    this.setState({ timeStart, timeEnd });

    localStorage.setItem(
      "tanggalAwal",
      JSON.stringify(Moment(date[0]).format("YYYY-MM-DD"))
    );
    localStorage.setItem(
      "tanggalAkhir",
      JSON.stringify(Moment(date[1]).format("YYYY-MM-DD"))
    );
  };
  handleOnClick = (e) => {
    if (e.key == "1") {
      let timeEnd = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
      this.setState({
        visible: false,
        timeStart: new Date(),
        timeEnd: localStorage.setItem(
          "tanggalAkhir",
          JSON.stringify(
            Moment(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)).format(
              "DD-MM-YYYY"
            )
          )
        ),
      });
      localStorage.setItem(
        "tanggalAwal",
        JSON.stringify(Moment(this.state.timeStart).format("DD-MM-YYYY"))
      );
      localStorage.setItem(
        "tanggalAkhir",
        JSON.stringify(
          Moment(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)).format(
            "DD-MM-YYYY"
          )
        )
      );
      // alert(this.state.timeStart)
    }
    if (e.key == "2") {
      let timeEnd = Moment().subtract(7, "days").calendar();
      this.setState({
        visible: false,
        timeStart: new Date(),
        timeEnd: localStorage.setItem(
          "tanggalAkhir",
          JSON.stringify(Moment().subtract(7, "days").format("DD-MM-YYYY"))
        ),
      });
      localStorage.setItem(
        "tanggalAwal",
        JSON.stringify(Moment(this.state.timeStart).format("DD-MM-YYYY"))
      );
      localStorage.setItem(
        "tanggalAkhir",
        JSON.stringify(Moment().subtract(7, "days").format("DD-MM-YYYY"))
      );
    }
    if (e.key == "3") {
    }
  };

  render() {
    // console.log(`[debug] 時間 : ${this.state.timeStart} - ${this.state.timeEnd}`);
    const menu = (
      <Menu onClick={this.handleOnClick}>
        <Menu.Item key="1">Kemarin</Menu.Item>
        <Menu.Item key="2">Seminggu Yang Lalu</Menu.Item>
        <Menu.Item key="3">
          <RangePicker
            onChange={this.onChangeDate}
            defaultValue={[
              Moment(this.state.timeStart, "DD-MM-YYYY"),
              Moment(this.state.timeEnd, "DD-MM-YYYY"),
            ]}
            format={"DD-MM-YYYY"}
          />
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a class="navbar-brand" href="#">
              <Link to={"/"}>Navbar</Link>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link to={"table"}>Table</Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Dropdown
            overlay={menu}
            visible={this.state.visible}
            onVisibleChange={this.handleVisible}
          >
            <a className="ant-dropdown-link">Hover me, Click menu item</a>
          </Dropdown>
          ,
          <div class="row">
            <div className="col-lg-6">
              <Card size="small" style={{ height: 450 }}>
                <StatistikDokumen />
              </Card>
            </div>
            <div className="col-lg-6">
              <Card size="small">
                <Denda />
              </Card>
            </div>
            <div className="col-lg-6">
              <Card size="small">
                <DokumenSelesai />
              </Card>
            </div>
            <div className="col-lg-6">
              <Card size="small">
                <KonfirmasiNilaiPabean />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
