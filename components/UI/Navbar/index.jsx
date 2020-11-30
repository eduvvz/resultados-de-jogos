import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { NavbarWrapper, NavbarStyled } from './styles';

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Container>
        <Row>
          <Col>
            <NavbarStyled>
              <h1>Resultados de jogos</h1>
            </NavbarStyled>
          </Col>
        </Row>
      </Container>
    </NavbarWrapper>
  );
}

export default Navbar;
