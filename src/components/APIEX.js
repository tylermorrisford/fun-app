import React from 'react';
import styled from 'styled-components'
import '../App.css';

const key = process.env.REACT_APP_WEATHER_API_KEY;
console.log('key',  key);
// const date = Date.now();
// console.log(date); 
const url = `https://api.openweathermap.org/data/2.5/weather?id=5780993&units=Imperial&appid=${key}`;

class APIEX extends React.Component{
   constructor(){
     super()
     this.state={
       ready: false,
       location: 'Salt Lake City, UT',
       locationData: {},
       temp: null,
       sunrise: null, // translate UTC to date format
       sunset: null,
       description: null,
       name: null,
       country: null
     }
   }

   
   componentDidMount(){
    fetch(url)
    .then(response => {
      return response.json();
    }).then(data => {
      console.log('data', data);
      console.log('curr temp', data.main.temp)
      this.setState({
        ready: true,
        locationdata: data,
        temp: data.main.temp
      })
    })
  }

  render(){

    const handleSubmit = (e) => {
      console.log(e);
      e.preventDefault();
      this.setState({
          location: e.target.value
      })
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=Imperial&appid=${key}`;
      fetch(url)
      .then(response => {
        return response.json();
      }).then(data => {
        console.log('data', data);
        console.log('curr temp', data.main.temp)
        this.setState({
          ready: true,
          locationdata: data,
          temp: data.main.temp,
          description: data.weather[0].description,
          name: data.name,
          country: data.sys.country
        })
      })
    }

    

    const handleChange = (e) => {
      this.setState({
        location: e.target.value
      }) 
    }

    return(
        <header className="App-header">
        <Brand>API example</Brand>
        <Callout>Check current weather</Callout>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Enter your location" onChange={handleChange}/><br/>
          <Button type="submit" name="submit">Get Weather ></Button>
          <h4>{this.state.location}</h4>
          {this.state.temp ? (<h5>Current Temp: {this.state.temp}˚F</h5>) : null}
          {this.state.name ? (<h6><em>for  {this.state.name}, {this.state.country}</em></h6>) : null}
        </form>
      </header>
    )
  }
  
}

export default APIEX;


// styled components
const Callout = styled.span`
  margin-bottom: 5px;
  font-size: 0.8em;
  font-weight: 200;
`

const Brand = styled.h3`
  margin-top: 2px;
`
const Input = styled.input`
  border: 1px solid white;
  height: 25px;
  background-color: #282c34;
  width: 150px;
  margin-bottom: 15px;
  color: white;
  padding: 0 auto;
`
const Button = styled.button`
  height: 40px;
  margin: 10px;
  border-radius: 4px;
  background-color: #282c34;
  color: white;
  border: 2px solid #494A5F;
`