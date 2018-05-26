import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Registration from './components/Registration/Registration';
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
      value: 30,
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
      box: {},
      route: 'signin',
      isSignedIn: false
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
  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }



  render() {
    const {isSignedIn, imageURL, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation onRouteChange= {this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecon box={box} imageURL={imageURL}/>
            </div>
          : ( route === 'signin'
                ? <SignIn onRouteChange= {this.onRouteChange}/>
                : <Registration onRouteChange= {this.onRouteChange}/>
            )
 
        }
      </div>
    );
  }
}

export default App;
