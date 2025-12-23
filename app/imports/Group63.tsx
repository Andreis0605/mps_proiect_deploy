import imgUndrawAwardsFaq64 from "figma:asset/365a87d02fe6a0aee57ae87001538dac2ac5928f.png";

function PageTitle() {
  return (
    <div className="css-eagkq5 css-paq0kv css-v27th6" data-name="Page title">
      <p className="css-1841d8 css-1c29nj css-i5e4w6 css-nf5ac4">Ești gata să începi o nouă aventura?</p>
    </div>
  );
}

function PageTitle1() {
  return (
    <div className="css-eagkq5 css-paq0kv css-v27th6" data-name="Page title">
      <div className="css-8kbwuc css-i5e4w6 css-s7xhbs css-wc1msa">
        <p className="css-8jchzs css-x78r3n">Acum că ai câștigat atâtea premii... trebuie să recunoaștem:</p>
        <p className="css-1i7a1s css-8jchzs">&nbsp;</p>
        <p className="css-8jchzs css-x78r3n">Ești ABSOLUT su-uuuuuu-peer!</p>
        <p className="css-1i7a1s css-8jchzs">&nbsp;</p>
        <p className="css-8zr56v css-x78r3n">Nimic nu te poate opri din învățat! Tocmai de aceea, mai avem secțiuni de învătare care ți-ar putea plăcea!</p>
      </div>
    </div>
  );
}

function Copy() {
  return (
    <div className="css-lykolc css-paq0kv css-qxh4rn" data-name="Copy">
      <PageTitle />
      <PageTitle1 />
      <div className="css-61ews6 css-n3x9pb" data-name="Button">
        <div className="css-12q0mb css-vkpzlc css-w2w390">
          <p className="css-8zr56v css-evv1mn">{`Check Out Learning `}</p>
        </div>
      </div>
    </div>
  );
}

export default function Group() {
  return (
    <div className="css-j9f0op css-vf8mzy">
      <div className="css-ljokv8 css-roiesn" data-name="undraw_awards_faq6 4">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgUndrawAwardsFaq64.src} />
      </div>
      <Copy />
    </div>
  );
}