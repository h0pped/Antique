import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from './navbar/NavBar'
import Title from './title/Title';
import Footer from './Footer/Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Title/>
        <NavBar/>
        <Container>
          {this.props.children}
        </Container>
        <Footer/>
      </div>
    );
  }
}
