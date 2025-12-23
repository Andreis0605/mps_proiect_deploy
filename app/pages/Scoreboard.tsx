import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserScoreData, getLearningScore, getEvaluationScore, resetUserScore } from "../utils/scoring";
import imgImage81 from "figma:asset/53bb85356d83308bb73f8b96bf550aa931f06596.png";
import imgImage79 from "figma:asset/0656f869c2c0c0886b5a5c8c2f5bf4c4403d7a08.png";
import imgImage80 from "figma:asset/eb63db02129629349fe5bf1aaaa35422a765a436.png";
import imgMedalsShelf from "figma:asset/0451879849b4e6c40f0fa7b77b49970fafc94789.png";
import imgImage83 from "figma:asset/d220c3882aedd95f48af33ed6e97861410b4b2ed.png";
import imgImage85 from "figma:asset/0d9870c88063b8afef47d4f9ef8af9bf7ff7fab4.png";
import imgImage86 from "figma:asset/7b0067514a30f19211d9c38247a4bd5f28a212a9.png";
import imgImage84 from "figma:asset/f98b471f70cc10c545b80d2122224dd32d7fc291.png";
import imgImage87 from "figma:asset/30b20aa5406794b46c03c70837945b1547675a30.png";
import imgImage88 from "figma:asset/6e053afc6cb8b38934cd61cab0a9205ea49ae6f1.png";
import imgImage89 from "figma:asset/7edd4f27a5b514bd8dfecb109fc7af4c09f6422a.png";
import imgImage82 from "figma:asset/5e099cce3ea72e4fff09cb3fc413ab5c8b2126f7.png";
import imgUndrawAwardsFaq64 from "figma:asset/365a87d02fe6a0aee57ae87001538dac2ac5928f.png";
import imgImage22 from "figma:asset/e1449857e7a72b406f9ecd4332dc9aa4f1019084.png";
import imgImage90 from "figma:asset/bc4cfa332870c9fd14e89639736128df0e30a6c2.png";
import imgImage23 from "figma:asset/6094a135621b829395e1e988a58f08b6012fa0ed.png";
import imgImage24 from "figma:asset/3b00b77cc8072feecdb47204b38ae4afa60a7299.png";
import imgImage25 from "figma:asset/1f62929bb79beb77bde2e1fa4d0c9d5df1d0d890.png";
import imgImage26 from "figma:asset/3802262f42521912c2146f8bf437b89fc9a0080e.png";

function Button2() {
  const navigate = useNavigate();
  
  return (
    <div className="css-cc8gqu css-paq0kv" data-name="Button">
      <div aria-hidden="true" className="css-d5mi8 css-ggwoeh css-mj3eej" />
      <div className="css-ag5qze css-vkpzlc css-w2w390">
        <button onClick={() => navigate('/profile')} className="css-9a7aqn css-vkpzlc css-w2w390">
          <p className="css-8zr56v css-evv1mn">Profilul meu</p>
        </button>
      </div>
    </div>
  );
}

function ItemsVariant() {
  const navigate = useNavigate();
  
  return (
    <div className="css-4k5tmc css-ay2w2u css-paq0kv" data-name="Items/Variant6">
      <button onClick={() => navigate('/')} className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Home</p>
      </button>
      <button onClick={() => navigate('/learning-experience')} className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Learning Experience</p>
      </button>
      <button onClick={() => navigate('/evaluation')} className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Evaluation</p>
      </button>
      <button onClick={() => navigate('/scoreboard')} className="css-9a7aqn css-vkpzlc css-w2w390">
        <p className="css-8zr56v css-evv1mn">Scoreboard</p>
      </button>
      <Button2 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="css-bx2utx css-gxdil1 css-roiesn" data-name="Navigation">
      <div className="css-8zrmd9 css-9a7aqn css-qxi57b css-yq6o9b">
        <p className="css-8zr56v css-evv1mn">{`Studiul aportului gamificării asupra învățării `}</p>
      </div>
      <ItemsVariant />
    </div>
  );
}

// Rankings data
const rankingsData = [
  { username: "SuperCoolGirl27", score: 206, avatar: imgImage83 },
  { username: "SuperCoolGuy38", score: 189, avatar: imgImage85 },
  { username: "SuperAwsomeBoy45", score: 176, avatar: imgImage86 },
  { username: "BestPerson86", score: 151, avatar: imgImage84 },
  { username: "WhimsyRed79", score: 107, avatar: imgImage87 },
  { username: "ScoreboardWhisperer67", score: 103, avatar: imgImage88 },
  { username: "OldButGold007", score: 99, avatar: imgImage89 },
];

// Function to get place suffix
function getPlaceSuffix(place: number): string {
  if (place === 1) return "1st Place";
  if (place === 2) return "2nd Place";
  if (place === 3) return "3rd Place";
  return `${place}th Place`;
}

