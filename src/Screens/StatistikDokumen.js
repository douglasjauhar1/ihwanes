import React, { Component } from 'react'
import {
    Doughnut,
    Bar
  } from 'react-chartjs-2';
  import * as moment from 'moment'
  import axios from "axios"
  import './style.css'

export default class StatistikDokumen extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataStatistik : [],
            tanggalAkhir : null,
            kodePanel : "SD",
            isActive : false
        }
    }
    componentDidUpdate (prevProps, prevState){
        let newData = JSON.parse(localStorage.getItem('tanggalAkhir'))
        if(newData != this.state.tanggalAkhir){
            this.getDataStatistik()
            this.setState({
                tanggalAkhir : newData
            })
        }else{
            console.log("no reload")
        }
    }
    componentDidMount(){
        this.getDataStatistik()
    }
    getDataStatistik = () => {
        const nip = "198912242010121002"
        const kodeKantor = "040300"
        const tanggalAkhir = JSON.parse(localStorage.getItem('tanggalAkhir'))
        const tanggalAwal = JSON.parse(localStorage.getItem('tanggalAwal'))

        // const idHeader = JSON.parse(localStorage.getItem('idHeader')) || null
        this.setState({
            loading: true,
          });
          if(this.state.isActive == false){
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_PFPD}/pemeriksaan-dokumen/statistik-dokumen-pabean/`+ kodeKantor + '/' + nip + '/' + this.state.kodePanel + '/tanggalAwal=' + tanggalAwal + '/tanggalAKhir=' + tanggalAkhir,
                headers: {
                  "beacukai-api-key": process.env.REACT_APP_SECRET_KEY_PFPD,
                },
              })
                .then(res => {
                    console.log(res)
                  let result = res.data
                  console.log("resnya,", result);
                  this.setState({
                    dataStatistik : result,
                    loading: false,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  this.setState({
                    loading: false,
                  });
                });
          }else{
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_PFPD}/pemeriksaan-dokumen/statistik-dokumen-pabean/`+ kodeKantor + '/' + nip + '/' + "RK" + '/tanggalAwal=' + tanggalAwal + '/tanggalAKhir=' + tanggalAkhir,
                headers: {
                  "beacukai-api-key": process.env.REACT_APP_SECRET_KEY_PFPD,
                },
              })
                .then(res => {
                    console.log(res)
                  let result = res.data
                  console.log("resnya,", result);
                  this.setState({
                    dataStatistik : result,
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
        
    }

    changeData = () =>{
        this.setState({
            isActive : true,
            // kodePanel : "RK"
        })
        this.getDataStatistik()
        console.log(this.state.isActive)
    }
    changeData2 = () =>{

        this.setState({
            isActive :false,
            // kodePanel : "RK"
        })
        this.getDataStatistik()
        console.log(this.state.isActive)
    }
     render() {
 
      
       
        const style={}
        let chart = {}
        try{
            chart = this.state.dataStatistik
        }catch (e){

        }
        //Jika Menggunakan API Uncomment
        // const dataSelesai = chart.jumlahStatusBelumDiperiksa
        // const dataDiperiksa = chart.jumlahStatusSelesai
        // const dataGantung = chart.jumlahSedangDiperiksa
        // const total = dataSelesai + dataDiperiksa + dataGantung
        // const countSelsesai = dataSelesai/total*100
        // const countDiperiksa = dataDiperiksa/total*100
        // const countGantung = dataGantung/total*100
        const dataSelesai = 200/1000*100
        const dataDiperiksa = 300/1000*100
        const dataGantung = 500/1000*100
    

        const status_dokumen = {
            labels: [
            `${dataSelesai}% Selesai`,
            `${dataDiperiksa}% Diperiksa`,
            `${dataGantung}% DIgantung`
            ],
            datasets: [{
            //   data: [chart.jumlahStatusBelumDiperiksa, chart.jumlahStatusSelesai, chart.jumlahStatusSedangDiperiksa],
              data:[200,300,500],
              backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ],
              hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ]
            }],
     
          }
          const option = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
            position: 'right',
            labels: {
                boxWidth: 20
            },
            elements : {
              center : {
                text : "300",
                color : 'black',
              },
            }
           }
          }
          const Ok = 100/400*100
          const Sptnp = 200/400*100
          const Denda = 100/400*100
          const resume_keputusan = {
            labels: [
            `${Ok} % Ok`,
            `${Sptnp} % SPTNP`,
            `${Denda} % Denda`
            ],
            datasets: [{
            //   data: [resume.ok, resume.sptnp, resume.denda],
              data:[100,200,100],
              backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ],
              hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ]
            }]
          }
      
        return (
            <div>
             <div class="row title"> 
        
<div class="column">
 
    <div id="block_container">
        <div id="block1">
<i class="fa fa-pie-chart " aria-hidden="true" style={{color : "#627EFF", fontSize : 16}}> </i>
</div>
<div id="block1">
<p style={{fontWeight : "bold"}}>Statistik Dokumen</p>
</div>
</div>


</div>
<div class={this.state.isActive == false ? "column active" : "column"}>
  <div id="block3">
<p onClick={this.changeData2}>Status Dokumen</p>
</div>
</div>
<div class={this.state.isActive ? "column active" : "column"}>
<div id="block2">
<p onClick={this.changeData}>Resume Keputusan</p> 
</div>
</div>
          

        </div> 
        <br></br>
   
        <div style={{marginTop : 0}}>
            {this.state.isActive == false?
                    <Doughnut
                    data={status_dokumen}
                    width={"320"}
                    height={"320"}
                    options={option}
                      /> : 
                      <Doughnut
                      data={resume_keputusan}
                      width={"320"}
                      height={"320"}
                      options={option}
                        />
                    }
  
      
          </div>
         
          </div>
        )
    }
}
