import React, { Component } from 'react'
import axios from 'axios'
import {Input} from 'antd'
import Home from './Home'
import './style.css'
export default class Table extends Component {
    constructor(props){
        super(props)
            this.state = {
                dataAPI : [],
                data1 : 3,
                data2 : 2,
                formData : {
                    number : ""
                },
            }  
    }
    getData = () => {
        axios({
            method : 'GET',
            url : 'https://jsonplaceholder.typicode.com/users'
            
        })
        .then(res => {
            const api = res.data
            this.setState({
                dataAPI : api
            })
            console.log('datanya',res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    componentDidMount(){
       
    }
    onTodoChange(e){
        console.log('e', e)
        let b = {...this.state.formData}
        b.number = e
        this.setState({
             formData : b
        });
    }
    render() {
        console.log('dataAPI', this.state.formData)
        return (

    
           <div className="container">
               <Home/>
               <button type="submit" className="btn btn-primary" onClick={this.getData}>Ambil Data</button>
        <h3>Kondisi barangPemberitahuan dan ambil tarif</h3>
        <h4>Data Pemberitahuan tarifBm : {this.state.data1}</h4>
        <h4>Data ambilTarif tarifBm : {this.state.data2}</h4>
        <h4>Yang dipakai :  {this.state.data1 != this.state.data2 ? this.state.data2 : null}</h4>
        <br/>
        {/* <h4>Data Pemberitahuan tarifBm : {this.state.data3}</h4>
        <h4>Data ambilTarif tarifBm : {this.state.data4}</h4>
        <h4>Yang dipakai :  {this.state.data3 != this.state.data4 ? this.state.data4 : null}</h4>
        <br/>
        <h4>Data Pemberitahuan tarifBm : {this.state.data5}</h4>
        <h4>Data ambilTarif tarifBm : {this.state.data6}</h4>
        <h4>Yang dipakai :  {this.state.data5 != this.state.data6 ? this.state.data6 : null}</h4> */}
               <br/>
               <br/>
               <h3>Sumber data 1 : {this.state.data1}</h3>
               <h3>Sumber data 2 : {this.state.data2}</h3>

        <Input
        type="text"
        value={this.state.data1 || this.state.data2 || ""}
        name="number"
        onChange={this.onTodoChange.bind(this)}
        
        />
        <br/>
        <br/>
               <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NAMA</th>
      <th scope="col">EMAIL</th>
    </tr>
  </thead>
  {this.state.dataAPI.map((value, index) => {
                        return (
                           
                            <tbody>
                            <tr>
                              <th scope="row">{value.id}</th>
                              <td>{value.name}</td>
                              <td>{value.email}</td>
                            </tr>
                          
                          </tbody>
                        )
                      }
                      )}


</table>
              
            
           </div>
        )
    }
}