// Function to get place color
function getPlaceColor(place: number): string {
  if (place === 1) return "#6b21a8"; // dark purple
  if (place === 2) return "#9333ea"; // purple
  if (place === 3) return "#a78bfa"; // light purple
  return "#000000"; // black
}

interface RankingCardProps {
  place: number;
  username: string;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
}

function RankingCard({ place, username, score, avatar, isCurrentUser = false }: RankingCardProps) {
  return (
    <div className="bg-gray-100 rounded-2xl p-6 mb-4">
      <div className="flex flex-col gap-4">
        {/* Place and Username */}
        <div className="flex flex-col gap-1">
          <p className="text-3xl" style={{ color: getPlaceColor(place) }}>
            {getPlaceSuffix(place)}
          </p>
          <p className="text-3xl text-gray-800">{username}</p>
        </div>
        
        {/* Score Tile */}
        <div 
          className="rounded-xl p-5 flex items-center justify-between"
          style={{ backgroundColor: isCurrentUser ? '#6DDE37' : '#B7A3D7' }}
        >
          <div className="flex items-center gap-4">
            <img 
              src={avatar} 
              alt={username} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
            <p className="text-lg text-gray-700">Scorul Total</p>
          </div>
          <p className="text-2xl text-black">{score} puncte</p>
        </div>
      </div>
    </div>
  );
}

