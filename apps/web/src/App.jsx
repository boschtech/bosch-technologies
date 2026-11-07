import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import HomePage from "@/pages/HomePage";
import AutomationTestStrategyPage from "@/pages/services/AutomationTestStrategyPage";
import QualityEngineeringPage from "@/pages/services/QualityEngineeringPage";
import TrainingPage from "@/pages/services/TrainingPage";
import PortfolioPage from "@/pages/PortfolioPage";
import MaturityModelPage from "@/pages/MaturityModelPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import ContactPage from "@/pages/ContactPage";
import AssessmentPage from "@/pages/AssessmentPage";
import NotFoundPage from "@/pages/NotFoundPage";

const WeconnectuAssessmentReportPage = lazy(
  () => import("@/pages/clients/weconnectu/AssessmentReportPage"),
);
const WeconnectuImprovementEngagementPage = lazy(
  () => import("@/pages/clients/weconnectu/ImprovementEngagementPage"),
);
const WeconnectuAlternativeEngagementPage = lazy(
  () => import("@/pages/clients/weconnectu/AlternativeEngagementPage"),
);
const WeconnectuMaturityAssessmentPage = lazy(
  () => import("@/pages/clients/weconnectu/MaturityAssessmentPage"),
);
const WeconnectuServiceAgreementPage = lazy(
  () => import("@/pages/clients/weconnectu/ServiceAgreementPage"),
);
const ComotionAssessmentReportPage = lazy(
  () => import("@/pages/clients/comotion/AssessmentReportPage"),
);
const ComotionImprovementEngagementPage = lazy(
  () => import("@/pages/clients/comotion/ImprovementEngagementPage"),
);
const ComotionMaturityAssessmentComotionAiPage = lazy(
  () => import("@/pages/clients/comotion/MaturityAssessmentComotionAiPage"),
);
const ComotionMaturityAssessmentSeedAnalyticsPage = lazy(
  () => import("@/pages/clients/comotion/MaturityAssessmentSeedAnalyticsPage"),
);
const ToomuchiwifiProposalPage = lazy(
  () => import("@/pages/clients/toomuchiwifi/ProposalPage"),
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Suspense
          fallback={
            <section className="section" role="status">
              <div className="container">Loading document…</div>
            </section>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/services/automation-test-strategy"
              element={<AutomationTestStrategyPage />}
            />
            <Route
              path="/services/quality-engineering"
              element={<QualityEngineeringPage />}
            />
            <Route path="/services/training" element={<TrainingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/maturity-model" element={<MaturityModelPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route
              path="/clients/weconnectu/"
              element={<WeconnectuAssessmentReportPage />}
            />
            <Route
              path="/clients/weconnectu/improvement-engagement"
              element={<WeconnectuImprovementEngagementPage />}
            />
            <Route
              path="/clients/weconnectu/alternative-engagement"
              element={<WeconnectuAlternativeEngagementPage />}
            />
            <Route
              path="/clients/weconnectu/maturity-assessment"
              element={<WeconnectuMaturityAssessmentPage />}
            />
            <Route
              path="/clients/weconnectu/service-agreement"
              element={<WeconnectuServiceAgreementPage />}
            />
            <Route
              path="/clients/comotion/"
              element={<ComotionAssessmentReportPage />}
            />
            <Route
              path="/clients/comotion/improvement-engagement"
              element={<ComotionImprovementEngagementPage />}
            />
            <Route
              path="/clients/comotion/maturity-assessment-comotion-ai"
              element={<ComotionMaturityAssessmentComotionAiPage />}
            />
            <Route
              path="/clients/comotion/maturity-assessment-seed-analytics"
              element={<ComotionMaturityAssessmentSeedAnalyticsPage />}
            />
            <Route
              path="/clients/toomuchiwifi/"
              element={<ToomuchiwifiProposalPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
