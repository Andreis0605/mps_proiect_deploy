function StartLEarning5Quizzes() {
  return (
    <div className="css-61ews6 css-n3x9pb" data-name="Start LEarning 5 Quizzes">
      <div className="css-12q0mb css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Start Learning</p>
      </div>
    </div>
  );
}

function TakeQuizz() {
  return (
    <div className="css-61ews6 css-fjg7ns" data-name="Take Quizz">
      <div className="css-12q0mb css-1td9bt css-vkpzlc">
        <p className="css-8zr56v css-evv1mn">Take Quizz</p>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="css-4k5tox css-6b0y31 css-paq0kv" data-name="Buttons">
      <StartLEarning5Quizzes />
      <TakeQuizz />
    </div>
  );
}

export default function Section() {
  return (
    <div className="css-abp7ij css-j9f0op css-vf8mzy" data-name="Section">
      <Buttons />
      <p className="css-i0el0e css-nt69s4 css-t87whm css-tzn6qh">Corpul Uman</p>
    </div>
  );
}