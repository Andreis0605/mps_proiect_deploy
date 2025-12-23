import imgImage15 from "figma:asset/74fa2de4c48197aaf8036fda8b2c250e030e2bfc.png";
import imgAvatarsGamification1 from "figma:asset/15f9fb720b7b193af96aa96c13257c8565fb7801.png";
import imgImage12 from "figma:asset/32fe6349da1aa2a75c237879ac9061a6d1d42d3c.png";
import imgUndrawPlayingCardsYoqo2 from "figma:asset/8d654ea07ecdd3af3351a15d1735e9768387ab02.png";

function Button() {
  return (
    <div className="css-c37l16 css-vc1dd3 css-yfv6j8" data-name="Button">
      <div className="css-b7he7 css-vkpzlc css-w2w390">
        <a className="css-66uohr css-8zr56v css-qq3adi" href="https://www.16personalities.com/">
          Take „16Personality Test”
        </a>
      </div>
    </div>
  );
}

function TakePersonalityTest() {
  return (
    <div className="css-bz2tic css-ut6s3h" data-name="Take personality test">
      <div className="css-roiesn css-smu1tl" data-name="image 15">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgImage15.src} />
      </div>
      <Button />
    </div>
  );
}

function Frame() {
  return (
    <div className="css-20pjnn css-5dba7r css-paq0kv">
      <p className="css-41x97q css-5dba7r css-9mxce6 css-y5kdd3">SuperCoolAvatarName</p>
    </div>
  );
}

function Field() {
  return (
    <div className="css-bbmv0m css-iyqo1d css-rutbm8" data-name="Field">
      <div aria-hidden="true" className="css-d5mi8 css-ggwoeh css-qjy36m" />
      <div className="css-j9f0op css-t8zmbz">
        <div className="css-83y3m5 css-paq0kv css-pnks04">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="css-9xnnd css-paq0kv css-xwptil" data-name="Input">
      <p className="css-hef06a css-nf5ac4 css-v27th6 css-y5kdd3">Numele Avatarului Tău</p>
      <Field />
    </div>
  );
}

function Input1() {
  return (
    <div className="css-9xrdp css-paq0kv css-xwptil" data-name="Input">
      <p className="css-hef06a css-nf5ac4 css-v27th6 css-y5kdd3">Imaginea Avatarului Tău</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="css-1cq9zg css-i5eux2 css-n3x9pb" data-name="Button">
      <div className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Salvează</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="css-9u1aan css-iqrgii css-o74nkv" data-name="Form">
      <Input />
      <Input1 />
      <div className="css-sa5btk css-wc1msa" data-name="avatars-gamification 1">
        <div className="css-phc9f9 css-r0azwh css-trglf0">
          <img alt="" className="css-1fxkee css-trglf0" src={imgAvatarsGamification1.src} />
        </div>
      </div>
      <div className="css-bl02z9 css-wc1msa" data-name="image 12">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgImage12.src} />
      </div>
      <Button1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="css-n3x9pb css-vc1dd3 css-z3ty5k" data-name="Button">
      <div className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Șterge întregul profil și toate datele asociate acestuia</p>
      </div>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="css-9p0mdx css-itjuia css-qpcnvl" data-name="checkbox">
      <p className="css-adgv7d css-nf5ac4 css-pu6bn3">Îmi dau acordul pentru prelucrarea datelor</p>
    </div>
  );
}

function Copy() {
  return (
    <div className="css-luqc9j css-roiesn" data-name="Copy">
      <p className="css-1eiwp6 css-hef06a css-tzn6qh css-yv0yjw">Confidențialitate și protecția datelor tale</p>
      <div className="css-8zrmd9 css-hlpvoj css-qg24bp css-uedbr">
        <p className="css-8jchzs css-ydwgaq">Transparența este esențială pentru noi.</p>
        <p className="css-8zr56v css-ydwgaq">Toate informațiile introduse sunt stocate în format criptat și utilizate exclusiv în scop de cercetare academică.</p>
      </div>
      <div className="css-a7vm5t css-hef06a css-roiesn css-udqxr">
        <p className="css-8jchzs css-rgzjgq">Prin completarea acestui profil, îți exprimi acordul ca datele tale (vârstă, adresă de e-mail, tip de personalitate și activitate în platformă) să fie colectate și analizate în mod anonim pentru studiul privind impactul gamificării asupra procesului de învățare.</p>
        <p className="css-8jchzs css-rgzjgq">&nbsp;</p>
        <p className="css-8jchzs css-rgzjgq">Numele și imaginea avatarului tău vor fi vizibile doar pentru tine, fiind criptate în clasamentele publice. Poți modifica sau șterge aceste date oricând din secțiunea „Profilul meu”.</p>
        <p className="css-vwzf36">
          <span className="css-2wkooz">{`Pentru mai multe detalii, consultă `}</span>
          <a className="css-7jxmij css-8d99fu" href="Page 1">
            <span className="css-7jxmij css-8d99fu">
              Politica de Confidențialitate
            </span>
          </a>
        </p>
      </div>
      <Checkbox />
      <div className="css-5kkvft css-839lek css-bbmv0m" />
      <div className="css-8zrmd9 css-9a7aqn css-9gbcfj css-nx9ho6">
        <p className="css-8zr56v css-evv1mn">✔️</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="css-8bse00 css-bz2tic">
      <Copy />
      <div className="css-mcpfpz css-roiesn" data-name="undraw_playing-cards_yoqo 2">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgUndrawPlayingCardsYoqo2.src} />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="css-eagkq5 css-i5euys css-paq0kv" data-name="Heading">
      <p className="css-8qvbbe css-hef06a css-nf5ac4 css-v27th6">Profilul tău</p>
    </div>
  );
}

