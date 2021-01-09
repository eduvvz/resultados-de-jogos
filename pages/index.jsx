import Navbar from '../components/UI/Navbar';
import { 
  ChampionshipWrapper, 
  Match, 
  MatchesWrapper, 
  VersusIcon, 
  TeamInfo, 
  ImageTeam,
  Description,
  Score,
  Label,
} from './styles';
import { Container, Row, Col } from 'react-grid-system';
import Axios from 'axios';

export default function Home({ championships = [] }) {

  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col sm={12}>
            <Description>
              Saiba quem joga hoje nos principais campeonatos no mundo. Campeonatos como Premier Legue, Brasileirão Serie A, Brasileirão Serie B, LaLiga e Campeonato Italiano entre outros. Se mantenha atualizado com a gente!
            </Description>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {championships.map((champ, i) => {
            return (
              <Col sm={12} key={i}>
                <ChampionshipWrapper>
                  <h2>{champ.name}</h2>
                  <MatchesWrapper>
                    {champ.games.map((match, i) => {
                      let label = '';

                      if (match.hours === 'Veja como foi' || match.hours === 'Encerrado') {
                        label = 'Encerrado'
                      }

                      if (match.hours === 'AO VIVO' || match.hours === 'TEMPO REAL') {
                        label = 'Agora'
                      }

                      return (
                        <Match key={i}>
                          <Label type={label || match.hours}>{label || match.hours}</Label>
                          <TeamInfo align="right">
                            <ImageTeam src={match.principalTeam.img} />
                            <span>
                              {match.principalTeam.name}
                            </span>
                            <Score>{match.principalTeam.gols || 0}</Score>
                          </TeamInfo>

                          <VersusIcon src="/img/vs-icon.webp" alt="Versus icon" />
                          
                          <TeamInfo>
                            <Score>{match.visitingTeam.gols || 0}</Score>
                            <span>
                              {match.visitingTeam.name}
                            </span>
                            <ImageTeam src={match.visitingTeam.img} />
                          </TeamInfo>
                        </Match>
                      );
                    })}
                  </MatchesWrapper>
                </ChampionshipWrapper>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  let result;

  try {
    const res = await Axios.get('https://us-central1-api-resultados-de-hoje.cloudfunctions.net/getGames');
    result = res.data;
  } catch (error) {
    console.log(error.response);
  }
 
  return {
    props: {
      ...result || {},
    },
    revalidate: 3000,
  }
}
