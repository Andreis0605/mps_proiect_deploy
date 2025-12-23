import imgImage79 from "figma:asset/0656f869c2c0c0886b5a5c8c2f5bf4c4403d7a08.png";
import imgImage81 from "figma:asset/53bb85356d83308bb73f8b96bf550aa931f06596.png";

function PageTitle() {
  return (
    <div className="css-eagkq5 css-paq0kv css-v27th6" data-name="Page title">
      <p className="css-1841d8 css-1c29nj css-i5e4w6 css-nf5ac4">Ești gata să îți vezi premiile?</p>
    </div>
  );
}

function PageTitle1() {
  return (
    <div className="css-eagkq5 css-paq0kv css-v27th6" data-name="Page title">
      <p className="css-ffi56e css-i5e4w6 css-nf5ac4 css-s7xhbs">Până acum ai fost un adevărat supererou! Hai să vedem cu ce te-ai ales după munca depusă!</p>
    </div>
  );
}

function Button() {
  return (
    <div className="css-61ews6 css-n3x9pb" data-name="Button">
      <div className="css-12q0mb css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Check Your Ranking</p>
      </div>
    </div>
  );
}

function Copy() {
  return (
    <div className="css-lykolc css-paq0kv css-rom19t" data-name="Copy">
      <PageTitle />
      <PageTitle1 />
      <Button />
    </div>
  );
}

export default function Group() {
  return (
    <div className="css-j9f0op css-vf8mzy">
      <div className="css-b188o0 css-cnkvt" data-name="image 79">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0 css-yp4jos" src={imgImage79.src} />
      </div>
      <div className="css-6t3u6f css-vqee5o" data-name="image 81">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0 css-wru3is" src={imgImage81.src} />
      </div>
      <Copy />
    </div>
  );
}