import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import HomePage from '@/pages/HomePage';
import AutomationTestStrategyPage from '@/pages/services/AutomationTestStrategyPage';
import QualityEngineeringPage from '@/pages/services/QualityEngineeringPage';
import TrainingPage from '@/pages/services/TrainingPage';
import PortfolioPage from '@/pages/PortfolioPage';
import MaturityModelPage from '@/pages/MaturityModelPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import ContactPage from '@/pages/ContactPage';
import AssessmentPage from '@/pages/AssessmentPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/automation-test-strategy" element={<AutomationTestStrategyPage />} />
          <Route path="/services/quality-engineering" element={<QualityEngineeringPage />} />
          <Route path="/services/training" element={<TrainingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/maturity-model" element={<MaturityModelPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
