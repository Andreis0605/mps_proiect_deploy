function Button() {
  return (
    <div className="css-cc8gqu css-paq0kv" data-name="Button">
      <div aria-hidden="true" className="css-d5mi8 css-ggwoeh css-mj3eej" />
      <div className="css-ag5qze css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Profilul meu</p>
      </div>
    </div>
  );
}

function ItemsVariant() {
  return (
    <div className="css-4k5tmc css-ay2w2u css-paq0kv" data-name="Items/Variant6">
      <div className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Home</p>
      </div>
      <div className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Learning Experience</p>
      </div>
      <div className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Evaluation</p>
      </div>
      <div className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Scoreboard</p>
      </div>
      <Button />
    </div>
  );
}

export default function Navigation() {
  return (
    <div className="css-j9f0op css-vf8mzy" data-name="Navigation">
      <div className="css-8zrmd9 css-9a7aqn css-qxi57b css-yq6o9b">
        <p className="css-8zr56v css-evv1mn">{`Studiul aportului gamificării asupra învățării `}</p>
      </div>
      <ItemsVariant />
    </div>
  );
}