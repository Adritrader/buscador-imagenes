import React, { Component } from 'react';
import './bootstrap.min.css';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import Imagen from './componentes/Imagen';

class App extends Component {
  
  state = {

    termino : '',
    imagenes : [],
    pagina : ''

  }

  paginaAnterior = () => {

    let pagina = this.state.pagina;
    console.log('anterior...');
    pagina -= 1;
    this.setState({

      pagina

    }, () => {
      this.consultarApi();
    })
  }

  paginaSiguiente = () => {

    let pagina = this.state.pagina;
    pagina += 1;
    console.log('siguiente...');

    this.setState({

      pagina

    }, () => {
      this.consultarApi();
    })

    console.log(pagina);

  }


  consultarApi = () => {

    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=16374016-b1c772fcf655f7fd38b6571d8&q=${termino}&per_page=60&page=${pagina}`;

    console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes : resultado.hits}))


  }

  //Agregar el termino al state

  datosBusqueda = (termino) => {

    this.setState({
      termino : termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })

  } 

  render(){
  return (


    <div className="App container p-5">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Buscador
        datosBusqueda = {this.datosBusqueda} />
        
      </div>

      <div className="row justify-content-center">

      <Resultado 

        imagenes = {this.state.imagenes}
        paginaAnterior = {this.paginaAnterior}
        paginaSiguiente = {this.paginaSiguiente}
      />

      </div>
      
    </div>
  );
  }
}

export default App;
