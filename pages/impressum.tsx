import Layout from "../components/layout";
import Container from "../components/container";
import Head from "next/head";
import Header from "../components/header";

type Props = {};

const About = (props: Props) => {
  return (
    <Layout>
      <Container>
        <Header />
        <Head>
          <title>Impressum</title>
        </Head>
        <div className="md:max-w-4xl mx-auto text-gray-800 mt-12 sm:mb-8">
          <style jsx>{`
            h1,
            h2,
            h3 {
              font-weight: 700;
            }
            h1 {
              margin-bottom: 0.5rem;
            }
            h1 {
              font-size: 1.5rem;
              line-height: 2rem;
            }
            h2 {
              margin-top: 1rem;
              font-size: 1.25rem;
              line-height: 1.75rem;
            }
            h3 {
              margin-top: 0.5rem;
            }
          `}</style>
          <h1>Impressum</h1>
          <p>
            Nils Siegfried
            <br />
            Theodor-Heuss-Allee 2<br />
            60486 Frankfurt am Main
            <br />
            <a href="mailto:nils@nilssiegfried.de">nils@nilssiegfried.de</a>
          </p>
          <h2>Disclaimer - rechtliche Hinweise</h2>
          <h3>Auskunfts- und Widerrufsrecht</h3>
          <p>
            Sie haben jederzeit das Recht, sich unentgeltlich und
            unverz&#252;glich &#252;ber die zu Ihrer Person erhobenen Daten zu
            erkundigen. Ebenfalls k&#246;nnen Sie Ihre Zustimmung zur Verwendung
            Ihrer angegebenen pers&#246;nlichen Daten mit Wirkung f&#252;r die
            Zukunft widerrufen. Hierf&#252;r wenden Sie sich bitte an den im
            Impressum angegebenen Diensteanbieter.
          </p>
          <p>
            <h3>Datenschutz (allgemein)</h3>
          </p>
          <p>
            Beim Zugriff auf unsere Webseite werden automatisch allgemeine
            Informationen (sog. Server-Logfiles) erfasst. Diese beinhalten u.a.
            den von Ihnen verwendeten Webbrowser sowie Ihr Betriebssystem und
            Ihren Internet Service Provider. Diese Daten lassen keinerlei
            R&#252;ckschl&#252;sse auf Ihre Person zu und werden von uns
            statistisch ausgewertet, um unseren Internetauftritt technisch und
            inhaltlich zu verbessern. Das Erfassen dieser Informationen ist
            notwendig, um den Inhalt der Webseite korrekt ausliefern zu
            k&#246;nnen.
          </p>
          <p>
            Die Nutzung der Webseite ist grunds&#228;tzlich ohne Angabe
            personenbezogener Daten m&#246;glich. Soweit personenbezogene Daten
            (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben
            werden, erfolgt dies, soweit m&#246;glich, stets auf freiwilliger
            Basis. Diese Daten werden ohne Ihre ausdr&#252;ckliche Zustimmung
            nicht an Dritte weitergegeben.
          </p>
          <p>
            Sofern ein Vertragsverh&#228;ltnis begr&#252;ndet, inhaltlich
            ausgestaltet oder ge&#228;ndert werden soll oder Sie an uns eine
            Anfrage stellen, erheben und verwenden wir personenbezogene Daten
            von Ihnen, soweit dies zu diesem Zwecke erforderlich ist
            (Bestandsdaten). Wir erheben, verarbeiten und nutzen
            personenbezogene Daten soweit dies erforderlich ist, um Ihnen die
            Inanspruchnahme des Webangebots zu erm&#246;glichen (Nutzungsdaten).
            S&#228;mtliche personenbezogenen Daten werden nur solange
            gespeichert wie dies f&#252;r den genannten Zweck (Bearbeitung Ihrer
            Anfrage oder Abwicklung eines Vertrags) erforderlich ist. Hierbei
            werden steuer- und handelsrechtliche Aufbewahrungsfristen von uns
            ber&#252;cksichtigt. Auf Anordnung der zust&#228;ndigen Stellen
            m&#252;ssen wir im Einzelfall Auskunft &#252;ber diese Daten
            (Bestandsdaten) erteilen, soweit dies f&#252;r Zwecke der
            Strafverfolgung, zur Gefahrenabwehr, zur Erf&#252;llung der
            gesetzlichen Aufgaben der Verfassungsschutzbeh&#246;rden oder des
            Milit&#228;rischen Abschirmdienstes oder zur Durchsetzung der Rechte
            am geistigen Eigentum erforderlich ist.
          </p>
          <p>
            Wir weisen ausdr&#252;cklich darauf hin, dass die
            Daten&#252;bertragung im Internet (z. B. bei der Kommunikation per
            E-Mail) Sicherheitsl&#252;cken aufweisen kann. Vor dem Zugriff auf
            Daten kann nicht l&#252;ckenlos gesch&#252;tzt werden.
          </p>
          <p>
            Die Nutzung von im Rahmen der Impressumspflicht
            ver&#246;ffentlichten Kontaktdaten durch Dritte zur &#220;bersendung
            von nicht ausdr&#252;cklich angeforderter Werbung und
            Informationsmaterialien wird hiermit ausdr&#252;cklich untersagt.
            Ausgenommen hiervon sind bestehende Gesch&#228;ftsbeziehungen bzw.
            es liegt Ihnen eine entsprechende Einwilligung von uns vor.
          </p>
          <p>
            Die Anbieter und alle auf dieser Website genannten Dritten behalten
            sich ausdr&#252;cklich rechtliche Schritte im Falle der unverlangten
            Zusendung von Werbeinformationen vor. Gleiches gilt f&#252;r die
            kommerzielle Verwendung und Weitergabe der Daten.
          </p>
          <p>&nbsp;</p>
          <p>
            <h2>Disclaimer (Haftungsausschluss)</h2>
          </p>
          <p>
            <h3>1. Haftung f&#252;r Inhalte</h3>
          </p>
          <p>
            Als Diensteanbieter sind wir gem&#228;&#223; &#167; 7 Abs. 1 TMG
            f&#252;r eigene Inhalte auf diesen Seiten nach den allgemeinen
            Gesetzen verantwortlich. Nach &#167;&#167; 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, &#252;bermittelte oder
            gespeicherte fremde Informationen zu &#252;berwachen oder nach
            Umst&#228;nden zu forschen, die auf eine rechtswidrige
            T&#228;tigkeit hinweisen. Verpflichtungen zur Entfernung oder
            Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
            bleiben hiervon unber&#252;hrt. Eine diesbez&#252;gliche Haftung ist
            jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung m&#246;glich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
          <p>
            <h3>2. Haftung f&#252;r Links</h3>
          </p>
          <p>
            Diese Website enth&#228;lt Links zu externen Webseiten Dritter, auf
            deren Inhalte kein Einfluss genommen werden kann. Deshalb kann
            f&#252;r diese fremden Inhalte auch keine Gew&#228;hr
            &#252;bernommen werden. F&#252;r die Inhalte der verlinkten Seiten
            ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
            Verlinkung auf m&#246;gliche Rechtsverst&#246;&#223;e
            &#252;berpr&#252;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der
            Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle
            der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
            Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
            Rechtsverletzungen werden derartige Links umgehend von dieser
            Website auf die rechtsverletzende Site entfernen.
          </p>
          <p>
            <h3>3. Urheberrecht</h3>
          </p>
          <p>
            Die durch die Diensteanbieter, deren Mitarbeiter und beauftragte
            Dritte erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Vervielf&#228;ltigung, Bearbeitung,
            Verbreitung und jede Art der Verwertung au&#223;erhalb der Grenzen
            des Urheberrechtes bed&#252;rfen der vorherigen schriftlichen
            Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und
            Kopien dieser Seite sind nur f&#252;r den privaten, nicht
            kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
            Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werden derartige Inhalte umgehend entfernen.
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default About;
