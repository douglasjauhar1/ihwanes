import React, { Component } from 'react'
import {
    Doughnut,
    Bar
} from 'react-chartjs-2';
import * as moment from 'moment'
import axios from "axios"
import './style.css'
import { Col, Row, Icon, Tag } from 'antd'

const Dummy = [{ "idHeader": "1", "nomorDaftar": "000001", "tanggalDaftar": "07-10-2019", "kodeDokumen": "20", "namaDokumen": "PIB/IMPOR", "pengusaha": { "namaEntitas": "NAMA1", "nomorIdentitas": "12345678910" }, "umur": 18, "kodeJalur": "HL" },

{ "idHeader": "2", "nomorDaftar": "000002", "tanggalDaftar": "08-10-2019", "kodeDokumen": "23", "namaDokumen": "BC 23", "pengusaha": { "namaEntitas": "NAMA2", "nomorIdentitas": "12345678910" }, "umur": 17, "kodeJalur": "HL" }]

class ListItem extends Component {
    render() {
        return (
            <Row onClick={this.props.onClick} style={{ padding: 0, margin: 0, color: '#6c7293', borderBottom: "1px solid rgb(212, 212, 212)" }}>
                <Col span={18}>
                    <p style={{ padding: 0, lineHeight: '2em', margin: 0, paddingLeft: 10, paddingTop: 2, fontWeight: 'bold' }}>
                        {this.props.kode} / {moment(this.props.tanggal).format('DD MMM YYYY')} - {this.props.jenis} {this.props.keterangan}
                    </p>
                    <p style={{ padding: 0, lineHeight: '2em', margin: 0, paddingLeft: 10, paddingBottom: 2, fontSize: 12 }}>
                        {this.props.perusahaan}
                    </p>
                </Col>
                <Col span={4}>
                    <Tag>{this.props.umur}</Tag>
                    <Tag color='#87d068'>{this.props.jalur}</Tag>
                </Col>
                <Col span={2}>
                    {/* <Icon type="right" /> */}
                </Col>
            </Row>

        );
    };
}

export default class KonfirmasiNilaiPabean extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataStatistik: [],
            tanggalAkhir: null,
            kodePanel: "SD",
            isActive: false,
            Data: [
                { "idHeader": "1", "nomorDaftar": "000001", "tanggalDaftar": "07-10-2019", "kodeDokumen": "20", "namaDokumen": "PIB/IMPOR", "pengusaha": { "namaEntitas": "NAMA1", "nomorIdentitas": "12345678910" }, "umur": 18, "kodeJalur": "HL" },

                { "idHeader": "2", "nomorDaftar": "000002", "tanggalDaftar": "08-10-2019", "kodeDokumen": "23", "namaDokumen": "BC 23", "pengusaha": { "namaEntitas": "NAMA2", "nomorIdentitas": "12345678910" }, "umur": 17, "kodeJalur": "HL" }
            ]
        }
    }
    componentDidUpdate(prevProps, prevState) {
        let newData = JSON.parse(localStorage.getItem('tanggalAkhir'))
        if (newData != this.state.tanggalAkhir) {

            this.setState({
                tanggalAkhir: newData
            })
        } else {
            console.log("no reload")
        }
    }
    componentDidMount() {
        // this.getDataStatistik()
    }


    changeData = () => {
        this.setState({
            isActive: true,
            // kodePanel : "RK"
        })

        console.log(this.state.isActive)
    }
    changeData2 = () => {

        this.setState({
            isActive: false,
            // kodePanel : "RK"
        })

        console.log(this.state.isActive)
    }

    render() {
        console.log("Dum", Dummy)


        return (
            <div>
                <div class="row title">

                    <div class="column">

                        <div id="block_container">
                            <div id="block1">
                                <i class="fa fa-pie-chart " aria-hidden="true" style={{ color: "#627EFF", fontSize: 16 }}> </i>
                            </div>
                            <div id="block1">
                                <p style={{ fontWeight: "bold" }}>KonfirmasiNilaiPabean</p>
                            </div>
                        </div>


                    </div>
                    <div class={this.state.isActive == false ? "column active" : "column"}>
                        <div id="block3">
                            <p onClick={this.changeData2}>INP</p>
                        </div>
                    </div>
                    <div class={this.state.isActive ? "column active" : "column"}>
                        <div id="block2">
                            <p onClick={this.changeData}>DNP</p>
                        </div>
                    </div>
                    <div class={this.state.isActive ? "column active" : "column"}>
                        <div id="block2">
                            <p onClick={this.changeData}>QA</p>
                        </div>
                    </div>


                </div>
                <br></br>
                <div>
                    {this.state.Data.length == 0 ? "Kosong" : this.state.Data.map((value, index) => (
                        <div>
                            <ListItem
                                kode={value.nomorDaftar}
                                perusahaan={"(" + value.pengusaha.nomorIdentitas + ") - " + value.pengusaha.namaEntitas}
                                tanggal={value.tanggalDaftar}
                                umur={value.umur}
                                jalur={value.kodeJalur}
                                keterangan={value.namaDokumen + " " + value.kodeJalur}
                                status={value._status}
                                onClick={() => this.onClick(value.idHeader)}
                            />
                        </div>
                    )
                    )}</div>


            </div>
        )
    }
}
