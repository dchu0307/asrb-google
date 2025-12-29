// Curriculum seed data - built-in lessons for all modules
// These lessons are automatically created when the platform initializes

export const curriculumLessons = [
  // RESPONSIBLE SOURCING MODULE (4 lessons)
  {
    title: "Ethical Labor & Human Rights",
    subtitle: "Understanding wages, working conditions, and prevention of child and forced labor",
    category: "Responsible Sourcing",
    difficulty: "beginner",
    objectives: [
      "Define ethical labor practices and fundamental human rights in supply chains",
      "Identify core principles of fair wages and safe working conditions",
      "Recognize indicators of child labor and forced labor",
      "Understand the business impact of upholding human rights"
    ],
    content: [
      {
        type: "heading",
        text: "What Are Ethical Labor Practices?"
      },
      {
        type: "paragraph",
        text: "Ethical labor practices refer to employment standards that respect workers' rights, ensure safe working conditions, provide fair wages, and strictly prohibit child and forced labor. These practices are fundamental to responsible sourcing and sustainable supply chain management."
      },
      {
        type: "heading",
        text: "Core Principles of Ethical Labor"
      },
      {
        type: "list",
        items: [
          "Fair Wages: Compensation that meets or exceeds legal minimums and provides a living wage",
          "Safe Working Conditions: Proper safety equipment, adequate ventilation, emergency exits, and health protections",
          "No Child Labor: Prohibition of work by children below minimum age, protection of young workers",
          "No Forced Labor: Voluntary employment, no debt bondage, freedom to leave employment",
          "Freedom of Association: Right to join unions and engage in collective bargaining",
          "Non-discrimination: Equal treatment regardless of gender, race, religion, or other characteristics",
          "Reasonable Working Hours: Limits on overtime, guaranteed rest periods and days off"
        ]
      },
      {
        type: "paragraph",
        text: "These principles are derived from the International Labour Organization (ILO) conventions and form the foundation of ethical sourcing programs worldwide."
      },
      {
        type: "heading",
        text: "Indicators of Child and Forced Labor"
      },
      {
        type: "paragraph",
        text: "Child labor indicators include workers who appear underage, lack of age verification documents, children working during school hours, and hazardous work performed by young workers. Forced labor indicators include withholding of identity documents, restriction of movement, debt bondage, threats or intimidation, payment below minimum wage, and excessive overtime without consent."
      },
      {
        type: "heading",
        text: "Business Benefits of Ethical Labor Practices"
      },
      {
        type: "list",
        items: [
          "Reduced reputational risks and brand protection",
          "Improved worker productivity and product quality",
          "Lower employee turnover and recruitment costs",
          "Enhanced supply chain resilience and reliability",
          "Better investor relations and ESG ratings",
          "Compliance with regulatory requirements and customer expectations"
        ]
      }
    ],
    quiz: [
      {
        question: "Which of the following is a core principle of ethical labor practices?",
        options: [
          "Maximizing profits at all costs",
          "Fair wages and safe working conditions",
          "Unlimited overtime without breaks",
          "Restricting worker movement"
        ],
        correctAnswer: 1
      },
      {
        question: "What is an indicator of forced labor?",
        options: [
          "Workers receiving fair wages",
          "Freedom to leave employment",
          "Withholding of identity documents",
          "Voluntary overtime"
        ],
        correctAnswer: 2
      },
      {
        question: "What does ILO stand for?",
        options: [
          "International Labor Organization",
          "International Labour Organization",
          "Independent Labor Office",
          "International Legal Operations"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: Explain why ethical labor practices can actually improve a company's profitability, beyond just being 'the right thing to do.'",
        isEssay: true
      }
    ]
  },
  {
    title: "Transparency & Traceability",
    subtitle: "Creating visible, accountable supply chains through technology and disclosure",
    category: "Responsible Sourcing",
    difficulty: "intermediate",
    objectives: [
      "Understand the importance of supply chain transparency",
      "Evaluate different traceability technologies and their applications",
      "Design transparency initiatives that balance disclosure with competitive concerns",
      "Implement systems for tracking products and practices across supply tiers"
    ],
    content: [
      {
        type: "heading",
        text: "The Transparency Imperative"
      },
      {
        type: "paragraph",
        text: "Modern consumers, investors, and regulators demand unprecedented visibility into supply chain practices. Transparency builds trust, enables accountability, and drives continuous improvement. However, achieving meaningful transparency requires sophisticated systems that can track products and practices across complex, multi-tier supply chains."
      },
      {
        type: "heading",
        text: "Traceability Technology Landscape"
      },
      {
        type: "list",
        items: [
          "Blockchain: Creates immutable records of product journey and transactions, ideal for high-value or high-risk commodities",
          "IoT Sensors: Enable real-time monitoring of environmental conditions, location, and handling during transport",
          "RFID/NFC Tags: Provide unique product identification and authentication capabilities",
          "Digital Platforms: Centralize supplier data, certifications, and audit results for stakeholder access",
          "QR Codes: Offer consumer-facing interfaces to access product origin and sustainability information",
          "Satellite Monitoring: Tracks deforestation, land use changes, and geographic sourcing claims"
        ]
      },
      {
        type: "heading",
        text: "Levels of Supply Chain Transparency"
      },
      {
        type: "paragraph",
        text: "Transparency operates at different levels. Tier 1 transparency reveals direct suppliers. Tier 2 extends to suppliers' suppliers. Full traceability tracks back to raw material origins. Companies must decide appropriate scope based on risk, resources, and stakeholder expectations. High-risk commodities (conflict minerals, cotton, cocoa) often require deeper traceability."
      },
      {
        type: "heading",
        text: "Balancing Transparency with Competitive Concerns"
      },
      {
        type: "paragraph",
        text: "Organizations must balance transparency with practical and competitive concerns. Key decisions include: determining appropriate scope (which tiers, which products), selecting technology based on specific use cases and infrastructure constraints, ensuring data accuracy through verification mechanisms, managing supplier onboarding and capacity building, and defining what information to share publicly versus keep proprietary."
      },
      {
        type: "heading",
        text: "Building Trust Beyond Technology"
      },
      {
        type: "paragraph",
        text: "Technology alone does not create transparency. Organizations must also cultivate a culture of openness, establish clear disclosure policies, engage stakeholders in defining what transparency means, verify claims through independent third parties, and be willing to acknowledge challenges and areas for improvement."
      }
    ],
    quiz: [
      {
        question: "Which technology is BEST suited for creating immutable records of product journey?",
        options: [
          "QR Codes",
          "Blockchain",
          "Excel spreadsheets",
          "Email chains"
        ],
        correctAnswer: 1
      },
      {
        question: "What does Tier 2 transparency refer to?",
        options: [
          "Only direct suppliers",
          "Suppliers' suppliers",
          "Only raw material origins",
          "Final consumers"
        ],
        correctAnswer: 1
      },
      {
        question: "Which technology enables tracking of deforestation in agricultural supply chains?",
        options: [
          "Blockchain",
          "RFID tags",
          "Satellite monitoring",
          "QR codes"
        ],
        correctAnswer: 2
      },
      {
        question: "Essay: Design a traceability program for a coffee company sourcing from multiple smallholder farmers in Ethiopia. Which technologies would you use and why? What challenges might you face?",
        isEssay: true
      }
    ]
  },
  {
    title: "Interactive Activity: Supplier Case Study - Traceability Challenge",
    subtitle: "Analyze a real-world traceability case, identify risks, analyze root causes, and develop corrective actions",
    category: "Responsible Sourcing",
    difficulty: "intermediate",
    objectives: [
      "Identify traceability risks and red flags in supply chain scenarios",
      "Analyze root causes of traceability failures and unauthorized subcontracting",
      "Understand how poor documentation creates regulatory risks (UFLPA)",
      "Develop corrective action plans for incomplete traceability",
      "Learn from real-world case study outcomes and measurable impacts"
    ],
    content: [
      {
        type: "heading",
        text: "About This Case Study"
      },
      {
        type: "paragraph",
        text: "This interactive case study presents a real-world traceability challenge involving a Tier-1 apparel factory. You'll analyze the case, identify risks, understand root causes, and develop corrective actions. The case demonstrates how unauthorized subcontracting was discovered, what actions were taken to address it, and the measurable impact achieved over 12 months."
      },
      {
        type: "heading",
        text: "The Case"
      },
      {
        type: "paragraph",
        text: "A Tier-1 apparel factory claimed all fabric came from 'Mill A,' but spot checks revealed multiple red flags: fabric rolls with two different batch numbers, packing slips bearing two supplier names, no transport documentation from the second mill, and operators revealing 'overflow dyeing' done by an undisclosed Tier-2 site."
      },
      {
        type: "heading",
        text: "Actions Taken"
      },
      {
        type: "list",
        items: [
          "Mandatory disclosure of all Tier-2 subcontractors",
          "QR-coded batch IDs for each roll of fabric",
          "Random batch audits by compliance team",
          "Centralized digital storage of traceability evidence",
          "Phased removal of unauthorized subcontractor"
        ]
      },
      {
        type: "heading",
        text: "Impact (12 months)"
      },
      {
        type: "list",
        items: [
          "100% traceability for fabric",
          "Zero unauthorized subcontracting",
          "Audit closure time reduced by 40%",
          "Documentation errors reduced by 70%"
        ]
      },
      {
        type: "heading",
        text: "How It Works"
      },
      {
        type: "list",
        items: [
          "Read the complete case study including the case, actions taken, and impact",
          "Answer questions in four sections: Risk Identification, Root-Cause Analysis, Preventive Action, and Long-Form Case Question",
          "Submit each answer to receive immediate feedback with detailed explanations",
          "Review key takeaways about traceability risks, root causes, and corrective actions",
          "Learn from the measurable impact achieved through proper traceability systems"
        ]
      },
      {
        type: "heading",
        text: "Key Learning Points"
      },
      {
        type: "paragraph",
        text: "This case study demonstrates that multiple red flags (mismatched batch numbers, multiple supplier names, missing documentation) often indicate unauthorized subcontracting. Spot checks and operator interviews are critical for uncovering hidden Tier-2 activities. Suppliers may hide subcontractors to reduce costs and avoid compliance requirements. Poor documentation creates UFLPA and other regulatory risks. QR-coded batch IDs, mandatory Tier-2 disclosure, random audits, and centralized digital documentation create robust traceability systems. Proper implementation can achieve 100% traceability, eliminate unauthorized subcontracting, reduce audit closure time by 40%, and cut documentation errors by 70%."
      },
      {
        type: "interactive-activity",
        component: "SupplierCaseStudyActivity"
      }
    ],
    quiz: []
  },
  {
    title: "Interactive Activity: Digital Traceability Tools Matching",
    subtitle: "Match each digital traceability tool to the specific traceability problem it solves best",
    category: "Responsible Sourcing",
    difficulty: "intermediate",
    objectives: [
      "Understand the primary functions of key digital traceability tools",
      "Match tools to specific traceability problems and use cases",
      "Learn when to use Sourcemap, TrusTrace, and Everstream Analytics",
      "Apply tool selection knowledge to real-world traceability challenges",
      "Build capability in choosing the right traceability solution for specific needs"
    ],
    content: [
      {
        type: "heading",
        text: "About This Matching Exercise"
      },
      {
        type: "paragraph",
        text: "This interactive exercise helps you understand when to use different digital traceability tools. You'll learn about three key tools—Sourcemap, TrusTrace, and Everstream Analytics—and match each tool to specific traceability problems. This exercise builds practical knowledge in selecting the right traceability solution for your organization's needs."
      },
      {
        type: "heading",
        text: "Digital Traceability Tools"
      },
      {
        type: "list",
        items: [
          "Sourcemap: Tier mapping + supply chain visualization - Use Sourcemap Software as a Service to map and monitor upstream suppliers and verify chain of custody data from raw materials to finished products",
          "TrusTrace: Batch-level tracking for apparel & electronics - Provides detailed traceability of individual product batches, specifically designed for fashion and textile supply chains",
          "Everstream Analytics: Detects illegal subcontracting & geopolitical risks - Uses advanced analytics to identify compliance violations, unauthorized subcontracting, and geopolitical factors that could disrupt supply chain continuity"
        ]
      },
      {
        type: "heading",
        text: "How It Works"
      },
      {
        type: "list",
        items: [
          "Review the three digital traceability tools and their primary functions",
          "Read each traceability problem carefully",
          "Match each problem to the tool that best solves it",
          "Each tool can be matched to multiple problems based on their capabilities",
          "Submit your matches and receive immediate feedback with explanations",
          "Review key takeaways about when to use each tool"
        ]
      },
      {
        type: "heading",
        text: "Key Learning Points"
      },
      {
        type: "paragraph",
        text: "Different traceability tools serve different purposes. Sourcemap excels at visual mapping and tier visualization, making it ideal for understanding supply chain structure. TrusTrace specializes in batch-level tracking, essential for apparel and electronics where individual batch verification is critical. Everstream Analytics focuses on risk detection, identifying illegal subcontracting and geopolitical risks that could disrupt supply. Understanding these distinctions helps organizations select the right tool for their specific traceability needs."
      },
      {
        type: "interactive-activity",
        component: "TraceabilityToolsMatchingActivity"
      }
    ],
    quiz: []
  },
  {
    title: "Interactive Activity: Transparency & Traceability Self-Assessment",
    subtitle: "Evaluate your organization's transparency and traceability maturity with an interactive checklist",
    category: "Responsible Sourcing",
    difficulty: "intermediate",
    objectives: [
      "Assess your organization's current transparency and traceability practices",
      "Understand maturity levels for transparency and traceability",
      "Identify gaps and areas for improvement",
      "Receive actionable recommendations based on your assessment score",
      "Learn about key practices required for advanced transparency"
    ],
    content: [
      {
        type: "heading",
        text: "About This Self-Assessment"
      },
      {
        type: "paragraph",
        text: "This interactive checklist helps you evaluate your organization's transparency and traceability practices. Based on the percentage of actions that apply to your organization, you'll receive a maturity score and specific recommendations. The assessment covers six key areas: Tier-1 supplier lists, multi-tier traceability, spot-checks, subcontractor disclosure, red flag detection, and UFLPA screening."
      },
      {
        type: "heading",
        text: "How It Works"
      },
      {
        type: "list",
        items: [
          "Review each checklist question and check all items that apply to your organization",
          "Be honest in your assessment to get accurate results",
          "Your score is calculated as a percentage based on checked items",
          "Receive a maturity level: Advanced (80-100%), Developing (50-79%), or Foundational (<50%)",
          "Get specific recommendations and next steps based on your score",
          "Learn whether you pass or need additional training"
        ]
      },
      {
        type: "heading",
        text: "Maturity Levels"
      },
      {
        type: "list",
        items: [
          "Advanced (80-100%): Eligible for Google Recognition Certificate - Your organization demonstrates strong transparency and traceability practices",
          "Developing (50-79%): Requires an Action Plan - You have foundational practices but need to address gaps",
          "Foundational (<50%): Mandatory follow-up training - Significant improvements needed to meet minimum standards"
        ]
      },
      {
        type: "heading",
        text: "Key Learning Points"
      },
      {
        type: "paragraph",
        text: "Transparency and traceability are not binary - they exist on a maturity spectrum. Organizations should regularly assess their practices, identify gaps, and develop action plans to improve. The checklist covers essential practices including complete supplier lists, multi-tier traceability for high-risk materials, regular spot-checks, subcontractor validation, red flag detection, and compliance screening. Achieving advanced maturity requires systematic implementation across all these areas."
      },
      {
        type: "interactive-activity",
        component: "TransparencyTraceabilityChecklistActivity"
      }
    ],
    quiz: []
  },
  {
    title: "Interactive Activity: Supply Chain Mapping Exercise",
    subtitle: "Practice mapping multi-tier supply chains and identifying traceability challenges",
    category: "Responsible Sourcing",
    difficulty: "intermediate",
    objectives: [
      "Map supply chain tiers from final assembly to raw material sources",
      "Identify which tiers are hardest to trace and why",
      "Recognize verification documents needed for traceability",
      "Spot red flags that indicate documentation fraud or traceability gaps",
      "Build capability in visualizing multi-tier supply chain risks"
    ],
    content: [
      {
        type: "heading",
        text: "About This Activity"
      },
      {
        type: "paragraph",
        text: "In this interactive mapping exercise, you'll practice mapping supply chains across multiple tiers for different products. You'll identify which tiers are hardest to trace, determine what verification documents are needed, and spot red flags that indicate potential traceability issues. This exercise builds supplier capability in visualizing multi-tier risk."
      },
      {
        type: "heading",
        text: "How It Works"
      },
      {
        type: "list",
        items: [
          "Review the product and its supply chain tiers (Tier 0-4)",
          "Identify which tier is hardest to trace and explain why",
          "Select verification documents needed to verify Tier-2 authenticity",
          "Identify red flags that might appear in documentation",
          "Receive immediate feedback with detailed explanations"
        ]
      },
      {
        type: "heading",
        text: "Key Learning Points"
      },
      {
        type: "paragraph",
        text: "This exercise demonstrates the challenges of multi-tier traceability. Tier 4 (farm/mine level) is typically the hardest to trace due to scale, remote locations, and limited documentation infrastructure. Verification requires multiple documents including certifications, GPS coordinates, batch tracking, and audit reports. Red flags include duplicate addresses, missing batch IDs, inconsistent dates, and gaps in documentation that suggest fraud or traceability failures."
      },
      {
        type: "interactive-activity",
        component: "SupplyChainMappingActivity"
      }
    ],
    quiz: []
  },
  {
    title: "Interactive Activity: Product Mapping Exercise",
    subtitle: "Choose a simple product and map it through your supply chain tiers, then answer key traceability questions",
    category: "Responsible Sourcing",
    difficulty: "intermediate",
    objectives: [
      "Select a product and map it through all supply chain tiers (Tier 0-4)",
      "Identify which tier is hardest to trace and explain why",
      "List documents needed to verify Tier-2 authenticity",
      "Identify red flags that might appear in documentation",
      "Build hands-on capability in visualizing multi-tier supply chain risks"
    ],
    content: [
      {
        type: "heading",
        text: "About This Mapping Exercise"
      },
      {
        type: "paragraph",
        text: "This hands-on exercise allows you to choose a simple product and map it through your supply chain tiers from final assembly (Tier 0) down to the farm or mine level (Tier 4). You'll describe what happens at each tier, then answer key questions about traceability challenges. This exercise builds supplier capability in visualizing multi-tier risk and understanding where traceability challenges emerge."
      },
      {
        type: "heading",
        text: "How It Works"
      },
      {
        type: "list",
        items: [
          "Choose a simple product from the available options (e.g., cotton t-shirt, smartphone, chocolate bar)",
          "Map the product through all 5 tiers: Tier 0 (Final Assembly), Tier 1 (Direct Supplier), Tier 2 (Fabric Mill/Component Vendor), Tier 3 (Raw-Material Processor), Tier 4 (Farm/Mine)",
          "Describe what happens at each tier for your chosen product",
          "Answer three key questions: Which tier is hardest to trace and why? Which documents verify Tier-2 authenticity? What red flags might appear?",
          "Review your answers and key learning points"
        ]
      },
      {
        type: "heading",
        text: "Key Learning Points"
      },
      {
        type: "paragraph",
        text: "This exercise demonstrates that Tier 4 (farm/mine level) is typically the hardest to trace due to scale (thousands of smallholder farms or artisanal mines), remote locations, limited documentation infrastructure, and complex aggregation networks. Verification documents for Tier-2 include purchase receipts with GPS coordinates, third-party certifications, transportation records, audit reports, batch tracking, and chain of custody records. Common red flags include duplicate addresses, missing batch IDs, inconsistent dates, gaps in documentation, inability to verify certifications, and missing chain of custody. This exercise builds supplier capability in visualizing multi-tier risk."
      },
      {
        type: "interactive-activity",
        component: "ProductMappingExerciseActivity"
      }
    ],
    quiz: []
  },
  {
    title: "Environmental Management",
    subtitle: "Integrating environmental criteria into sourcing and supplier performance",
    category: "Responsible Sourcing",
    difficulty: "intermediate",
    objectives: [
      "Identify key environmental impacts across supply chain stages",
      "Develop environmental performance criteria for supplier evaluation",
      "Implement supplier environmental capacity building programs",
      "Measure and reduce scope 3 emissions through sourcing strategies"
    ],
    content: [
      {
        type: "heading",
        text: "Environmental Impacts Across the Supply Chain"
      },
      {
        type: "paragraph",
        text: "Supply chains generate significant environmental impacts including greenhouse gas emissions from transportation and manufacturing, water consumption and pollution from production processes, waste generation from packaging and product lifecycle, biodiversity loss from raw material extraction, and chemical use in agriculture and manufacturing."
      },
      {
        type: "heading",
        text: "Supplier Environmental Assessment Criteria"
      },
      {
        type: "list",
        items: [
          "Environmental management systems (ISO 14001 certification)",
          "Carbon footprint and energy efficiency measures",
          "Water stewardship and wastewater treatment practices",
          "Waste management and circular economy initiatives",
          "Use of renewable energy and clean production technologies",
          "Sustainable raw material sourcing and biodiversity protection",
          "Chemical management and hazardous substance elimination",
          "Environmental compliance record and incident history"
        ]
      },
      {
        type: "heading",
        text: "Building Supplier Environmental Capacity"
      },
      {
        type: "paragraph",
        text: "Many suppliers, especially small and medium enterprises, lack resources or knowledge to implement strong environmental practices. Leading companies invest in supplier capacity building through technical assistance programs, joint investment in cleaner technologies, training on environmental management systems, and long-term partnerships that enable suppliers to make necessary improvements."
      },
      {
        type: "heading",
        text: "Addressing Scope 3 Emissions"
      },
      {
        type: "paragraph",
        text: "For most companies, the majority of carbon emissions occur in their supply chain (Scope 3 emissions). Effective strategies include supplier engagement programs with emissions reduction targets, low-carbon sourcing criteria in procurement decisions, optimization of logistics and transportation modes, circular economy initiatives to reduce virgin material use, and collaboration on renewable energy adoption throughout the value chain."
      }
    ],
    quiz: [
      {
        question: "What are Scope 3 emissions?",
        options: [
          "Emissions from company-owned facilities",
          "Emissions from purchased electricity",
          "Emissions from the supply chain and product lifecycle",
          "Emissions from employee commuting only"
        ],
        correctAnswer: 2
      },
      {
        question: "Which certification demonstrates a supplier has an environmental management system?",
        options: [
          "ISO 9001",
          "ISO 14001",
          "SA 8000",
          "LEED"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the BEST approach to improve environmental performance of small suppliers?",
        options: [
          "Immediately switch to suppliers with better performance",
          "Ignore small suppliers since they have minimal impact",
          "Provide capacity building and technical assistance",
          "Require certifications without offering support"
        ],
        correctAnswer: 2
      },
      {
        question: "Essay: You're sourcing electronic components from suppliers in Southeast Asia. Describe how you would assess and improve their environmental performance, including specific metrics you would track.",
        isEssay: true
      }
    ]
  },
  {
    title: "Rationale & Benefits of Responsible Sourcing",
    subtitle: "Building the business case for sustainability in supply chains",
    category: "Responsible Sourcing",
    difficulty: "beginner",
    objectives: [
      "Articulate the business rationale for responsible sourcing beyond compliance",
      "Quantify financial and strategic benefits of sustainable supply chains",
      "Address common objections and misconceptions",
      "Communicate value to stakeholders across the organization"
    ],
    content: [
      {
        type: "heading",
        text: "Beyond Compliance: Strategic Value Creation"
      },
      {
        type: "paragraph",
        text: "While many organizations initially approach responsible sourcing as a compliance or risk management exercise, leading companies recognize it as a strategic opportunity to create value, differentiate their brand, drive innovation, and build competitive advantage in increasingly sustainability-conscious markets."
      },
      {
        type: "heading",
        text: "Key Business Benefits"
      },
      {
        type: "list",
        items: [
          "Risk Mitigation: Reduced costs from supply disruptions, recalls, reputation damage, and regulatory penalties",
          "Revenue Growth: Premium pricing, market share gains, access to sustainability-focused customers and contracts",
          "Operational Efficiency: Improved quality, reduced waste, lower energy costs, better worker productivity",
          "Capital Access: Better ESG ratings, lower cost of capital, enhanced investor attractiveness",
          "Innovation: Development of sustainable products, new business models, circular economy opportunities",
          "Talent Attraction: Enhanced employer brand, improved recruitment and retention of top talent",
          "Resilience: More diversified supply base, stronger supplier relationships, better crisis preparedness"
        ]
      },
      {
        type: "heading",
        text: "Addressing Common Objections"
      },
      {
        type: "paragraph",
        text: "Common pushback includes 'sustainability is too expensive,' 'our customers don't care,' and 'we're too small to make a difference.' Effective responses focus on total cost of ownership (sustainability prevents expensive problems), growing customer and investor expectations (supported by data), and collective impact (even small companies influence their supply chains and contribute to systemic change)."
      },
      {
        type: "heading",
        text: "Communicating the Business Case"
      },
      {
        type: "paragraph",
        text: "Tailor messaging to different stakeholders. For executives, emphasize financial ROI and risk mitigation. For procurement teams, highlight supplier performance and cost savings. For marketing, focus on brand differentiation and customer loyalty. For operations, stress quality improvements and efficiency gains. Use specific metrics and case studies to make the case concrete and credible."
      }
    ],
    quiz: [
      {
        question: "Which represents a revenue growth opportunity from responsible sourcing?",
        options: [
          "Avoiding regulatory fines",
          "Premium pricing for sustainable products",
          "Reducing waste in production",
          "Improving worker safety"
        ],
        correctAnswer: 1
      },
      {
        question: "What does ESG stand for?",
        options: [
          "Environmental, Social, Governance",
          "Ethical Sourcing Guidelines",
          "Energy Savings Goals",
          "External Stakeholder Groups"
        ],
        correctAnswer: 0
      },
      {
        question: "What is 'total cost of ownership' in the context of responsible sourcing?",
        options: [
          "Just the purchase price of goods",
          "A model that captures hidden costs of unsustainable practices",
          "The cost of auditing suppliers",
          "Employee salary costs"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: You need to convince a cost-focused procurement manager to prioritize responsible sourcing. Build a business case that addresses their concerns about price and demonstrates tangible value.",
        isEssay: true
      }
    ]
  },

  // GENERAL SOLUTIONS MODULE (6 lessons)
  {
    title: "OECD Due Diligence Guidance",
    subtitle: "Understanding the internationally recognized framework for responsible business conduct",
    category: "General Solutions",
    difficulty: "intermediate",
    objectives: [
      "Understand the OECD framework and its five-step due diligence process",
      "Apply risk-based due diligence to supply chain management",
      "Identify sector-specific OECD guidance and applications",
      "Implement remediation strategies for identified risks"
    ],
    content: [
      {
        type: "heading",
        text: "What is OECD Due Diligence?"
      },
      {
        type: "paragraph",
        text: "The Organisation for Economic Co-operation and Development (OECD) provides internationally recognized guidance for responsible business conduct. Their due diligence framework helps companies identify, prevent, and mitigate actual and potential adverse impacts in their operations and supply chains."
      },
      {
        type: "heading",
        text: "The Five-Step Framework"
      },
      {
        type: "list",
        items: [
          "Step 1: Embed responsible business conduct into policies and management systems",
          "Step 2: Identify and assess actual and potential adverse impacts in operations and supply chains",
          "Step 3: Cease, prevent, or mitigate adverse impacts",
          "Step 4: Track implementation and results",
          "Step 5: Communicate how impacts are addressed and provide for remediation when appropriate"
        ]
      },
      {
        type: "paragraph",
        text: "This framework is risk-based, meaning companies should prioritize the most severe impacts and leverage their influence to drive change."
      }
    ],
    quiz: [
      {
        question: "How many steps are in the OECD due diligence framework?",
        options: ["3", "5", "7", "10"],
        correctAnswer: 1
      },
      {
        question: "Essay: Describe how you would apply the OECD framework to assess labor risks in a garment supply chain.",
        isEssay: true
      }
    ]
  },
  {
    title: "Comply Chain Framework",
    subtitle: "A comprehensive approach to social compliance in global supply chains",
    category: "General Solutions",
    difficulty: "intermediate",
    objectives: [
      "Understand the eight components of Comply Chain",
      "Build effective social compliance systems",
      "Engage stakeholders throughout the compliance process",
      "Measure and improve compliance program effectiveness"
    ],
    content: [
      {
        type: "heading",
        text: "Introduction to Comply Chain"
      },
      {
        type: "paragraph",
        text: "Comply Chain is a comprehensive framework developed by the U.S. Department of Labor to help businesses develop effective social compliance systems. It provides practical guidance for reducing labor violations in global supply chains."
      },
      {
        type: "heading",
        text: "The Eight Steps"
      },
      {
        type: "list",
        items: [
          "1. Engage Stakeholders and Partners",
          "2. Assess Risks and Impacts",
          "3. Develop Code of Conduct",
          "4. Communicate and Train",
          "5. Monitor Compliance",
          "6. Remediate Violations",
          "7. Independent Review",
          "8. Report Performance"
        ]
      }
    ],
    quiz: [
      {
        question: "What organization developed the Comply Chain framework?",
        options: [
          "United Nations",
          "U.S. Department of Labor",
          "World Bank",
          "International Labour Organization"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: Why is stakeholder engagement the first step in Comply Chain? Who should be engaged?",
        isEssay: true
      }
    ]
  },
  {
    title: "Third-Party Auditing",
    subtitle: "Using independent verification to assess supplier compliance",
    category: "General Solutions",
    difficulty: "beginner",
    objectives: [
      "Understand the role and limitations of third-party audits",
      "Select appropriate audit standards and certification schemes",
      "Interpret audit results and findings",
      "Complement audits with other verification methods"
    ],
    content: [
      {
        type: "heading",
        text: "The Role of Third-Party Audits"
      },
      {
        type: "paragraph",
        text: "Third-party audits provide independent verification of supplier compliance with social and environmental standards. They help companies assess risks, verify improvements, and demonstrate accountability to stakeholders."
      },
      {
        type: "heading",
        text: "Common Audit Standards"
      },
      {
        type: "list",
        items: [
          "SA8000: Social accountability standard covering labor rights",
          "BSCI: Business Social Compliance Initiative",
          "SMETA: Sedex Members Ethical Trade Audit",
          "ISO 14001: Environmental management systems",
          "Fair Trade: Certification for fair labor and environmental practices"
        ]
      },
      {
        type: "heading",
        text: "Limitations and Complementary Approaches"
      },
      {
        type: "paragraph",
        text: "While valuable, audits have limitations including audit fatigue, announced visits that allow preparation, and focus on documentation over actual practices. Companies should complement audits with worker voice mechanisms, unannounced visits, and continuous monitoring technologies."
      }
    ],
    quiz: [
      {
        question: "What does SA8000 certification cover?",
        options: [
          "Environmental management only",
          "Social accountability and labor rights",
          "Financial auditing",
          "Product quality"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: What are the main limitations of traditional third-party audits and how can companies address them?",
        isEssay: true
      }
    ]
  },
  {
    title: "Supplier Codes of Conduct",
    subtitle: "Establishing clear expectations and standards for suppliers",
    category: "General Solutions",
    difficulty: "beginner",
    objectives: [
      "Develop comprehensive supplier codes of conduct",
      "Align codes with international standards and industry best practices",
      "Communicate and cascade codes through supply tiers",
      "Enforce codes through contracts and supplier relationships"
    ],
    content: [
      {
        type: "heading",
        text: "What is a Supplier Code of Conduct?"
      },
      {
        type: "paragraph",
        text: "A supplier code of conduct is a document that outlines a company's expectations for supplier behavior regarding labor practices, environmental protection, business ethics, and other responsible business conduct areas."
      },
      {
        type: "heading",
        text: "Key Elements of Effective Codes"
      },
      {
        type: "list",
        items: [
          "Labor rights and working conditions",
          "Health and safety requirements",
          "Environmental protection standards",
          "Business ethics and anti-corruption",
          "Management systems and continuous improvement",
          "Monitoring and enforcement mechanisms",
          "Remediation and corrective action processes"
        ]
      },
      {
        type: "paragraph",
        text: "Codes should be integrated into supplier contracts, communicated in local languages, and supported by training and capacity building programs."
      }
    ],
    quiz: [
      {
        question: "Why should supplier codes of conduct be translated into local languages?",
        options: [
          "To meet legal requirements",
          "To ensure suppliers and workers understand expectations",
          "To impress customers",
          "It's not necessary"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: Design a supplier code of conduct for a technology company. What would you include and why?",
        isEssay: true
      }
    ]
  },
  {
    title: "Supplier Training Programs",
    subtitle: "Building capability and driving continuous improvement",
    category: "General Solutions",
    difficulty: "intermediate",
    objectives: [
      "Design effective supplier training and capacity building programs",
      "Assess supplier training needs and priorities",
      "Deliver training through multiple channels and formats",
      "Measure training effectiveness and business impact"
    ],
    content: [
      {
        type: "heading",
        text: "The Importance of Supplier Training"
      },
      {
        type: "paragraph",
        text: "Many suppliers, especially SMEs, lack the knowledge or resources to implement strong sustainability practices. Training programs help build supplier capability, drive continuous improvement, and create shared value throughout the supply chain."
      },
      {
        type: "heading",
        text: "Types of Training Programs"
      },
      {
        type: "list",
        items: [
          "General sustainability awareness and business case",
          "Technical skills (e.g., energy efficiency, waste reduction)",
          "Management systems (ISO 14001, SA8000)",
          "Health and safety practices",
          "Worker rights and communication",
          "Environmental compliance and reporting"
        ]
      },
      {
        type: "heading",
        text: "Delivery Methods"
      },
      {
        type: "paragraph",
        text: "Effective training uses multiple channels: in-person workshops, online learning platforms, peer-to-peer knowledge sharing, industry collaborations, and embedded technical assistance. Programs should be culturally appropriate and available in local languages."
      }
    ],
    quiz: [
      {
        question: "Why is peer-to-peer learning valuable in supplier training?",
        options: [
          "It's cheaper than hiring trainers",
          "Suppliers learn from others facing similar challenges",
          "It's easier to organize",
          "All of the above"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: Describe how you would design a training program to help suppliers reduce their carbon footprint.",
        isEssay: true
      }
    ]
  },
  {
    title: "ESG Reporting Frameworks",
    subtitle: "Communicating sustainability performance to stakeholders",
    category: "General Solutions",
    difficulty: "advanced",
    objectives: [
      "Understand major ESG reporting frameworks (GRI, SASB, TCFD)",
      "Select appropriate frameworks for your organization",
      "Collect and verify ESG data across supply chains",
      "Communicate ESG performance effectively to different audiences"
    ],
    content: [
      {
        type: "heading",
        text: "Why ESG Reporting Matters"
      },
      {
        type: "paragraph",
        text: "Environmental, Social, and Governance (ESG) reporting provides transparency about company and supply chain performance on sustainability issues. It meets growing investor, customer, and regulatory demands for disclosure while driving internal accountability and improvement."
      },
      {
        type: "heading",
        text: "Major Reporting Frameworks"
      },
      {
        type: "list",
        items: [
          "GRI (Global Reporting Initiative): Comprehensive sustainability reporting standard",
          "SASB (Sustainability Accounting Standards Board): Industry-specific, financially material ESG metrics",
          "TCFD (Task Force on Climate-related Financial Disclosures): Climate risk and opportunity disclosure",
          "CDP: Environmental disclosure system for companies and cities",
          "Integrated Reporting: Combining financial and non-financial performance"
        ]
      },
      {
        type: "paragraph",
        text: "Many companies use multiple frameworks to meet different stakeholder needs. The trend is toward greater standardization and mandatory disclosure requirements."
      }
    ],
    quiz: [
      {
        question: "Which framework focuses specifically on climate-related financial disclosures?",
        options: ["GRI", "SASB", "TCFD", "CDP"],
        correctAnswer: 2
      },
      {
        question: "Essay: Compare GRI and SASB frameworks. When would you use each, and why might you use both?",
        isEssay: true
      }
    ]
  },

  // EMERGING TECHNOLOGY & AI INTEGRATION MODULE (4 lessons)
  {
    title: "Data Analytics and Proactive Risk Management",
    subtitle: "Using data to identify and mitigate supply chain risks before they escalate",
    category: "Emerging Technology & AI Integration",
    difficulty: "intermediate",
    objectives: [
      "Apply data analytics to identify supply chain risk patterns",
      "Use predictive models to anticipate potential issues",
      "Integrate multiple data sources for comprehensive risk assessment",
      "Implement early warning systems and risk dashboards"
    ],
    content: [
      {
        type: "heading",
        text: "From Reactive to Proactive Risk Management"
      },
      {
        type: "paragraph",
        text: "Traditional supply chain risk management is reactive - problems are addressed after they're discovered through audits or incidents. Data analytics enables proactive risk management by identifying patterns, predicting issues, and enabling early intervention."
      },
      {
        type: "heading",
        text: "Data Sources for Risk Analytics"
      },
      {
        type: "list",
        items: [
          "Audit results and corrective action plans",
          "Supplier self-assessments and certifications",
          "Worker feedback and grievance data",
          "Geographic risk indices (corruption, labor rights, environmental)",
          "News and media monitoring",
          "Trade data and shipping information",
          "Environmental sensors and IoT devices"
        ]
      },
      {
        type: "paragraph",
        text: "By combining and analyzing these diverse data sources, companies can build comprehensive risk profiles and identify emerging issues before they become crises."
      }
    ],
    quiz: [
      {
        question: "What is the main advantage of proactive vs. reactive risk management?",
        options: [
          "It's cheaper",
          "It identifies and addresses issues before they escalate",
          "It requires less data",
          "It eliminates all risks"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: Design a data analytics system to predict labor compliance risks in a global footwear supply chain. What data would you collect and how would you analyze it?",
        isEssay: true
      }
    ]
  },
  {
    title: "Interactive Activity: Geospatial Mapping",
    subtitle: "Explore 3D globe visualization and create inspection scorecards for supply chain sites",
    category: "Emerging Technology & AI Integration",
    difficulty: "intermediate",
    objectives: [
      "Use geospatial mapping tools to visualize supply chain geography",
      "Identify high-risk regions and facilities requiring inspection",
      "Create scorecards of sites needing further inspection or development",
      "Prioritize inspections based on geospatial risk analysis",
      "Apply geospatial data to supply chain risk management"
    ],
    content: [
      {
        type: "heading",
        text: "About This Geospatial Mapping Activity"
      },
      {
        type: "paragraph",
        text: "This interactive activity allows you to explore geospatial mapping functions using a 3D globe interface. You'll be able to scroll through the globe to visualize how geospatial mapping works, choose areas, regions, or sites you want to simulate, and create a scorecard of sites that need further inspection or development. This demonstrates how geospatial data enables proactive risk management and efficient inspection planning."
      },
      {
        type: "heading",
        text: "How It Works"
      },
      {
        type: "list",
        items: [
          "Explore the 3D globe interface to visualize supply chain geography",
          "Select sites, regions, or areas you want to analyze",
          "Review risk factors and inspection priorities for each location",
          "Add sites to your inspection scorecard",
          "Prioritize inspections based on geospatial risk analysis",
          "Use location data to identify high-risk clusters and plan efficient audits"
        ]
      },
      {
        type: "heading",
        text: "Key Learning Points"
      },
      {
        type: "paragraph",
        text: "Geospatial mapping enables visualization of supply chain geography, helping identify high-risk regions and prioritize inspections. By mapping supplier locations and overlaying risk data, companies can create efficient inspection schedules, identify regional risk clusters, and plan sustainable sourcing strategies. Geospatial data complements other risk management tools by providing geographic context for supply chain decisions."
      },
      {
        type: "interactive-activity",
        component: "GeospatialMappingActivity"
      }
    ],
    quiz: []
  },
  {
    title: "Optimization, Predictive Analytics, and Live Monitoring",
    subtitle: "Real-time insights and optimization for sustainable supply chains",
    category: "Emerging Technology & AI Integration",
    difficulty: "advanced",
    objectives: [
      "Implement real-time monitoring systems for sustainability metrics",
      "Use AI for supply chain optimization and decision support",
      "Apply predictive analytics to forecast sustainability performance",
      "Balance efficiency, cost, and sustainability objectives"
    ],
    content: [
      {
        type: "heading",
        text: "Real-Time Sustainability Monitoring"
      },
      {
        type: "paragraph",
        text: "IoT sensors, satellite data, and digital platforms enable real-time monitoring of environmental and social conditions across supply chains. This provides immediate visibility into issues like emissions, water use, working hours, and facility conditions."
      },
      {
        type: "heading",
        text: "AI-Powered Optimization"
      },
      {
        type: "paragraph",
        text: "Artificial intelligence can optimize supply chain decisions to balance multiple objectives including cost, speed, resilience, and sustainability. AI algorithms can recommend optimal sourcing strategies, transportation routes, and production schedules that minimize environmental impact while meeting business requirements."
      },
      {
        type: "heading",
        text: "Predictive Analytics Applications"
      },
      {
        type: "list",
        items: [
          "Forecasting supplier sustainability performance trends",
          "Predicting which suppliers are at risk of compliance violations",
          "Anticipating environmental impacts of sourcing decisions",
          "Modeling scenarios for carbon reduction strategies",
          "Estimating ROI of sustainability investments"
        ]
      },
      {
        type: "heading",
        text: "Interactive Activity: Supply Chain Mapping & Optimization"
      },
      {
        type: "paragraph",
        text: "Apply the concepts you've learned about real-time monitoring, predictive analytics, and route optimization using the interactive supply chain mapping tool below. This hands-on activity demonstrates how modern supply chain systems track shipments, predict delays, and optimize routes in real-time."
      },
      {
        type: "interactive-activity",
        component: "SupplyChainMapActivity"
      }
    ],
    quiz: [
      {
        question: "What technology enables real-time monitoring of facility conditions?",
        options: [
          "Blockchain only",
          "IoT sensors and devices",
          "Email systems",
          "Annual audits"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: How can AI help companies balance cost reduction and sustainability improvement? Provide specific examples.",
        isEssay: true
      }
    ]
  },
  {
    title: "Interactive Activity: Monitoring Simulation Game",
    subtitle: "Practice making supply chain decisions using Ulula worker data and Environmental IoT device alerts",
    category: "Emerging Technology & AI Integration",
    difficulty: "intermediate",
    objectives: [
      "Integrate worker voice data (Ulula) with environmental IoT monitoring data",
      "Make informed decisions that balance environmental and social performance",
      "Understand how decisions are evaluated on EcoVadis platform",
      "Apply real-time monitoring data to address supply chain issues proactively",
      "Balance multiple objectives: worker satisfaction, environmental impact, cost, and compliance"
    ],
    content: [
      {
        type: "heading",
        text: "About This Simulation Game"
      },
      {
        type: "paragraph",
        text: "This simulation game demonstrates how managers must address issues within their supply chains by integrating data from multiple sources. You'll use Ulula worker feedback data and Environmental IoT device alerts to make decisions that will be evaluated on EcoVadis, which already integrates Ulula in its system. This hands-on activity shows how real-time monitoring enables proactive issue resolution."
      },
      {
        type: "heading",
        text: "How It Works"
      },
      {
        type: "list",
        items: [
          "Review scenario descriptions of supply chain issues",
          "Analyze Ulula worker data including compliance scores, risk levels, and worker concerns",
          "Examine Environmental IoT device data including emissions, water usage, energy consumption, and alerts",
          "Make decisions on how to address the issues",
          "See how your decisions impact worker satisfaction, environmental performance, cost, and EcoVadis ratings",
          "Receive feedback explaining why certain approaches are more effective"
        ]
      },
      {
        type: "heading",
        text: "Key Learning Points"
      },
      {
        type: "paragraph",
        text: "Effective supply chain management requires integrating both environmental monitoring (IoT sensors) and social monitoring (worker voice platforms like Ulula). EcoVadis evaluates both dimensions, so decisions must balance environmental and social performance. The best approaches are proactive and collaborative, working with facilities to implement solutions rather than reactive or punitive measures. Worker voice data provides insights that IoT sensors cannot detect, while IoT data reveals environmental issues that may not be apparent from worker feedback alone."
      },
      {
        type: "interactive-activity",
        component: "MonitoringSimulationActivity"
      }
    ],
    quiz: []
  },
  {
    title: "Supply Chain Management with Digital Twins and Control Towers",
    subtitle: "Virtual modeling and centralized visibility for complex supply chains",
    category: "Emerging Technology & AI Integration",
    difficulty: "advanced",
    objectives: [
      "Understand digital twin concepts and applications",
      "Implement supply chain control towers for end-to-end visibility",
      "Use virtual models to simulate and optimize sustainability performance",
      "Integrate data across systems and partners"
    ],
    content: [
      {
        type: "heading",
        text: "What are Digital Twins?"
      },
      {
        type: "paragraph",
        text: "A digital twin is a virtual replica of a physical supply chain that uses real-time data to simulate, predict, and optimize performance. Digital twins enable companies to test scenarios, identify bottlenecks, and optimize decisions without disrupting actual operations."
      },
      {
        type: "heading",
        text: "Interactive Activity: Digital Twin Factory Simulation"
      },
      {
        type: "paragraph",
        text: "Experience digital twin technology firsthand with this interactive factory simulation. Make operational decisions, run sustainability scenarios, and observe how a virtual replica enables risk-free testing and optimization—demonstrating the core concepts you've just learned."
      },
      {
        type: "interactive-activity",
        component: "DigitalTwinFactoryActivity"
      },
      {
        type: "heading",
        text: "Supply Chain Control Towers"
      },
      {
        type: "paragraph",
        text: "Control towers provide centralized, real-time visibility across the entire supply chain. They aggregate data from multiple sources and systems, enabling holistic monitoring, rapid issue identification, and coordinated response. For sustainability, control towers can track carbon emissions, social compliance metrics, and circular economy indicators across all tiers."
      },
      {
        type: "heading",
        text: "Interactive Activity: Control Tower Dashboard"
      },
      {
        type: "paragraph",
        text: "Experience a supply chain control tower firsthand with this interactive dashboard. Explore how centralized visibility enables real-time monitoring, rapid issue identification, and data-driven decision-making across complex supply networks—demonstrating the control tower concepts you've just learned."
      },
      {
        type: "interactive-activity",
        component: "SupplyChainCompassActivity"
      },
      {
        type: "heading",
        text: "Sustainability Applications"
      },
      {
        type: "list",
        items: [
          "Simulating carbon impact of different sourcing scenarios",
          "Modeling circular economy material flows",
          "Testing resilience of supply networks to climate risks",
          "Optimizing transportation routes for emissions reduction",
          "Identifying sustainability improvement opportunities"
        ]
      }
    ],
    quiz: [
      {
        question: "What is a digital twin?",
        options: [
          "A backup supplier",
          "A virtual replica that simulates the supply chain",
          "A type of blockchain",
          "A duplicate audit report"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: How could a fashion company use a digital twin to improve the sustainability of its supply chain?",
        isEssay: true
      }
    ]
  },
  {
    title: "Leveraging Key AI Tools for Supply Chain Sustainability",
    subtitle: "Practical applications of AI technologies in sustainable sourcing",
    category: "Emerging Technology & AI Integration",
    difficulty: "intermediate",
    objectives: [
      "Identify key AI technologies applicable to supply chain sustainability",
      "Understand use cases for machine learning, NLP, and computer vision",
      "Assess data requirements and implementation considerations",
      "Evaluate ROI and ethical implications of AI deployment"
    ],
    content: [
      {
        type: "heading",
        text: "Machine Learning for Pattern Recognition"
      },
      {
        type: "paragraph",
        text: "Machine learning algorithms can identify patterns in large datasets that humans might miss. Applications include predicting supplier risks, detecting anomalies in audit data, optimizing sourcing decisions, and forecasting sustainability performance."
      },
      {
        type: "heading",
        text: "Natural Language Processing (NLP)"
      },
      {
        type: "paragraph",
        text: "NLP enables computers to understand and analyze human language. In supply chains, NLP can monitor news and social media for reputational risks, analyze worker feedback and grievances, extract insights from audit reports, and automate compliance documentation review."
      },
      {
        type: "heading",
        text: "Computer Vision"
      },
      {
        type: "paragraph",
        text: "Computer vision uses AI to analyze images and video. Applications include satellite monitoring for deforestation, automated facility safety inspections, verification of labor conditions, and quality control that reduces waste."
      },
      {
        type: "heading",
        text: "Implementation Considerations"
      },
      {
        type: "list",
        items: [
          "Data quality and availability requirements",
          "Integration with existing systems",
          "Supplier onboarding and data sharing",
          "Ethical considerations and bias mitigation",
          "Change management and skills development",
          "Cost-benefit analysis and ROI measurement"
        ]
      },
      {
        type: "heading",
        text: "Interactive Activity: AI-Powered Supply Chain Investigation"
      },
      {
        type: "paragraph",
        text: "Experience firsthand how AI tools analyze supplier data and detect risks using the interactive detective-style investigation tool below. This activity demonstrates the key AI capabilities—including machine learning, NLP, knowledge graphs, and anomaly detection—that transform raw data into actionable sustainability insights."
      },
      {
        type: "interactive-activity",
        component: "AIDetectiveDeskActivity"
      }
    ],
    quiz: [
      {
        question: "Which AI technology would be best for monitoring news about supply chain risks?",
        options: [
          "Computer vision",
          "Natural Language Processing (NLP)",
          "Robotics",
          "Blockchain"
        ],
        correctAnswer: 1
      },
      {
        question: "What is a key ethical consideration when using AI in supply chains?",
        options: [
          "AI is always ethical",
          "Potential for bias in algorithms and data",
          "AI is too expensive to be ethical",
          "Only computer vision has ethical issues"
        ],
        correctAnswer: 1
      },
      {
        question: "Essay: Choose one AI technology and describe in detail how it could transform sustainability in a specific industry's supply chain.",
        isEssay: true
      }
    ]
  },
  
  // INTERACTIVE ACTIVITY - Supplier Ethics Assessment
  {
    title: "Interactive Activity: Supplier Ethics Assessment",
    subtitle: "Practice evaluating real-world supplier scenarios using adverse media and verification tools",
    category: "Emerging Technology & AI Integration",
    difficulty: "intermediate",
    objectives: [
      "Apply adverse media monitoring to supplier assessment",
      "Evaluate supplier verification and certification claims",
      "Balance risk factors with positive indicators",
      "Make informed decisions on supplier partnerships",
      "Understand legal and regulatory compliance requirements"
    ],
    content: [
      {
        type: "heading",
        text: "Learning Objectives"
      },
      {
        type: "list",
        items: [
          "Apply adverse media monitoring to supplier assessment",
          "Evaluate supplier verification and certification claims",
          "Balance risk factors with positive indicators",
          "Make informed decisions on supplier partnerships",
          "Understand legal and regulatory compliance requirements"
        ]
      },
      {
        type: "heading",
        text: "About This Activity"
      },
      {
        type: "paragraph",
        text: "In this interactive activity, you'll evaluate five real-world supplier scenarios. Each scenario presents a potential supplier with various information from adverse media monitoring, supplier verification tools, and industry reports. Your task is to determine whether the supplier meets ethical standards for partnership."
      },
      {
        type: "heading",
        text: "How It Works"
      },
      {
        type: "list",
        items: [
          "Review the supplier profile, including location, commodity, and industry",
          "Analyze verification status and third-party certifications",
          "Consider adverse media reports and risk factors",
          "Evaluate positive indicators and corrective actions",
          "Make a decision: Should we partner with this supplier?",
          "Receive immediate feedback with detailed explanations"
        ]
      },
      {
        type: "heading",
        text: "Key Evaluation Criteria"
      },
      {
        type: "paragraph",
        text: "When assessing suppliers, consider multiple factors: credibility of certifications, adverse media from reliable sources, willingness to allow independent verification, corrective action on audit findings, geographic and commodity-specific risks, and compliance with international standards and regulations."
      },
      {
        type: "paragraph",
        text: "The activity below presents five scenarios covering high-risk commodities and regions. Use your knowledge from previous lessons to make informed decisions."
      },
      {
        type: "interactive-activity",
        component: "SupplierEthicsActivity"
      }
    ],
    quiz: []
  }
];