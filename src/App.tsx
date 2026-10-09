import { useScrollDirection } from "./hooks/useScrollDirection";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Certifications } from "./components/Certifications";
import { Projects } from "./components/Projects";
import { Talks } from "./components/Talks";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";

export default function App() {
  const { hidden, showBackToTop } = useScrollDirection();

  return (
    <>
      <Header hidden={hidden} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Talks />
        <Contact />
      </main>
      <Footer />
      <BackToTop visible={showBackToTop} />
    </>
  );
}
