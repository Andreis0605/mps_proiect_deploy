import imgImage67 from "figma:asset/99aaecd99101d2d33ecab94b79917ab4a8628101.png";

function PageTitle() {
  return (
    <div className="css-eagkq5 css-paq0kv css-v27th6" data-name="Page title">
      <p className="css-1841d8 css-1c29nj css-i5e4w6 css-nf5ac4">Felicitări pentru completarea testului!</p>
    </div>
  );
}

function PageTitle1() {
  return (
    <div className="css-eagkq5 css-paq0kv css-v27th6" data-name="Page title">
      <div className="css-8kbwuc css-i5e4w6 css-s7xhbs css-wc1msa">
        <p className="css-8jchzs css-x78r3n">You hooped through those like a pro!</p>
        <p className="css-1i7a1s css-8jchzs">&nbsp;</p>
        <p className="css-8zr56v css-x78r3n">Haide să aflăm împreună cât de bine te-ai descurcat. Nu uita că poți oricând să descoperi ce medalii și ce loc ai în clasament!</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="css-61ews6 css-n3x9pb" data-name="Button">
      <div className="css-12q0mb css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Check Test Results</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="css-61ews6 css-fjg7ns" data-name="Button">
      <div className="css-12q0mb css-1td9bt css-vkpzlc">
        <p className="css-8zr56v css-evv1mn">Check Scoreboard and Badges</p>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="css-paq0kv css-x2bx0k" data-name="Buttons">
      <Button />
      <Button1 />
    </div>
  );
}

function Copy() {
  return (
    <div className="css-lwcdnr css-paq0kv css-qkk1a6" data-name="Copy">
      <PageTitle />
      <PageTitle1 />
      <Buttons />
    </div>
  );
}

export default function Group() {
  return (
    <div className="css-j9f0op css-vf8mzy">
      <div className="css-hax00h css-jkruq2" data-name="image 67">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-rijs0u css-trglf0" src={imgImage67.src} />
      </div>
      <Copy />
    </div>
  );
}