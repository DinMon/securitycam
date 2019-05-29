import React from 'react';
import axios from 'axios';
import './App.css';
import{ Component } from 'react'
import{ LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default class App extends Component {
  state = {
    employees: [],
    displayTableView: true,
    indexSelected: null,
    data: []
  }

  componentDidMount(){
    axios.get('https://i1i35qkgci.execute-api.us-east-2.amazonaws.com/Dev/employees')
      .then((response) => {
        this.setState({...this.state, employees: response.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDisplayTable = () => {
      this.setState({...this.state, displayTableView: true, indexSelected: null, data: []})
  }

  handleRowClick = (e, index) => {
    console.log(index)
    axios.get(`https://i1i35qkgci.execute-api.us-east-2.amazonaws.com/Dev/employee/${this.state.employees[index].id}/time`)
      .then((response) => {
        const data = response.data.map(x => {
          const date = new Date(x.datetime)
          const y = {
            date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
            time: parseFloat(`${date.getHours()}.${date.getMinutes()}`)
          }
          return y
        })
        this.setState({...this.state, displayTableView: false, indexSelected: index, data: data})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header>
          <div class="container-fluid">
            <div class="row bg-info justify-content-center">
              <h1 class="my-3"><a id="brand" class="text-white text-decoration-none" onClick={this.handleDisplayTable}>SecurityCam Dashboard</a></h1>
            </div>
          </div>
        </header>


        {(this.state.displayTableView) ? (
          <div>
            <section id="main-area" class="pt-5">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header bg-primary text-white font-weight-bold">
                    Employees
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12 pt-3">
                        <table class="table table-striped table-hover">
                          <tr>
                            <th>EmployeeId</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                          {
                              this.state.employees.map( (emp,i) =>{
                                  return (
                                      <tr key={i} onClick={(e) => this.handleRowClick(e, i)}>
                                          <td>{emp.id}</td>
                                          <td>{emp.name}</td>
                                          <td>{
                                            (emp.status) ? (
                                              <i class="fas fa-check-circle text-success"></i>
                                            ): (
                                                <i class="fas fa-times-circle text-danger"></i>
                                            )
                                            }</td>
                                            <td><i class="fas fa-chevron-right"></i></td>
                                      </tr>
                                  )
                              })
                          }
                          </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ):(
          <section id="Graph" class="pt-5">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header bg-primary text-white font-weight-bold">
                    Employee: {`${this.state.employees[this.state.indexSelected].name} (id: ${this.state.employees[this.state.indexSelected].id})`}
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12 pt-5">
                        <LineChart
                            width={500}
                            height={300}
                            data={this.state.data}
                            margin={{
                              top: 5, right: 30, left: 20, bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis type="number" domain={[0, 25]}/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="time" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </section>
        )}


      </div>
    );
  }
}