import React, { Component } from 'react'
import {
    Doughnut,
    Bar
  } from 'react-chartjs-2';
  import { isMoment } from 'moment';
  import axios from "axios"
  import './style.css'
  import * as moment from 'moment';

export default class DokumenSelesai extends Component {
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
       const tglAkhir = JSON.parse(localStorage.getItem('tanggalAkhir'))
       const date = moment(tglAkhir, 'DD-MM-YYYY')
       let n = date.format('D')
      //  let nilaiDate = tglAkhir.getDate()
       console.log("month",n)
      //  console.log("date", nilaiDate)
      let a  = 26
      let b = []
      for(let i = 1; i<=n; i++){
        console.log(i)
        b.push(i)
        
      }
   
       const datas = [
        {
          "kodeJalur": "HL",
          "waktuSelesai": "18-11-2019",
          "jumlah": 1
        },
        {
          "kodeJalur": "HL",
          "waktuSelesai": "20-02-2020",
          "jumlah": 2
        },
        {
          "kodeJalur": "K",
          "waktuSelesai": "19-02-2020",
          "jumlah": 2
        },
        {
          "kodeJalur": "M",
          "waktuSelesai": "19-02-2020",
          "jumlah": 2
        },
        {
          "kodeJalur": "HL",
          "waktuSelesai": "13-02-2020",
          "jumlah": 2
        }
      ]
      // const jalurHL = 
         let jalurMerah = "20"
         let jalurKuning = "30"
         let jalurHijau = "40"
      const data =  {
        labels: b,
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(26, 188, 156, 1.0)',
            borderColor: 'rgba(26, 188, 156, 1.0)',
            borderWidth: 1,
            stack: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40,20,20,20]
          },
          {
            label: 'My second dataset',
            backgroundColor: 'rgba(240, 52, 52, 1)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            stack: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [45, 79, 10, 41, 16, 85, 20,40,40,40]
          },
          {
            label: 'My second dataset',
            backgroundColor: 'yellow',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            stack: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [45, 79, 10, 41, 16, 85, 20,40,40,40]
          }
        ]
    }
    const options={
        responsive: true,
        legend: {
            display: false,
        },
        type:'bar',
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
      
        return (
            <div>
             <div class="row title"> 
        
<div class="column">
 
    <div id="block_container">
        <div id="block1">
<i class="fa fa-line-chart " aria-hidden="true" style={{color : "#627EFF", fontSize : 16}}> </i>
</div>
<div id="block1">
<p style={{fontWeight : "bold"}}>Statistik Dokumen</p>
</div>
</div>


</div>
<div class={this.state.isActive == false ? "column active" : "column"}>
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
   
        <div style={{marginTop : 0}}>
        <Bar
                data={data}
                width={null}
                height={null}
                options={options}
            />
  
      
          </div>
         
          </div>
        )
    }
}
