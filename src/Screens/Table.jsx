import React, { Component } from 'react'
import axios from 'axios'
import Home from './Home'
import './style.css'
export default class Table extends Component {
    constructor(props){
        super(props)
            this.state = {
                dataAPI : []
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
    render() {
        console.log('dataAPI', this.state.dataAPI)
        return (

    
           <div className="container">
               <Home/>
               <button type="submit" className="btn btn-primary" onClick={this.getData}>Ambil Data</button>
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