function Field1() {
  return (
    <div className="css-bbmv0m css-kirot1 css-w1qwf1" data-name="Field">
      <div aria-hidden="true" className="css-d5mi8 css-ggwoeh css-qjy36m" />
      <div className="css-j9f0op css-t8zmbz">
        <div className="css-83y3m5 css-j9f0op css-paq0kv">
          <p className="css-41x97q css-5dba7r css-9mxce6 css-y5kdd3">20</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="css-3agmah css-paq0kv css-xwptil" data-name="Input">
      <p className="css-hef06a css-nf5ac4 css-v27th6 css-y5kdd3">Vârstă</p>
      <Field1 />
    </div>
  );
}

function Field2() {
  return (
    <div className="css-bbmv0m css-kirot1 css-w1qwf1" data-name="Field">
      <div aria-hidden="true" className="css-d5mi8 css-ggwoeh css-qjy36m" />
      <div className="css-j9f0op css-t8zmbz">
        <div className="css-83y3m5 css-j9f0op css-paq0kv">
          <p className="css-41x97q css-5dba7r css-9mxce6 css-y5kdd3">INTJ</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="css-dfj4rt css-paq0kv css-xwptil" data-name="Input">
      <p className="css-hef06a css-nf5ac4 css-v27th6 css-y5kdd3">Personalitate „16 Personality Test”</p>
      <Field2 />
    </div>
  );
}

function Field3() {
  return (
    <div className="css-bbmv0m css-kirot1 css-w1qwf1" data-name="Field">
      <div aria-hidden="true" className="css-d5mi8 css-ggwoeh css-qjy36m" />
      <div className="css-j9f0op css-t8zmbz">
        <div className="css-83y3m5 css-j9f0op css-paq0kv">
          <p className="css-41x97q css-5dba7r css-9mxce6 css-y5kdd3">email@janesfakedomain.net</p>
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="css-9xn0z css-paq0kv css-xwptil" data-name="Input">
      <p className="css-hef06a css-nf5ac4 css-v27th6 css-y5kdd3">Adresa de Email</p>
      <Field3 />
    </div>
  );
}

