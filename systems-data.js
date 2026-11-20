// systems-data.js
// Calibrated benchmark data for 7 core self-defence parameters

const PARAMETER_CONFIG = [
  {
    id: "threatSurvival",
    label: "Asymmetric & Threat Survival",
    shortLabel: "Threat Survival",
    question: "How critical is preparation for unpredictable real-world violence (edged weapons, multiple attackers, ambushes, no rules)?",
    description: "Effectiveness against street violence, knives, improvised weapons, group attacks, and sudden aggression.",
    color: "#ef4444", // Crimson Red
    accentBg: "rgba(239, 68, 68, 0.15)",
    lowLabel: "Low / Sport Focus",
    highLabel: "Vital Priority"
  },
  {
    id: "deEscalation",
    label: "De-Escalation & UK Law",
    shortLabel: "Law & De-Escalation",
    question: "Do you want training in pre-assault awareness, verbal conflict diffusion, and the legal limits of UK 'reasonable force'?",
    description: "Situational awareness, vocal boundary setting, adrenaline control, avoidance, and post-incident legal safety.",
    color: "#f59e0b", // Amber
    accentBg: "rgba(245, 158, 11, 0.15)",
    lowLabel: "Not Important",
    highLabel: "Essential"
  },
  {
    id: "sport",
    label: "Competitive / Sport & Medals",
    shortLabel: "Sport & Medals",
    question: "How interested are you in tournaments, point-scoring, weight categories, referee rules, and winning trophies/medals?",
    description: "Structured athletic competition, rankings, medals, and sanctioned matches under fair sporting rules.",
    color: "#ec4899", // Pink / Rose
    accentBg: "rgba(236, 72, 153, 0.15)",
    lowLabel: "No Interest",
    highLabel: "Primary Goal"
  },
  {
    id: "fitness",
    label: "Functional Fitness & Stamina",
    shortLabel: "Fitness & Stamina",
    question: "How much do you value building functional cardiovascular endurance, core strength, explosiveness, and combat conditioning?",
    description: "Physical conditioning, aerobic/anaerobic stamina, functional mobility, and explosive body mechanics.",
    color: "#10b981", // Emerald
    accentBg: "rgba(16, 185, 129, 0.15)",
    lowLabel: "Secondary Benefit",
    highLabel: "Major Focus"
  },
  {
    id: "mental",
    label: "Mental Resilience & Stress Inoculation",
    shortLabel: "Mental Resilience",
    question: "How important is overcoming panic, developing composure under adrenal stress, emotional discipline, and calm focus?",
    description: "Adrenal stress inoculation, panic suppression, mental toughness, situational calmness, and personal confidence.",
    color: "#3b82f6", // Blue
    accentBg: "rgba(59, 130, 246, 0.15)",
    lowLabel: "Casual",
    highLabel: "Crucial"
  },
  {
    id: "accessibility",
    label: "Accessibility, Safety & Low Injury Risk",
    shortLabel: "Safety & Low Injury",
    question: "Do you need a supportive, ego-free environment that is safe for working adults, without risking concussions or joint trauma?",
    description: "Beginner-friendly, low barrier to entry, minimal injury risk for working professionals, and ego-free culture.",
    color: "#8b5cf6", // Violet
    accentBg: "rgba(139, 92, 246, 0.15)",
    lowLabel: "Accept High Injury",
    highLabel: "Must Be Safe & Ego-Free"
  },
  {
    id: "progression",
    label: "Technical Progression & Structure",
    shortLabel: "Curriculum & Rank",
    question: "How much do you value a clear, modular syllabus, measurable skill benchmarks, formal rank progression, and long-term depth?",
    description: "Clear syllabus depth, modular rank advancement, structured skill checklists, and long-term mastery.",
    color: "#06b6d4", // Cyan
    accentBg: "rgba(6, 182, 212, 0.15)",
    lowLabel: "Casual / Informal",
    highLabel: "Structured Syllabus"
  }
];

const PRESETS = [
  {
    name: "Real-World Personal Protection",
    tagline: "Prioritises practical safety, knife defence, UK law, and low injury risk over trophies.",
    scores: {
      threatSurvival: 95,
      deEscalation: 90,
      sport: 10,
      fitness: 75,
      mental: 90,
      accessibility: 90,
      progression: 85
    }
  },
  {
    name: "Aspiring Tournament Competitor",
    tagline: "Driven by athletic combat, hard sparring, weight classes, tournaments, and podium medals.",
    scores: {
      threatSurvival: 50,
      deEscalation: 15,
      sport: 95,
      fitness: 95,
      mental: 85,
      accessibility: 40,
      progression: 80
    }
  },
  {
    name: "Fitness, Safety & Confidence",
    tagline: "Looking for an ego-free, low-injury space to get fit, reduce stress, and learn practical defence.",
    scores: {
      threatSurvival: 75,
      deEscalation: 80,
      sport: 20,
      fitness: 85,
      mental: 85,
      accessibility: 95,
      progression: 70
    }
  },
  {
    name: "Traditional Martial Arts Enthusiast",
    tagline: "Values classical belt advancement, forms, disciplined philosophy, and formal rank hierarchy.",
    scores: {
      threatSurvival: 45,
      deEscalation: 55,
      sport: 60,
      fitness: 75,
      mental: 85,
      accessibility: 75,
      progression: 95
    }
  }
];

