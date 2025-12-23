import imgImage80 from "figma:asset/eb63db02129629349fe5bf1aaaa35422a765a436.png";

function PageTitle() {
  return (
    <div className="css-eaglf4 css-paq0kv css-v27th6" data-name="Page Title">
      <div className="css-6adup2 css-oe2prj css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-ydwfk1">Score perfectionsit</p>
      </div>
    </div>
  );
}

function Copy() {
  return (
    <div className="css-4o9181 css-9touat css-z2qjtq" data-name="Copy">
      <PageTitle />
    </div>
  );
}

function Section() {
  return (
    <div className="css-kyoigl css-r0e1hi css-sb7ce7" data-name="Section">
      <p className="css-mbugyp css-nf5ac4 css-ojouul">Your Special Prizes</p>
    </div>
  );
}

function PageTitle1() {
  return <div className="css-kryv54 css-roiesn" data-name="Page Title" />;
}

function PageTitle2() {
  return (
    <div className="css-eaglf4 css-paq0kv css-v27th6" data-name="Page Title">
      <div className="css-6advhh css-oe2prj css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-ydwfk1">Perfect Score in Learning Experience</p>
      </div>
    </div>
  );
}

function Copy1() {
  return (
    <div className="css-9touat css-gcs3ln css-z2qjtq" data-name="Copy">
      <PageTitle2 />
    </div>
  );
}

function PageTitle3() {
  return (
    <div className="css-eaglf4 css-paq0kv css-v27th6" data-name="Page Title">
      <div className="css-6advhh css-oe2prj css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-ydwfk1">Fastest to complete the course</p>
      </div>
    </div>
  );
}

function Copy2() {
  return (
    <div className="css-907wba css-9touat css-z2qjtq" data-name="Copy">
      <PageTitle3 />
    </div>
  );
}

function PageTitle4() {
  return (
    <div className="css-eaglf4 css-paq0kv css-v27th6" data-name="Page Title">
      <div className="css-6advhh css-oe2prj css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-ydwfk1">Highest Scorer</p>
      </div>
    </div>
  );
}

function Copy3() {
  return (
    <div className="css-9touat css-kn7bmi css-z2qjtq" data-name="Copy">
      <PageTitle4 />
    </div>
  );
}

export default function Group() {
  return (
    <div className="css-j9f0op css-vf8mzy">
      <div className="css-8vpr36 css-roiesn" data-name="image 80">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgImage80.src} />
      </div>
      <Copy />
      <Section />
      <PageTitle1 />
      <Copy1 />
      <Copy2 />
      <Copy3 />
    </div>
  );
}