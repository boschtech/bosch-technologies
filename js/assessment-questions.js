/* ============================================
   BOSCH TECHNOLOGIES — Assessment Questions
   5 Dimensions × 4 Questions = 20 Total
   Each answer scores 1–5
   ============================================ */

const ASSESSMENT_DIMENSIONS = [
  {
    id: 'process',
    title: 'Test Process & Governance',
    description: 'How structured and repeatable are your testing activities?',
    icon: '📋',
    questions: [
      {
        id: 'p1',
        text: 'How are test cases currently managed in your organisation?',
        options: [
          { value: 1, label: 'No formal test cases. Testing is ad hoc and untracked' },
          { value: 2, label: 'Test cases exist in spreadsheets or documents but are rarely updated' },
          { value: 3, label: 'We use a test management tool with organised test suites' },
          { value: 4, label: 'Test cases are version-controlled, reviewed, and linked to requirements' },
          { value: 5, label: 'Tests are auto-generated from requirements/BDD specs and continuously refined' }
        ]
      },
      {
        id: 'p2',
        text: 'How is your test planning and strategy defined?',
        options: [
          { value: 1, label: 'No test plan. We test whatever seems important before release' },
          { value: 2, label: 'Basic test plans exist but are not consistently followed' },
          { value: 3, label: 'Test strategy is documented and aligned with the SDLC' },
          { value: 4, label: 'Risk-based test strategy with clear entry/exit criteria per phase' },
          { value: 5, label: 'Adaptive strategy that evolves with each sprint, driven by data and risk analysis' }
        ]
      },
      {
        id: 'p3',
        text: 'How do you handle defect management?',
        options: [
          { value: 1, label: 'Defects are communicated verbally or via chat. No formal tracking' },
          { value: 2, label: 'Defects are logged in a tool but triage/prioritisation is inconsistent' },
          { value: 3, label: 'Structured defect workflow with severity, priority, and assignment' },
          { value: 4, label: 'Defects are tracked with SLAs, root cause analysis, and trend reporting' },
          { value: 5, label: 'Predictive defect analysis with automated classification and prevention strategies' }
        ]
      },
      {
        id: 'p4',
        text: 'How often are testing processes reviewed and improved?',
        options: [
          { value: 1, label: 'Never. We have always done it this way' },
          { value: 2, label: 'Occasionally. Usually after a major incident' },
          { value: 3, label: 'Retrospectives include testing improvements each quarter' },
          { value: 4, label: 'Regular process audits with measurable improvement targets' },
          { value: 5, label: 'Continuous improvement culture with experimentation and A/B testing of processes' }
        ]
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation Coverage & Effectiveness',
    description: 'What proportion of your tests are automated, and how reliable are they?',
    icon: '⚙️',
    questions: [
      {
        id: 'a1',
        text: 'What percentage of your regression tests are automated?',
        options: [
          { value: 1, label: '0–10% — almost everything is manual' },
          { value: 2, label: '10–30% — some critical paths are automated' },
          { value: 3, label: '30–60% — a solid automation suite exists' },
          { value: 4, label: '60–85% — most regression is automated with targeted manual testing' },
          { value: 5, label: '85%+ — comprehensive automation with manual testing only for exploratory/UX' }
        ]
      },
      {
        id: 'a2',
        text: 'How reliable are your automated tests?',
        options: [
          { value: 1, label: 'Very flaky. Tests fail randomly and are often ignored' },
          { value: 2, label: 'Some flakiness. Team spends significant time investigating false failures' },
          { value: 3, label: 'Mostly stable. Flaky tests are identified and quarantined' },
          { value: 4, label: 'Highly reliable. Less than 2% flake rate with automated retry logic' },
          { value: 5, label: 'Self-healing tests with auto-detection and resolution of common failures' }
        ]
      },
      {
        id: 'a3',
        text: 'What is your test automation framework architecture?',
        options: [
          { value: 1, label: 'No framework. Scripts are written ad hoc with no structure' },
          { value: 2, label: 'Basic scripts using a single tool (e.g., Selenium) with limited reuse' },
          { value: 3, label: 'Page Object Model or similar pattern with shared utilities' },
          { value: 4, label: 'Layered framework with data-driven tests, reporting, and parallel execution' },
          { value: 5, label: 'Modular, multi-layer framework supporting API, UI, mobile with plug-in architecture' }
        ]
      },
      {
        id: 'a4',
        text: 'How are automated tests maintained when the application changes?',
        options: [
          { value: 1, label: 'Tests frequently break and are abandoned or rewritten from scratch' },
          { value: 2, label: 'Developers/QAs fix tests reactively after builds fail' },
          { value: 3, label: 'Test maintenance is part of the sprint. Locators and assertions are updated promptly' },
          { value: 4, label: 'Tests use resilient selectors and abstraction layers. Maintenance cost is low' },
          { value: 5, label: 'AI-assisted test maintenance with visual regression and automatic locator healing' }
        ]
      }
    ]
  },
  {
    id: 'tooling',
    title: 'Tooling & Infrastructure',
    description: 'How well integrated are your tools, CI/CD pipelines, and test environments?',
    icon: '🔧',
    questions: [
      {
        id: 't1',
        text: 'How are automated tests integrated with your CI/CD pipeline?',
        options: [
          { value: 1, label: 'Tests are run manually. No CI/CD integration' },
          { value: 2, label: 'Some tests run in CI but are not blocking. Failures are often ignored' },
          { value: 3, label: 'Tests run on every PR/merge and block deployment on failure' },
          { value: 4, label: 'Multi-stage pipeline: unit → integration → E2E with quality gates' },
          { value: 5, label: 'Fully automated deployment pipeline with canary releases and automated rollback on test failure' }
        ]
      },
      {
        id: 't2',
        text: 'How do you manage test environments?',
        options: [
          { value: 1, label: 'Shared dev environment. No dedicated test environment' },
          { value: 2, label: 'Dedicated test environment but often broken or out of date' },
          { value: 3, label: 'Stable test environments with regular data refreshes' },
          { value: 4, label: 'On-demand environments spun up via containers (Docker/K8s)' },
          { value: 5, label: 'Ephemeral, production-mirrored environments created per PR with synthetic data' }
        ]
      },
      {
        id: 't3',
        text: 'What testing tools do you currently use? (Select the closest match)',
        options: [
          { value: 1, label: 'Manual testing only. No automation tools' },
          { value: 2, label: 'One automation tool (e.g., Selenium) with basic setup' },
          { value: 3, label: 'Multiple tools covering UI, API, and performance testing' },
          { value: 4, label: 'Integrated toolchain with test management, automation, and reporting' },
          { value: 5, label: 'Best-in-class toolchain with AI test generation, visual testing, and observability' }
        ]
      },
      {
        id: 't4',
        text: 'How do you handle test data management?',
        options: [
          { value: 1, label: 'Hard-coded test data in scripts. Breaks frequently' },
          { value: 2, label: 'Some external data files (CSV/JSON) but not systematically managed' },
          { value: 3, label: 'Centralised test data repository with environment-specific configurations' },
          { value: 4, label: 'Dynamic test data generation with factories/builders and cleanup routines' },
          { value: 5, label: 'Synthetic data platform with production-like data masking and on-demand provisioning' }
        ]
      }
    ]
  },
  {
    id: 'reporting',
    title: 'Reporting & Observability',
    description: 'How effectively do you measure, report, and act on quality metrics?',
    icon: '📊',
    questions: [
      {
        id: 'r1',
        text: 'How do you report test results?',
        options: [
          { value: 1, label: 'No formal reporting. Results are in console logs or verbal updates' },
          { value: 2, label: 'Basic pass/fail reports shared manually after test runs' },
          { value: 3, label: 'Automated HTML/dashboard reports generated after each run' },
          { value: 4, label: 'Real-time dashboards with historical trends, flakiness tracking, and drill-downs' },
          { value: 5, label: 'AI-powered analytics with failure pattern recognition and predictive quality insights' }
        ]
      },
      {
        id: 'r2',
        text: 'Do you track test coverage and quality metrics?',
        options: [
          { value: 1, label: 'No. We don\'t measure coverage or quality metrics' },
          { value: 2, label: 'Code coverage is measured but not acted upon' },
          { value: 3, label: 'Coverage targets exist for unit and integration tests' },
          { value: 4, label: 'Multi-dimensional coverage (code, requirement, risk) tracked and enforced' },
          { value: 5, label: 'Coverage intelligence: only impacted tests run, with mutation testing for quality assurance' }
        ]
      },
      {
        id: 'r3',
        text: 'How is traceability between requirements and tests managed?',
        options: [
          { value: 1, label: 'No traceability. No link between requirements and test cases' },
          { value: 2, label: 'Informal traceability via naming conventions or manual mapping' },
          { value: 3, label: 'Requirements linked to test cases in a management tool' },
          { value: 4, label: 'Bi-directional traceability with gap analysis and impact assessment' },
          { value: 5, label: 'Automated traceability with living documentation and real-time requirement coverage' }
        ]
      },
      {
        id: 'r4',
        text: 'How quickly can you identify the root cause of a test failure?',
        options: [
          { value: 1, label: 'Hours to days. Requires manual investigation every time' },
          { value: 2, label: 'Within an hour. With some log analysis and debugging' },
          { value: 3, label: 'Within minutes. Good logging, screenshots, and error categorisation' },
          { value: 4, label: 'Near-instant. Failures include full context: logs, video, network traces' },
          { value: 5, label: 'Automated root cause analysis with AI-assisted triage and suggested fixes' }
        ]
      }
    ]
  },
  {
    id: 'culture',
    title: 'Team Skills & Culture',
    description: 'How does your team approach quality ownership, skills development, and collaboration?',
    icon: '👥',
    questions: [
      {
        id: 'c1',
        text: 'Who is responsible for quality in your team?',
        options: [
          { value: 1, label: 'A separate QA team that tests after development is "done"' },
          { value: 2, label: 'QA is embedded in the team but developers don\'t write tests' },
          { value: 3, label: 'Developers write unit tests; QA handles integration and E2E' },
          { value: 4, label: 'Shared quality ownership. Developers and QA collaborate on all test levels' },
          { value: 5, label: 'Quality is everyone\'s responsibility. "Shift everywhere" with quality coaches' }
        ]
      },
      {
        id: 'c2',
        text: 'What is the automation skill level of your testing team?',
        options: [
          { value: 1, label: 'No automation skills. Purely manual testers' },
          { value: 2, label: 'Basic scripting ability. Can modify existing tests' },
          { value: 3, label: 'Competent. Can build and maintain automation frameworks' },
          { value: 4, label: 'Advanced. Experienced in multiple tools, CI/CD, and test architecture' },
          { value: 5, label: 'Expert. Contributing to open-source, building custom tools, mentoring others' }
        ]
      },
      {
        id: 'c3',
        text: 'How is testing knowledge shared and developed?',
        options: [
          { value: 1, label: 'No formal training or knowledge sharing' },
          { value: 2, label: 'Occasional workshops or conferences' },
          { value: 3, label: 'Regular internal training sessions and documentation' },
          { value: 4, label: 'Structured learning paths, certifications, and mentoring programmes' },
          { value: 5, label: 'Community of practice with innovation time, internal tech talks, and R&D' }
        ]
      },
      {
        id: 'c4',
        text: 'How early is testing involved in the development lifecycle?',
        options: [
          { value: 1, label: 'Only at the end. Testing is a phase after coding is complete' },
          { value: 2, label: 'Testers review requirements but don\'t participate in design' },
          { value: 3, label: 'Testers participate in sprint planning and write test cases before development' },
          { value: 4, label: 'Shift-left: TDD/BDD practiced, testers involved from story refinement' },
          { value: 5, label: 'Shift-everywhere: testing informs architecture, monitoring, and production observability' }
        ]
      }
    ]
  }
];

// --- Recommendations per dimension per level ---
const RECOMMENDATIONS = {
  process: {
    1: 'Start by establishing a basic test plan template and defect tracking tool. Define what "done" means for testing on each feature.',
    2: 'Standardise your test case format and introduce a lightweight test management tool. Begin tracking defect metrics.',
    3: 'Implement risk-based testing to focus effort where it matters most. Introduce entry/exit criteria for each test phase.',
    4: 'Establish process KPIs and conduct regular audits. Use defect trend analysis to drive prevention strategies.',
    5: 'You have a mature process. Focus on continuous experimentation. Try new approaches and measure their impact on quality.'
  },
  automation: {
    1: 'Begin with automating your most critical smoke tests. Choose a modern framework (Playwright or Cypress) and start small.',
    2: 'Expand automation to cover your top 20 regression scenarios. Adopt Page Object Model for maintainability.',
    3: 'Focus on reducing flakiness and increasing parallel execution. Add API-level automation to complement UI tests.',
    4: 'Optimise execution speed with test selection intelligence. Explore visual regression and contract testing.',
    5: 'You have excellent coverage. Explore AI-assisted test generation and self-healing capabilities to further reduce maintenance.'
  },
  tooling: {
    1: 'Set up a basic CI pipeline (GitHub Actions or Jenkins) and run at least smoke tests on every commit.',
    2: 'Make test results a blocking gate in your pipeline. Introduce Docker for consistent test environments.',
    3: 'Implement multi-stage pipelines with unit, integration, and E2E stages. Centralise test data management.',
    4: 'Move to ephemeral environments per PR. Implement synthetic test data generation and production-like staging.',
    5: 'Your infrastructure is mature. Consider canary testing, chaos engineering, and AI-powered test environment provisioning.'
  },
  reporting: {
    1: 'Start with automated test reports (e.g., Allure or ExtentReports). Make results visible to the whole team.',
    2: 'Set up a dashboard showing pass rates, flakiness trends, and coverage. Track these metrics over time.',
    3: 'Implement requirement-to-test traceability. Add screenshots and logs to failure reports for faster debugging.',
    4: 'Introduce quality gates based on metrics. Use trend analysis to predict and prevent quality regressions.',
    5: 'Explore AI-powered root cause analysis and predictive quality analytics to proactively address potential failures.'
  },
  culture: {
    1: 'Start embedding testers within development squads. Encourage developers to write unit tests with code reviews.',
    2: 'Introduce pair testing sessions. Provide basic automation training for manual testers.',
    3: 'Implement a testing community of practice. Begin TDD/BDD adoption with willing teams as pilots.',
    4: 'Create structured learning paths and mentoring programmes. Share quality metrics in team retrospectives.',
    5: 'Foster innovation with dedicated time for tool evaluation and process experiments. Mentor other teams in the organisation.'
  }
};

// --- Level names and descriptions ---
const MATURITY_LEVELS = {
  1: { name: 'Initial', tagline: 'Ad hoc and reactive. Significant room for improvement', color: '#c0392b' },
  2: { name: 'Managed', tagline: 'Some structure in place but inconsistently applied', color: '#d4a017' },
  3: { name: 'Defined', tagline: 'Standardised processes and solid automation foundation', color: '#d4b44a' },
  4: { name: 'Measured', tagline: 'Metrics-driven with optimised pipelines and strong practices', color: '#b8961c' },
  5: { name: 'Optimising', tagline: 'Industry-leading with continuous improvement and innovation', color: '#96790f' }
};
