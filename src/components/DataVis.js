import React from 'react';
import styled from 'styled-components'
import '../App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';



class DataVis extends React.Component{
  constructor(){
    super()
    this.state = {
      utahData: [],
      isLoaded: false
    }
  }
  
  componentDidMount() {
    const historicalUtahJson = 'https://covidtracking.com/api/v1/states/ut/daily.json';
      fetch(historicalUtahJson)
      .then(response => {
        return response.json();
      }).then(data => {
        console.log('data', data);
        const utahStats = data.reverse();
        this.setState({utahData: utahStats, isLoaded: true})
        console.log('utah data => ', this.state.utahData)
      })    
  }

  render() {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      console.log('payload? ', payload[0].payload.positive)
      console.log('label is type: ', typeof(label))
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${label.toString().slice(4)}`}<br/>
          {`positive cases: ${payload[0].payload.positive}`}</p>
        </div>
      );
    }
  
    return null;
  };

  
  const renderLineChart = (
    <LineChart styee={{color: 'white'}} width={800} height={600} data={this.state.utahData} margin={{ top: 15, right: 20, bottom: 15, left: 20 }}>
      <Line type="monotone" dataKey="positive" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis dataKey="positive" ticks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]}/>
      <Tooltip 
      content={this.state.isLoaded ? CustomTooltip : null}
      />
    </LineChart>
  );
    return(
        <header className="App-header">
        <Callout>Here's some simple data visualization</Callout>
        <h4>Positive Covid-19 cases in Utah</h4>
        {this.state.isLoaded ? renderLineChart : 'Loading...'}
      </header>
    )
}
}

export default DataVis;

const Callout = styled.span`
margin-bottom: -20px;
font-size: 0.8em;
font-weight: 200;
`
