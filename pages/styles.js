import styled from 'styled-components';

export const ChampionshipWrapper = styled.div`
  margin: 20px 0px;

  & > h2 {
    font-size: 18px;
    color: ${props => props.theme.colors.txtPrimary};
    margin-bottom: 7px;
  }
`;


export const MatchesWrapper = styled.div`
  padding: 10px 0px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.light}
`;

export const Match = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 960px) {
    height: 80px;
  }
`;

export const VersusIcon = styled.img`
  width: 25px;
`;

export const TeamInfo = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0px 20px;
  display: flex;
  justify-content: ${props => props.align === 'right' ? 'flex-end' : 'flex-start'};
  align-items: center;

  & span {
    color: ${props => props.theme.colors.txtPrimary};
    font-size: 14px;
    font-weight: 600;
  }

  @media (max-width: 960px) {
    margin: 0px 5px 0px 10px;
  }
`;

export const ImageTeam = styled.img`
  width: 20px;
  margin: 0px 5px;
`;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 20px 0px;
  color: ${props => props.theme.colors.txtPrimary};
`;

export const Score = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 30px;
  margin: 0px 5px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.secondary};
  font-size: 15px;
  font-weight: 600;
`;

export const Label = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translate(0px, -50%);
  color: ${props => {
    if (props.type === 'Agora') {
      return props.theme.colors.txtSecondary;
    }

    if (props.type === 'Encerrado') {
      return props.theme.colors.light;
    }

    return props.theme.colors.txtPrimary;
  }};
  font-size: 13px;
  font-weight: 600;
  padding: 5px 10px;
  background-color: ${props => {
    if (props.type === 'Agora') {
      return props.theme.colors.primary;
    }

    return 'white';
  }};
  border-radius: 7px;

  @media (max-width: 960px) {
    top: 10%;
  }
`;
