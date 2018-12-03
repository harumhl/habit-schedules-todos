import React, { Component } from 'react';
//import './App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class Graph extends Component {
    data = [];
    
    constructor () {
        super()
        this.data = [
                      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
                      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
                      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
                      ];

    }
    
    render() {
        return (
            <div>
                <LineChart width={600} height={300} data={this.data}
                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </div>
        );
    }
}

export default Graph;
