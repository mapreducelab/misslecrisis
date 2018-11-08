import React, { Component } from 'react';

import './App.css';



const missile = {};

const originMissile = [20, 20];

const speedMissile = 1;



const getMissileStyle = (missile) => 
{
  let upperLeftX = Math.min(missile.originMissile[0],  missile.targetMissile[0]);
  let upperLeftY = Math.min(missile.originMissile[1],  missile.targetMissile[1]);

  let width  = Math.abs(missile.originMissile[0]- missile.targetMissile[0])
  let height  = Math.abs(missile.originMissile[1]- missile.targetMissile[1])

  return {
  left: upperLeftX+'px',
  top: upperLeftY+'px',
  width: width+`px`,
  height: height+`px`
}};

class App extends Component {

  getStyleOrigin = () => ({
    left: 0+'px',
    top: 0+'px',
    width: 5+`px`,
    height: 5+`px`

  })

  getStyleTarget = (originMissile, targetMissile) => {
    let x1 = 0
    let x2 = Math.abs(originMissile[0]- targetMissile[0])
    let y1 = 0
    let y2 = Math.abs(originMissile[1]- targetMissile[1]);
    return {
    left: x2+'px',
    top: y2+'px',
    width: 5+`px`,
    height: 5+`px`

  }}

  createMissile = (originMissile, targetMissile, dateMissile, speedMisile) => {

    let line = this.createLine(originMissile, targetMissile);

    let styleLine = this.getStyleLine(line);

    let styleCurrent = this.getStyleCurrent(line);

    let styleOrigin = this.getStyleOrigin();
    let styleTarget = this.getStyleTarget(originMissile, targetMissile);

    this.setState( { missiles:  this.props.missiles.push( {originMissile, targetMissile, dateMissile, speedMisile, line, styleLine,  styleOrigin, styleTarget, styleCurrent,  ...missile} ) })
   
    console.log(this.props.missiles)
  }

  getTargetFromMouse = (event) => {
    return [event.clientX, event.clientY];
  }  

  clickOnMap = (event) => {
    let targetMissile = this.getTargetFromMouse(event);
    let dateMissile = new Date();
    this.createMissile(originMissile, targetMissile, dateMissile, speedMissile);
  }

  createLine = (originMissile, targetMissile) => {

    let x1 = 0
    let x2 = Math.abs(originMissile[0]- targetMissile[0])
    let y1 = 0
    let y2 = Math.abs(originMissile[1]- targetMissile[1]);
    let distance = Math.sqrt( ( (x1-x2)*(x1-x2) ) + ( (y1-y2)*(y1-y2) )  );
    let xMid = (x1+x2)/2;
    let yMid = (y1+y2)/2;
    let salopeInRadian = Math.atan( Math.abs(y1-y2)/Math.abs(x1-x2));
    let salopeInDegrees = (salopeInRadian*180)/Math.PI;

    let y50 = Math.sin(Math.round(salopeInDegrees))*50;
    let x50 = Math.cos(Math.round(salopeInDegrees))*50;

    console.log(salopeInDegrees, x50, y50, 'sin',Math.sin(salopeInDegrees), 'cos', Math.cos(salopeInDegrees))

    return {
      x1, x2, y1, y2, distance, xMid, yMid, salopeInRadian, salopeInDegrees, x50, y50
    }


  }

  getStyleLine = (line) => {
    return {
      width: line.distance+"px",
      top: line.yMid+'px',
      left: (line.xMid-(line.distance/2))+'px',
      'transform': 'rotate('+line.salopeInDegrees+'deg)',
      'transformOrigin': '0% 50%'
    }
  }

  getStyleCurrent= (line) => {
    return {
      top: line.y50+'px',
      left: line.x50+'px'
    }
  }


  render( ) {
    return (
      <div className="App">

        <div className="container__world" onClick={(event)=>this.clickOnMap(event)}>
          {this.props.missiles.map( (item, index) => <div className="item__missile" key={index} style={ getMissileStyle(item) }>
            <div className="container__origin" style={item.styleOrigin}></div>
            <div className="container__target" style={item.styleTarget}></div>
            <div className="container__current" style={item.styleCurrent}></div>
            <div className="line__missile" style={item.styleLine}></div>
          </div>)}
        </div>

      

        {/* <div className="button__create" onClick={()=>this.createMissile(this.props.missiles)}>create missile</div> */}



      </div>
    );
  }
}

App.defaultProps = {
  missiles: [] 
}

export default App;
