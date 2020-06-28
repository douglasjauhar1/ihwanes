import React, { Component } from 'react'
import {
    Doughnut,
    Bar
  } from 'react-chartjs-2';
import { isMoment } from 'moment';
  import axios from "axios"

export default class Denda extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataStatistik : [],
            tanggalAkhir : null
        }
    }
    componentDidUpdate (prevProps, prevState){
        let newData = JSON.parse(localStorage.getItem('tanggalAkhir'))
        if(newData != this.state.tanggalAkhir){
            this.getDataDenda()
            this.setState({
                tanggalAkhir : newData
            })
        }else{
            console.log("no reload")
        }
    }
    componentDidMount(){
        this.getDataDenda()
    }
    getDataDenda = () => {
        const nip = "198912242010121002"
        const kodeKantor = "040300"
        const tanggalAkhir = JSON.parse(localStorage.getItem('tanggalAkhir'))
        // const tanggalAwal = JSON.parse(localStorage.getItem('tanggalAwal'))
        const tahun =  tanggalAkhir.substring(tanggalAkhir.lastIndexOf("-")+1)
        // const idHeader = JSON.parse(localStorage.getItem('idHeader')) || null
        this.setState({
            loading: true,
          });
          axios({
            method: "GET",
            // http://localhost:8383/pemeriksaan-dokumen/statistik-dokumen-pabean/050400/196909171990121001/2019
            url: `${process.env.REACT_APP_PFPD}/pemeriksaan-dokumen/statistik-dokumen-pabean/`+ kodeKantor + '/' + nip + '/' + tahun,
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
    render() {
        let chart = {}
        try{
            chart = this.state.dataStatistik
        }catch (e){

        }
        const data = {
          "1": 21231313,
          "2": 3313131,
          "3": 3131313,
          "4": 232323,
          "5": 31311313,
          "6": 31311,
          "7": 313131,
          "8": 31313,
          "9": 31313,
          "10": 464646,
          "11": 64466,
          "12": 745464645,
        }
        console.log ("test", data[1])
      
        var den = []
        var i = 1
        var l = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        var d = [data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12]];
        var total = 0;
     
        for(i = 0; i <d.length; i++){
          console.log(i)
       total += d[i];
       console.log(total)
        }
        const denda_chart = {
            labels:l,
            datasets: [
            {
              label: 'Denda',
              backgroundColor: 'rgba(26, 188, 156, 1.0)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(26, 188, 156, 0.7)',
              data:d
            }
            ]
          }
          
        return (
          <div>
                    <div class="row title"> 
        
        <div class="columnDenda">
         
            <div id="block_containerDenda">
                <div id="block1s" class="ml-3">
        <i class="fas fa-wallet mr-2" aria-hidden="true" style={{color : "#627EFF", fontSize : 16}}> </i>
        </div>
        <div id="block1">
        <p style={{fontWeight : "bold"}}>Denda Penetapan</p>
        </div>
        </div>
        
        
        </div>
        <div class={this.state.isActive ? "columnDenda active" : "columnDenda"}>
        <div id="block2s" class="mr-3">
        <p onClick={this.changeData}>Rp. <span style={{color : 'blue'}}>50.000.00</span></p> 
        </div>
        </div>
                  
        
                </div> 
                <br></br>
        
          <Bar
          data={denda_chart}
        width={"320"}
        height={"220"}
            options={{
                legend:{
                display:false,
                },
            
            }}
         
          />
            </div>
        )
    }
}