const SYSTEMS_DATA = {
  jethRandolph: {
    id: "jethRandolph",
    name: "Jeth Randolph (Force Necessary UK – Stroud)",
    tag: "Reality-Based Practical Self-Defence",
    isPrimary: true,
    color: "#ef4444",
    borderColor: "rgba(239, 68, 68, 1)",
    backgroundColor: "rgba(239, 68, 68, 0.25)",
    scores: {
      threatSurvival: 95,
      deEscalation: 90,
      sport: 10,
      fitness: 80,
      mental: 90,
      accessibility: 88,
      progression: 90
    },
    summary: "Practical modern self-protection taught in Stroud by Jeth Randolph. Focuses on uncooperative violence, edged-weapon awareness, multiple attackers, UK reasonable force legalities, and adrenaline control within Hock Hochheim's internationally recognized syllabus.",
    strengths: [
      "No sport rules: trains explicitly for ambushes, knives, multiple attackers, and standing escapes.",
      "Thorough coverage of UK self-defence law, reasonable force, and verbal boundary de-escalation.",
      "Ego-free, safe, welcoming class atmosphere at Lansdown Hall in Stroud.",
      "Clear modular progression under Force Necessary (Unarmed & Knife Instructor lineages)."
    ],
    limitations: [
      "Zero tournament sport focus: does not compete for medals, points, or weight-class trophies.",
      "Omits sports submissions (like pulling guard) that risk your head on street pavement."
    ],
    idealFor: "Students in Gloucestershire looking for realistic, no-nonsense self-protection, knife awareness, and functional confidence without martial arts dogma."
  },
  mmaBjj: {
    id: "mmaBjj",
    name: "Combat Sports / MMA & BJJ",
    tag: "Sport Combat & Live Sparring",
    isPrimary: false,
    color: "#ec4899",
    borderColor: "rgba(236, 72, 153, 1)",
    backgroundColor: "rgba(236, 72, 153, 0.18)",
    scores: {
      threatSurvival: 58,
      deEscalation: 15,
      sport: 98,
      fitness: 96,
      mental: 85,
      accessibility: 52,
      progression: 86
    },
    summary: "World-class 1-on-1 athletic fighting, ground submissions, and live full-resistance sparring. Highly demanding physically, but assumes 1-on-1 conditions without weapons or legal self-defence constraints.",
    strengths: [
      "Supreme 1-on-1 athletic conditioning, live pressure testing, and timing.",
      "Abundant competitive circuits, belt divisions, and medal tournaments."
    ],
    limitations: [
      "Sport assumptions: 1-on-1, flat mats, referee stops, no concealed knives.",
      "Higher injury rate; ground entanglement (guard) is hazardous on concrete against multiple foes."
    ],
    idealFor: "Athletes hungry for intense physical competition, tournament podiums, and full-contact sport sparring."
  },
  traditionalMartialArts: {
    id: "traditionalMartialArts",
    name: "Traditional Martial Arts (Karate / Taekwondo)",
    tag: "Forms, Tradition & Belt Hierarchy",
    isPrimary: false,
    color: "#3b82f6",
    borderColor: "rgba(59, 130, 246, 1)",
    backgroundColor: "rgba(59, 130, 246, 0.18)",
    scores: {
      threatSurvival: 38,
      deEscalation: 45,
      sport: 65,
      fitness: 70,
      mental: 85,
      accessibility: 72,
      progression: 94
    },
    summary: "Rich cultural heritage, choreographed forms (kata/poomsae), and strict belt hierarchies. Slower direct transfer to modern street violence or knife encounters.",
    strengths: [
      "Rigorous belt rankings, long-term technical depth, and classical discipline.",
      "Improves balance, flexibility, and coordination."
    ],
    limitations: [
      "Often relies on compliant training partners and choreographed movements.",
      "Rarely addresses modern edged-weapon dynamics or contemporary UK legal frameworks."
    ],
    idealFor: "Students seeking cultural discipline, ceremonial traditions, artistic forms, and classical belt advancement."
  },
  kravMaga: {
    id: "kravMaga",
    name: "Generic Krav Maga",
    tag: "High Aggression Tactical Drills",
    isPrimary: false,
    color: "#10b981",
    borderColor: "rgba(16, 185, 129, 1)",
    backgroundColor: "rgba(16, 185, 129, 0.18)",
    scores: {
      threatSurvival: 85,
      deEscalation: 40,
      sport: 10,
      fitness: 85,
      mental: 80,
      accessibility: 70,
      progression: 65
    },
    summary: "Military-inspired rapid aggression drills and direct counter-attacks. High cardio workout, but variable quality control and often lacks nuanced UK legal boundary training.",
    strengths: [
      "Direct, aggressive responses and simple gross-motor retaliations.",
      "High tempo cardiovascular drills."
    ],
    limitations: [
      "Commercial quality varies heavily; can promote excessive violence exceeding UK reasonable force.",
      "Often lacks systematic technical progression once core bursts are drilled."
    ],
    idealFor: "Those wanting fast-paced aggression workouts and military-style conditioning."
  },
  boxingMuayThai: {
    id: "boxingMuayThai",
    name: "Boxing & Muay Thai",
    tag: "Stand-Up Striking & Conditioning",
    isPrimary: false,
    color: "#f59e0b",
    borderColor: "rgba(245, 158, 11, 1)",
    backgroundColor: "rgba(245, 158, 11, 0.18)",
    scores: {
      threatSurvival: 52,
      deEscalation: 15,
      sport: 94,
      fitness: 95,
      mental: 82,
      accessibility: 50,
      progression: 70
    },
    summary: "Elite punching, kicking, clinch control, and cardiovascular stamina. However, gloved ring sport does not prepare for open-hand grabs, knives, ground recovery, or UK self-defence legal limits.",
    strengths: [
      "Exceptional striking power, footwork, head movement, and punch resistance.",
      "Incredible athletic conditioning and anaerobic endurance."
    ],
    limitations: [
      "Zero knife/weapon awareness or legal de-escalation training.",
      "Higher rate of head impact and joint strain."
    ],
    idealFor: "Those seeking world-class striking technique, ring fitness, and sport bout opportunities."
  }
};