export default function Scoreboard() {
  const [userData, setUserData] = useState(getUserScoreData());
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(getUserScoreData());
  }, []);

  const totalScore = userData.totalScore;
  const learningScore = getLearningScore();
  const evaluationScore = getEvaluationScore();
  
  // Calculate user's position in rankings
  const currentUser = {
    username: "SuperCoolAvatar",
    score: totalScore,
    avatar: imgImage79
  };
  
  // Merge current user with other rankings and sort
  const allRankings = [...rankingsData, currentUser].sort((a, b) => b.score - a.score);
  
  // Find current user's position (1-indexed)
  const userPosition = allRankings.findIndex(r => r.username === currentUser.username) + 1;
  
  // Get top 8 to display
  const displayedRankings = isExpanded ? allRankings : allRankings.slice(0, 8);
  
  return (
    <div className="w-full">
      {/* Hero Section - Purple Background with Overlay Text */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={imgImage82.src} 
            alt="Celebration" 
            className="max-w-[800px] w-full object-contain opacity-70"
          />
        </div>
        <div className="relative z-10 text-center text-white px-8 max-w-4xl bg-black/40 py-12 rounded-2xl">
          <h1 className="mb-6 text-6xl">Bun venit la secțiunea noastră de Clasament</h1>
          <p className="mb-8 text-2xl opacity-90">Enjoy yourself in our Hall of Fame</p>
        </div>
      </section>

      {/* Section Below Hero - Text and Podium Image with Girl Avatar */}
      <section className="bg-white py-20">
        <div className="text-center px-8 max-w-5xl mx-auto mb-12">
          <h2 className="mb-6 text-6xl">Ești gata să îți vezi premiile?</h2>
          <p className="text-2xl mb-8">Până acum ai fost un adevărat supererou! Hai să vedem cu ce te-ai ales după munca depusă!</p>
          
          <div className="flex justify-center mb-12">
            <button className="bg-black text-white px-12 py-4 rounded-lg text-xl hover:bg-gray-900 transition-colors">
              Check Your Ranking
            </button>
          </div>

          {/* Podium Image with Girl Avatar on Top */}
          <div className="relative max-w-5xl mx-auto">
            <img 
              src={imgImage81.src} 
              alt="Celebration Podium" 
              className="w-full"
            />
            {/* Girl Avatar positioned on podium */}
            <div className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2">
              <img 
                src={imgImage79.src} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Your Special Prizes Header - Light Purple Band */}
      <div className="bg-[#a78bfa] py-10 text-center">
        <p className="text-white text-6xl">Your Special Prizes</p>
      </div>

      {/* Prizes Trophy Image */}
      <div className="bg-white py-12 flex justify-center">
        <img alt="Prizes" className="max-w-4xl w-full" src={imgImage80.src} />
      </div>

      {/* Learning Quest Shelf Header - Light Purple Band */}
      <div className="bg-[#a78bfa] py-10 text-center">
        <p className="text-white text-6xl">This is your Learning Quest Shelf</p>
      </div>

      {/* Medals Shelf Image */}
      <div className="bg-white py-12 flex justify-center">
        <img alt="Medals Shelf" className="max-w-5xl w-full px-8" src={imgMedalsShelf.src} />
      </div>

      {/* User Ranking Header - Light Grey Band */}
      <div className="bg-gray-200 py-10 text-center">
        <p className="text-black text-6xl">Să aflăm unde te clasezi!</p>
      </div>

      {/* Score Calculation Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-10 shadow-lg">
            <h3 className="text-4xl text-center mb-10 text-purple-900">Your Score Breakdown</h3>
            
            <div className="space-y-6">
              {/* Learning Experience Score */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl text-gray-700">Learning Experience</span>
                  <span className="text-3xl text-purple-600">{learningScore} points</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• +10 points for correct answer on first try</p>
                  <p>• +3 points for correct answer on subsequent tries</p>
                </div>
              </div>

              {/* Evaluation Score */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl text-gray-700">Evaluation Tests</span>
                  <span className="text-3xl text-purple-600">{evaluationScore} points</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• +25 points for each correct answer</p>
                </div>
              </div>

              {/* Total Score and Position */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-3xl text-white">Total Score</span>
                  <span className="text-5xl text-white">{totalScore} points</span>
                </div>
                <div className="text-center mt-4 pt-4 border-t border-white/30">
                  <p className="text-2xl text-white">Ești pe locul {userPosition}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Rankings Section */}
      <div className="bg-gray-200 py-10">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-5xl text-black text-center mb-8">User Rankings</h2>
          
          {/* Ranking Cards */}
          <div className="space-y-0">
            {displayedRankings.map((ranking, index) => (
              <RankingCard
                key={ranking.username}
                place={index + 1}
                username={ranking.username}
                score={ranking.score}
                avatar={ranking.avatar.src}
                isCurrentUser={ranking.username === currentUser.username}
              />
            ))}
          </div>

          {/* Expand/Collapse Button */}
          <div className="text-center mt-8">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              {isExpanded ? 'Show Less' : 'Show More Rankings'}
            </button>
          </div>

          {/* Reset Score Button */}
          <div className="text-center mt-4">
            <button 
              onClick={() => {
                resetUserScore();
                setUserData(getUserScoreData());
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Reset My Score to 0
            </button>
          </div>
        </div>
      </div>

      {/* Ready for New Adventure Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
          {/* Image - 1/3 width */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src={imgUndrawAwardsFaq64.src} 
              alt="Awards" 
              className="w-full max-w-sm"
            />
          </div>
          
          {/* Text Content - 2/3 width */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-5xl mb-6">Ești gata să începi o nouă aventura?</h2>

            <div className="flex justify-center md:justify-start">
              <button 
                onClick={() => {
                  navigate('/learning-experience');
                }}
                className="bg-black text-white px-12 py-4 rounded-lg text-xl hover:bg-gray-900 transition-colors"
              >
                Check Out Learning
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Preview Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Uite un mic preview:</h2>
            <p className="text-2xl">Alege-ți un subiect despre care poți studia noțiuni fascinante</p>
          </div>

          {/* Subject Tiles - Preview Only (Scrollable) */}
          <div className="overflow-x-auto">
            <div className="flex gap-6 mb-8 min-w-max px-4">
              {/* Corpul Uman */}
              <div className="flex flex-col items-center p-6 border-4 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all cursor-default bg-white w-[200px] flex-shrink-0">
                <img src={imgImage22.src} alt="Corpul Uman" className="w-24 h-24 mb-3 object-contain rounded-lg" />
                <p className="text-center">Corpul Uman</p>
              </div>

              {/* Animale */}
              <div className="flex flex-col items-center p-6 border-4 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all cursor-default bg-white w-[200px] flex-shrink-0">
                <img src={imgImage90.src} alt="Animale" className="w-24 h-24 mb-3 object-contain rounded-lg" />
                <p className="text-center">Animale</p>
              </div>

              {/* Istorie */}
              <div className="flex flex-col items-center p-6 border-4 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all cursor-default bg-white w-[200px] flex-shrink-0">
                <img src={imgImage23.src} alt="Istorie" className="w-24 h-24 mb-3 object-contain rounded-lg" />
                <p className="text-center">Istorie</p>
              </div>

              {/* Geografie */}
              <div className="flex flex-col items-center p-6 border-4 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all cursor-default bg-white w-[200px] flex-shrink-0">
                <img src={imgImage24.src} alt="Geografie" className="w-24 h-24 mb-3 object-contain rounded-lg" />
                <p className="text-center">Geografie</p>
              </div>

              {/* Oameni celebri */}
              <div className="flex flex-col items-center p-6 border-4 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all cursor-default bg-white w-[200px] flex-shrink-0">
                <img src={imgImage25.src} alt="Oameni celebri" className="w-24 h-24 mb-3 object-contain rounded-lg" />
                <p className="text-center">Oameni celebri</p>
              </div>
            </div>
          </div>

          {/* Preview Note */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-lg italic">
              This is just a preview - tiles are not clickable. Check out subjects in the Learning Experience section!
            </p>
          </div>

          {/* Check Out Learning Button */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => {
                navigate('/learning-experience');
              }}
              className="bg-black text-white px-12 py-4 rounded-lg text-xl hover:bg-gray-900 transition-colors"
            >
              Check Out Learning
            </button>
          </div>
        </div>
      </section>

      {/* Navigation at bottom */}
      <Navigation />
    </div>
  );
}