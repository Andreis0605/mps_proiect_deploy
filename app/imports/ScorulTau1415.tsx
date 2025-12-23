import imgImage79 from "figma:asset/0656f869c2c0c0886b5a5c8c2f5bf4c4403d7a08.png";

function Frame() {
  return (
    <div className="css-paq0kv css-xwptdf">
      <div className="css-ag5qze css-hef06a css-vkpzlc">
        <p className="css-8zr56v css-evv1mn">SuperCoolAvatarName</p>
      </div>
      <div className="css-41x97q css-hi8ivu css-i5hxby css-vkpzlc">
        <p className="css-8zr56v css-ydwgaq">Excelent! Se vede că ai fost pe val — ești aproape la nivelul unui expert.</p>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="css-paq0kv css-sv44kx" data-name="Avatar">
      <div className="css-s0jphi css-yey12b" data-name="image 79">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0 css-yp4jos" src={imgImage79.src} />
      </div>
      <Frame />
    </div>
  );
}

function CustomerQuote() {
  return (
    <div className="css-9p0mdx css-ca39zk css-pav4xk" data-name="Customer Quote">
      <div aria-hidden="true" className="css-38ahru css-f39mm7 css-s3s1qq" />
      <p className="css-59rdls css-hef06a css-nf5ac4 css-yuyv8q">Scorul tău: 14/15</p>
      <Avatar />
    </div>
  );
}

export default function ScorulTau() {
  return (
    <div className="css-j9f0op css-vf8mzy" data-name="Scorul tau:14/15">
      <CustomerQuote />
    </div>
  );
}