function Button3() {
  return (
    <div className="css-5dba7r css-kirot1 css-yp7wse" data-name="Button">
      <div className="css-j9f0op css-n66w2u">
        <div className="css-7cqtwm css-paq0kv css-v27th6">
          <div className="css-9a7aqn css-vkpzlc css-w2w390">
            <p className="css-8zr56v css-evv1mn">Salvează</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormProfilulTau() {
  return (
    <div className="css-3vj1k css-592as4 css-td7pry" data-name="Form profilul tau">
      <Heading />
      <Input2 />
      <Input3 />
      <Input4 />
      <p className="css-9mxce6 css-gclc4x css-w2w390 css-y5kdd3">Adresa de Email</p>
      <Button3 />
    </div>
  );
}

function FormDropdownItem() {
  return (
    <div className="css-5knerd css-bbmv0m css-v27th6" data-name="form/dropdown item">
      <div className="css-gxdil1 css-j9f0op css-t8zmbz">
        <div className="css-i7wq5e css-paq0kv css-v27th6">
          <p className="css-hef06a css-heflh7 css-nf5ac4">INTP</p>
        </div>
      </div>
    </div>
  );
}

function FormDropdownItem1() {
  return (
    <div className="css-5knerd css-bbmv0m css-v27th6" data-name="form/dropdown item">
      <div className="css-gxdil1 css-j9f0op css-t8zmbz">
        <div className="css-i7wq5e css-paq0kv css-v27th6">
          <p className="css-hef06a css-heflh7 css-nf5ac4">INFJ</p>
        </div>
      </div>
    </div>
  );
}

function FormDropdownItem2() {
  return (
    <div className="css-5knerd css-rg9qvx css-v27th6" data-name="form/dropdown item">
      <div className="css-gxdil1 css-j9f0op css-t8zmbz">
        <div className="css-i7wq5e css-paq0kv css-v27th6">
          <p className="css-hef06a css-heflh7 css-nf5ac4">INFP</p>
        </div>
      </div>
    </div>
  );
}

function FormDropdownItem3() {
  return (
    <div className="css-5knerd css-bbmv0m css-v27th6" data-name="form/dropdown item">
      <div className="css-gxdil1 css-j9f0op css-t8zmbz">
        <div className="css-i7wq5e css-paq0kv css-v27th6">
          <p className="css-hef06a css-heflh7 css-nf5ac4">ENTJ</p>
        </div>
      </div>
    </div>
  );
}

function FormDropdownItem4() {
  return (
    <div className="css-5knerd css-bbmv0m css-v27th6" data-name="form/dropdown item">
      <div className="css-gxdil1 css-j9f0op css-t8zmbz">
        <div className="css-i7wq5e css-paq0kv css-v27th6">
          <p className="css-hef06a css-heflh7 css-nf5ac4">ENTP</p>
        </div>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="css-5knerd css-v27th6" data-name="Options">
      <div className="css-2gbjjk css-s1kelq css-v27th6">
        <FormDropdownItem />
        <FormDropdownItem1 />
        <FormDropdownItem2 />
        <FormDropdownItem3 />
        <FormDropdownItem4 />
      </div>
      <div aria-hidden="true" className="css-1c0z3r css-ggwoeh css-s3s1qq" />
    </div>
  );
}

function Dropdown() {
  return (
    <div className="css-54oep2 css-oh1ojj css-tmykfc" data-name="Dropdown">
      <Options />
    </div>
  );
}

function Group1() {
  return (
    <div className="css-7flkqr css-bz2tic">
      <FormProfilulTau />
      <Dropdown />
    </div>
  );
}

function Button4() {
  return (
    <div className="css-9cinb3 css-cc8gqu" data-name="Button">
      <div aria-hidden="true" className="css-d5mi8 css-ggwoeh css-ycw1ez" />
      <div className="css-ag5qze css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Profilul meu</p>
      </div>
    </div>
  );
}

function ItemsVariant() {
  return (
    <div className="css-4k5tmc css-ay2w2u css-paq0kv" data-name="Items/Variant6">
      <div className="css-9a7aqn css-hef06a css-vkpzlc">
        <p className="css-8zr56v css-evv1mn">Home</p>
      </div>
      <div className="css-9a7aqn css-hef06a css-vkpzlc">
        <p className="css-8zr56v css-evv1mn">Learning Experience</p>
      </div>
      <div className="css-9a7aqn css-hef06a css-vkpzlc">
        <p className="css-8zr56v css-evv1mn">Evaluation</p>
      </div>
      <div className="css-9a7aqn css-hef06a css-vkpzlc">
        <p className="css-8zr56v css-evv1mn">Scoreboard</p>
      </div>
      <Button4 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="css-2qhx7s css-gxdil1 css-roiesn" data-name="Navigation">
      <div className="css-8zrmd9 css-9a7aqn css-mjsy7z css-yq6o9b">
        <p className="css-8zr56v css-evv1mn">{`Studiul aportului gamificării asupra învățării `}</p>
      </div>
      <ItemsVariant />
    </div>
  );
}

export default function ProfilConsented() {
  return (
    <div className="css-bbmv0m css-j9f0op css-vf8mzy" data-name="Profil Consented">
      <TakePersonalityTest />
      <Form />
      <Button2 />
      <Group />
      <Group1 />
      <div className="css-lem4j5 css-qnjx5x css-roiesn" data-name="Triangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6">
          <path clipRule="evenodd" d="M6 6L0 0L12 0L6 6Z" fill="var(--fill-0, #3B3B3B)" fillRule="evenodd" id="Triangle" />
        </svg>
      </div>
      <div className="css-qtr5ro css-roiesn" data-name="image 13">
        <div className="css-phc9f9 css-r0azwh css-trglf0">
          <img alt="" className="css-b6ea2j css-trglf0" src={imgImage12.src} />
        </div>
      </div>
      <Navigation />
    </div>
  );
}