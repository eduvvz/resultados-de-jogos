import Navbar from '../components/UI/Navbar';
import puppeteer from 'puppeteer-core';
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
import chromium from 'chrome-aws-lambda';

export default function Home({ championships }) {

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

const isDev = !process.env.AWS_REGION;

export async function getStaticProps() {
  
  const browser = await chromium.puppeteer.launch({
    args: isDev ? [] : chromium.args,
    executablePath:  isDev ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' : await chromium.executablePath,
    headless: isDev ? true : chromium.headless,
  });
  const page = await browser.newPage();
  await page.goto('https://globoesporte.globo.com/agenda/#/todos');
  await page.waitForSelector('.ScoreBoardTeamstyle__TeamInformation-sc-1xsoq6b-1');
  const result = await page.evaluate(() => {
    const championshipsEl = Array.from(document.querySelectorAll('.GroupByChampionshipsstyle__GroupBychampionshipsWrapper-sc-132ht2b-0'));

    const championships = championshipsEl.map(el => {
      const name = el.querySelectorAll('.GroupByChampionshipsstyle__ChampionshipName-sc-132ht2b-2')[0].textContent;

      const gamesEl = Array.from(el.querySelectorAll('.Matchstyle__MatchCard-opmzko-1'));

      const games = gamesEl.map(elgame => {
        const teamsEl = elgame.querySelectorAll('.ScoreBoardTeamstyle__ScoreBoardCard-sc-1xsoq6b-0');
        const headers = elgame.querySelector('.HeaderMatchstyle__HeaderMatchCard-sc-1gdixg6-0').getElementsByTagName('span');

        const gols = [
          teamsEl[0].querySelector('.gols'), 
          teamsEl[1].querySelector('.gols'),
        ];

        return {
          principalTeam: {
            name: teamsEl[0].getElementsByTagName('span')[0].textContent || '',
            img: teamsEl[0].getElementsByTagName('img')[0].src || '',
            gols: gols[0] ? gols[0].textContent : null,
          },
          visitingTeam: {
            name: teamsEl[1].getElementsByTagName('span')[0].textContent || '',
            img: teamsEl[1].getElementsByTagName('img')[0].src || '',
            gols: gols[1] ? gols[1].textContent : null,
          },
          round: elgame.querySelector('.Info-sc-15e0sq8-0').textContent,
          hours: headers.length > 1 ? headers[1].textContent : 'Encerrado',
        };
      });

      return {
        name,
        games,
      };
    })

    return {
      championships,
    };
  });

  return {
    props: {
      ...result,
    },
    revalidate: 300,
  }
}
