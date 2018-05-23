import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecon from './components/FaceRecon/FaceRecon';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'c2a47be651f04df68a5a08c29171f6a1'
 });

const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {}
    }
  }

  calcFaceLocation = (data) =>{
    const clarifaiData = data.outputs["0"].data.regions["0"].region_info.bounding_box;
    const image = document.getElementById('imageUrl');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiData.left_col * width,
      topRow: clarifaiData.top_row * height,
      rightCol: width - (clarifaiData.right_col * width),
      bottomRow: height- (clarifaiData.bottom_row * height)
    }
    
  }

  displayFaceBox =(box) =>{
    console.log(box);
    this.setState({box: box})
  }
  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit =() =>{
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calcFaceLocation(response)))
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecon box={this.state.box} imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
