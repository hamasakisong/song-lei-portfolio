import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteShell } from "../components/layout/SiteShell";
import { PageTransition } from "../components/motion/PageTransition";
import { ReadingProgress } from "../components/motion/ReadingProgress";
import { AboutPage } from "../pages/AboutPage";
import { ExperiencePage } from "../pages/ExperiencePage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProjectPage } from "../pages/ProjectPage";

export function App() {
  const location = useLocation();
  return (
    <SiteShell>
      <ReadingProgress />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </SiteShell>
  );
}
