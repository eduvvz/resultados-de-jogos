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
`;

export const ImageTeam = styled.img`
  width: 20px;
  margin: 0px 5px;
`;
