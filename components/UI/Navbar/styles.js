import styled from 'styled-components';

export const NavbarWrapper = styled.nav`
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 0px 0px 24px 2px rgba(138, 143, 153, 0.1);
  margin-bottom: 10px;

  & h1 {
    font-size: 20px;
    color: ${props => props.theme.colors.txtSecondary}
  }
`;

export const NavbarStyled = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
