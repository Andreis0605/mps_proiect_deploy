import imgImage63 from "figma:asset/ff414a1fdb3109c9e39e6ce6c894723816a836c3.png";
import imgImage57 from "figma:asset/c59910491ceb33b38d900a0da77002d76246614f.png";

function PageTitle() {
  return (
    <div className="css-eaglf4 css-i5ewbv css-paq0kv" data-name="Page Title">
      <p className="css-h1i4k8 css-nf5ac4 css-v27th6 css-winw44">Stop!</p>
      <div className="css-34q498 css-v27th6 css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-ydwfk1">Mică pauză de dans ca să te reîncarci</p>
      </div>
    </div>
  );
}

function Copy() {
  return (
    <div className="css-35h9bt css-9touat css-z2qjtq" data-name="Copy">
      <PageTitle />
    </div>
  );
}

export default function Group() {
  return (
    <div className="css-j9f0op css-vf8mzy">
      <div className="css-e5o7l css-roiesn" data-name="image 63">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgImage63.src} />
      </div>
      <div className="css-h5bmvk css-roiesn" data-name="image 57">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgImage57.src} />
      </div>
      <Copy />
    </div>
  );
}