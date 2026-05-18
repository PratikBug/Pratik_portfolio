import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { PageTransition } from '@/components/PageTransition'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollingNameBackdrop } from '@/components/ScrollingNameBackdrop'
import { HeroSection } from '@/sections/HeroSection'
import { TechLogosSection } from '@/sections/TechLogosSection'
import { AboutSection } from '@/sections/AboutSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { ContactSection } from '@/sections/ContactSection'

function HomePage() {
  return (
    <>
      <ScrollingNameBackdrop />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white ring-offset-2 transition focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <TechLogosSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  )
}

function RoutedHome() {
  return (
    <PageTransition>
      <HomePage />
    </PageTransition>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoutedHome />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
