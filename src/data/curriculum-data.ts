// Curriculum lesson data for bulk import
// This file contains all pre-built lessons across modules

export const curriculumLessons = {
  responsibleSourcing: [
    {
      "title": "Ethical Labor & Human Rights",
      "subtitle": "Understanding wages, working conditions, and prevention of child and forced labor",
      "category": "Responsible Sourcing",
      "difficulty": "beginner",
      "objectives": [
        "Define ethical labor practices and fundamental human rights in supply chains",
        "Identify core principles of fair wages and safe working conditions",
        "Recognize indicators of child labor and forced labor",
        "Understand the business impact of upholding human rights"
      ],
      "content": [
        {
          "type": "heading",
          "text": "What Are Ethical Labor Practices?"
        },
        {
          "type": "paragraph",
          "text": "Ethical labor practices refer to employment standards that respect workers' rights, ensure safe working conditions, provide fair wages, and strictly prohibit child and forced labor. These practices are fundamental to responsible sourcing and sustainable supply chain management."
        },
        {
          "type": "heading",
          "text": "Core Principles of Ethical Labor"
        },
        {
          "type": "list",
          "items": [
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
          "type": "paragraph",
          "text": "These principles are derived from the International Labour Organization (ILO) conventions and form the foundation of ethical sourcing programs worldwide."
        },
        {
          "type": "heading",
          "text": "Indicators of Child and Forced Labor"
        },
        {
          "type": "paragraph",
          "text": "Child labor indicators include workers who appear underage, lack of age verification documents, children working during school hours, and hazardous work performed by young workers. Forced labor indicators include withholding of identity documents, restriction of movement, debt bondage, threats or intimidation, payment below minimum wage, and excessive overtime without consent."
        },
        {
          "type": "heading",
          "text": "Business Benefits of Ethical Labor Practices"
        },
        {
          "type": "list",
          "items": [
            "Reduced reputational risks and brand protection",
            "Improved worker productivity and product quality",
            "Lower employee turnover and recruitment costs",
            "Enhanced supply chain resilience and reliability",
            "Better investor relations and ESG ratings",
            "Compliance with regulatory requirements and customer expectations"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which of the following is a core principle of ethical labor practices?",
          "options": [
            "Maximizing profits at all costs",
            "Fair wages and safe working conditions",
            "Unlimited overtime without breaks",
            "Restricting worker movement"
          ],
          "correctAnswer": 1
        },
        {
          "question": "What is an indicator of forced labor?",
          "options": [
            "Workers receiving fair wages",
            "Freedom to leave employment",
            "Withholding of identity documents",
            "Voluntary overtime"
          ],
          "correctAnswer": 2
        },
        {
          "question": "What does ILO stand for?",
          "options": [
            "International Labor Organization",
            "International Labour Organization",
            "Independent Labor Office",
            "International Legal Operations"
          ],
          "correctAnswer": 1
        },
        {
          "question": "Essay: Explain why ethical labor practices can actually improve a company's profitability, beyond just being 'the right thing to do.'",
          "isEssay": true
        }
      ]
    },
    {
      "title": "Transparency & Traceability",
      "subtitle": "Creating visible, accountable supply chains through technology and disclosure",
      "category": "Responsible Sourcing",
      "difficulty": "intermediate",
      "objectives": [
        "Understand the importance of supply chain transparency",
        "Evaluate different traceability technologies and their applications",
        "Design transparency initiatives that balance disclosure with competitive concerns",
        "Implement systems for tracking products and practices across supply tiers"
      ],
      "content": [
        {
          "type": "heading",
          "text": "The Transparency Imperative"
        },
        {
          "type": "paragraph",
          "text": "Modern consumers, investors, and regulators demand unprecedented visibility into supply chain practices. Transparency builds trust, enables accountability, and drives continuous improvement. However, achieving meaningful transparency requires sophisticated systems that can track products and practices across complex, multi-tier supply chains."
        },
        {
          "type": "heading",
          "text": "Traceability Technology Landscape"
        },
        {
          "type": "list",
          "items": [
            "Blockchain: Creates immutable records of product journey and transactions, ideal for high-value or high-risk commodities",
            "IoT Sensors: Enable real-time monitoring of environmental conditions, location, and handling during transport",
            "RFID/NFC Tags: Provide unique product identification and authentication capabilities",
            "Digital Platforms: Centralize supplier data, certifications, and audit results for stakeholder access",
            "QR Codes: Offer consumer-facing interfaces to access product origin and sustainability information",
            "Satellite Monitoring: Tracks deforestation, land use changes, and geographic sourcing claims"
          ]
        },
        {
          "type": "heading",
          "text": "Levels of Supply Chain Transparency"
        },
        {
          "type": "paragraph",
          "text": "Transparency operates at different levels. Tier 1 transparency reveals direct suppliers. Tier 2 extends to suppliers' suppliers. Full traceability tracks back to raw material origins. Companies must decide appropriate scope based on risk, resources, and stakeholder expectations. High-risk commodities (conflict minerals, cotton, cocoa) often require deeper traceability."
        },
        {
          "type": "heading",
          "text": "Balancing Transparency with Competitive Concerns"
        },
        {
          "type": "paragraph",
          "text": "Organizations must balance transparency with practical and competitive concerns. Key decisions include: determining appropriate scope (which tiers, which products), selecting technology based on specific use cases and infrastructure constraints, ensuring data accuracy through verification mechanisms, managing supplier onboarding and capacity building, and defining what information to share publicly versus keep proprietary."
        },
        {
          "type": "heading",
          "text": "Building Trust Beyond Technology"
        },
        {
          "type": "paragraph",
          "text": "Technology alone does not create transparency. Organizations must also cultivate a culture of openness, establish clear disclosure policies, engage stakeholders in defining what transparency means, verify claims through independent third parties, and be willing to acknowledge challenges and areas for improvement."
        }
      ],
      "quiz": [
        {
          "question": "Which technology is BEST suited for creating immutable records of product journey?",
          "options": [
            "QR Codes",
            "Blockchain",
            "Excel spreadsheets",
            "Email chains"
          ],
          "correctAnswer": 1
        },
        {
          "question": "What does Tier 2 transparency refer to?",
          "options": [
            "Only direct suppliers",
            "Suppliers' suppliers",
            "Only raw material origins",
            "Final consumers"
          ],
          "correctAnswer": 1
        },
        {
          "question": "Which technology enables tracking of deforestation in agricultural supply chains?",
          "options": [
            "Blockchain",
            "RFID tags",
            "Satellite monitoring",
            "QR codes"
          ],
          "correctAnswer": 2
        },
        {
          "question": "Essay: Design a traceability program for a coffee company sourcing from multiple smallholder farmers in Ethiopia. Which technologies would you use and why? What challenges might you face?",
          "isEssay": true
        }
      ]
    },
    {
      "title": "Environmental Management",
      "subtitle": "Integrating environmental criteria into sourcing and supplier performance",
      "category": "Responsible Sourcing",
      "difficulty": "intermediate",
      "objectives": [
        "Identify key environmental impacts across supply chain stages",
        "Develop environmental performance criteria for supplier evaluation",
        "Implement supplier environmental capacity building programs",
        "Measure and reduce scope 3 emissions through sourcing strategies"
      ],
      "content": [
        {
          "type": "heading",
          "text": "Environmental Impacts Across the Supply Chain"
        },
        {
          "type": "paragraph",
          "text": "Supply chains generate significant environmental impacts including greenhouse gas emissions from transportation and manufacturing, water consumption and pollution from production processes, waste generation from packaging and product lifecycle, biodiversity loss from raw material extraction, and chemical use in agriculture and manufacturing."
        },
        {
          "type": "heading",
          "text": "Supplier Environmental Assessment Criteria"
        },
        {
          "type": "list",
          "items": [
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
          "type": "heading",
          "text": "Building Supplier Environmental Capacity"
        },
        {
          "type": "paragraph",
          "text": "Many suppliers, especially small and medium enterprises, lack resources or knowledge to implement strong environmental practices. Leading companies invest in supplier capacity building through technical assistance programs, joint investment in cleaner technologies, training on environmental management systems, and long-term partnerships that enable suppliers to make necessary improvements."
        },
        {
          "type": "heading",
          "text": "Addressing Scope 3 Emissions"
        },
        {
          "type": "paragraph",
          "text": "For most companies, the majority of carbon emissions occur in their supply chain (Scope 3 emissions). Effective strategies include supplier engagement programs with emissions reduction targets, low-carbon sourcing criteria in procurement decisions, optimization of logistics and transportation modes, circular economy initiatives to reduce virgin material use, and collaboration on renewable energy adoption throughout the value chain."
        }
      ],
      "quiz": [
        {
          "question": "What are Scope 3 emissions?",
          "options": [
            "Emissions from company-owned facilities",
            "Emissions from purchased electricity",
            "Emissions from the supply chain and product lifecycle",
            "Emissions from employee commuting only"
          ],
          "correctAnswer": 2
        },
        {
          "question": "Which certification demonstrates a supplier has an environmental management system?",
          "options": [
            "ISO 9001",
            "ISO 14001",
            "SA 8000",
            "LEED"
          ],
          "correctAnswer": 1
        },
        {
          "question": "What is the BEST approach to improve environmental performance of small suppliers?",
          "options": [
            "Immediately switch to suppliers with better performance",
            "Ignore small suppliers since they have minimal impact",
            "Provide capacity building and technical assistance",
            "Require certifications without offering support"
          ],
          "correctAnswer": 2
        },
        {
          "question": "Essay: You're sourcing electronic components from suppliers in Southeast Asia. Describe how you would assess and improve their environmental performance, including specific metrics you would track.",
          "isEssay": true
        }
      ]
    },
    {
      "title": "Rationale & Benefits of Responsible Sourcing",
      "subtitle": "Building the business case for sustainability in supply chains",
      "category": "Responsible Sourcing",
      "difficulty": "beginner",
      "objectives": [
        "Articulate the business rationale for responsible sourcing beyond compliance",
        "Quantify financial and strategic benefits of sustainable supply chains",
        "Address common objections and misconceptions",
        "Communicate value to stakeholders across the organization"
      ],
      "content": [
        {
          "type": "heading",
          "text": "Beyond Compliance: Strategic Value Creation"
        },
        {
          "type": "paragraph",
          "text": "While many organizations initially approach responsible sourcing as a compliance or risk management exercise, leading companies recognize it as a strategic opportunity to create value, differentiate their brand, drive innovation, and build competitive advantage in increasingly sustainability-conscious markets."
        },
        {
          "type": "heading",
          "text": "Key Business Benefits"
        },
        {
          "type": "list",
          "items": [
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
          "type": "heading",
          "text": "Addressing Common Objections"
        },
        {
          "type": "paragraph",
          "text": "Common pushback includes 'sustainability is too expensive,' 'our customers don't care,' and 'we're too small to make a difference.' Effective responses focus on total cost of ownership (sustainability prevents expensive problems), growing customer and investor expectations (supported by data), and collective impact (even small companies influence their supply chains and contribute to systemic change)."
        },
        {
          "type": "heading",
          "text": "Communicating the Business Case"
        },
        {
          "type": "paragraph",
          "text": "Tailor messaging to different stakeholders. For executives, emphasize financial ROI and risk mitigation. For procurement teams, highlight supplier performance and cost savings. For marketing, focus on brand differentiation and customer loyalty. For operations, stress quality improvements and efficiency gains. Use specific metrics and case studies to make the case concrete and credible."
        }
      ],
      "quiz": [
        {
          "question": "Which represents a revenue growth opportunity from responsible sourcing?",
          "options": [
            "Avoiding regulatory fines",
            "Premium pricing for sustainable products",
            "Reducing waste in production",
            "Improving worker safety"
          ],
          "correctAnswer": 1
        },
        {
          "question": "What does ESG stand for?",
          "options": [
            "Environmental, Social, Governance",
            "Ethical Sourcing Guidelines",
            "Energy Savings Goals",
            "External Stakeholder Groups"
          ],
          "correctAnswer": 0
        },
        {
          "question": "What is 'total cost of ownership' in the context of responsible sourcing?",
          "options": [
            "Just the purchase price of goods",
            "A model that captures hidden costs of unsustainable practices",
            "The cost of auditing suppliers",
            "Employee salary costs"
          ],
          "correctAnswer": 1
        },
        {
          "question": "Essay: You need to convince a cost-focused procurement manager to prioritize responsible sourcing. Build a business case that addresses their concerns about price and demonstrates tangible value.",
          "isEssay": true
        }
      ]
    }
  ],
  // I'll create stub data for the other modules - you can expand these later
  generalSolutions: [] as any[],
  emergingTech: [] as any[],
  personalizedModules: [] as any[]
};
