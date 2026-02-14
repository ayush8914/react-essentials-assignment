import { useState } from 'react';
import './PortfolioCard.css';
import Footer from './Footer';
import Skills from './Skills';
import Bio from './Bio';
import Header from './Header';
import ToogleTheme from './ToogleTheme';


const profiles = [
  {
    id: 1,
    name: "Ayush – Product Designer",
    role: "UI/UX • Design Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", // or your own URL
    bio: "I craft thoughtful design systems and accessible interfaces. Obsessed with micro-interactions, prototyping in code, and closing the gap between design & engineering.",
    skills: ["Design Systems", "Figma", "Prototyping", "Accessibility", "Design Tokens", "Motion Design"]
  },
  {
    id: 2,
    name: "Ayush – Frontend Engineer",
    role: "React • TypeScript",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop",
    bio: "Building fast, maintainable and delightful web experiences. Strong focus on component architecture, performance and developer experience.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Zustand", "React Query", "Testing (Vitest)"]
  },
  {
    id: 3,
    name: "Ayush – Design + Code Hybrid",
    role: "Bridging Design & Dev",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    bio: "I speak both languages — pixel-perfect design and clean, typed code. Love turning designer dreams into production-ready components.",
    skills: ["React", "Figma", "Storybook", "Framer Motion", "Design Systems", "Accessibility", "Component Libraries"]
  },
  {
    id: 4,
    name: "Ayush – Side Project Mode",
    role: "Indie Maker",
    avatar: "/avatar.jpg",
    bio: "Late-night experiments, tiny tools, silly apps and occasional useful things. Currently hacking on something I can't talk about yet 😉",
    skills: ["React", "Supabase", "Vercel", "Three.js", "Framer", "Silly Ideas", "Coffee"]
  }
];

function PortfolioCard() {
  const [isDark, setIsDark] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(128);
  const [page, setPage] = useState(1); // 1..4

  const currentIndex = page - 1;
  const currentProfile = profiles[currentIndex];

  const toggleDark = () => setIsDark(!isDark);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const nextPage = () => {
    setPage((prev) => (prev % 4) + 1);
  };

  const prevPage = () => {
    setPage((prev) => (prev === 1 ? 4 : prev - 1));
  };

  return (
    <>
      <div className="PortfolioCard">
        <div className="Toogle-button">
          <ToogleTheme isDark={isDark} toggleDark={toggleDark} />
        </div>

        <div className={`PortfolioCard-container ${isDark ? "dark" : "light"}`}>
          <div className={`Card ${isDark ? "dark" : "light"}`}>
            <Header
              name={currentProfile.name}
              role={currentProfile.role}
              avatar={currentProfile.avatar}
            />

            <Bio bio={currentProfile.bio} />

            <Skills skills={currentProfile.skills} isDark={isDark} />

            <Footer
              isDark={isDark}
              toggleDark={toggleDark}
              isLiked={isLiked}
              toggleLike={toggleLike}
              likes={likes}
              page={page}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PortfolioCard;