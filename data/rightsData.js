// data/rightsData.js
export const RIGHTS_DATA = [
  {
    id: 'equality',
    title: 'Right to Equality',
    articles: '14-18',
    short: 'Everyone is equal before the law.',
    detailed: 'The Right to Equality ensures that all persons are equal before the law and prohibits discrimination on grounds of religion, race, caste, sex, or place of birth. It guarantees equal protection of the laws within the territory of India.',
    example: 'No one denied schooling due to caste.',
    icon: '⚖️', // Scale icon
    

  },
  {
    id: 'freedom',
    title: 'Right to Freedom',
    articles: '19-22',
    short: 'Freedom of speech, movement & profession.',
    detailed: 'The Right to Freedom includes freedom of speech and expression, assembly, association, movement, residence, and profession. It allows citizens to express opinions freely and move throughout the country.',
    example: 'You can express opinions publicly.',
    icon: '🗣️', // Speech bubble
  },
  {
    id: 'exploitation',
    title: 'Right Against Exploitation',
    articles: '23-24',
    short: 'No forced or child labour.',
    detailed: 'The Right Against Exploitation prohibits trafficking in human beings, forced labour, and child labour. It ensures protection from economic exploitation and inhumane conditions.',
    example: 'Children cannot be made to work in factories.',
    icon: '🛡️', // Shield
  },
  {
    id: 'religion',
    title: 'Freedom of Religion',
    articles: '25-28',
    short: 'Follow the religion you choose.',
    detailed: 'The Freedom of Religion guarantees freedom of conscience and the right to profess, practice, and propagate religion. It also ensures that the state does not discriminate on religious grounds.',
    example: 'Able to worship freely.',
    icon: '🙏', // Prayer hands
  },
  {
    id: 'culture',
    title: 'Cultural & Educational Rights',
    articles: '29-30',
    short: 'Protect minority culture & schools.',
    detailed: 'The Cultural and Educational Rights protect the rights of cultural, linguistic, and religious minorities to conserve their heritage and establish educational institutions.',
    example: 'Minority schools may be set up.',
    icon: '🎓', // Graduation cap
  },
  {
    id: 'remedies',
    title: 'Right to Constitutional Remedies',
    articles: '32',
    short: 'Approach courts if rights violated.',
    detailed: 'The Right to Constitutional Remedies allows citizens to move the Supreme Court for enforcement of fundamental rights. It is the most important right as it provides a remedy for violation of other rights.',
    example: 'File a petition in Supreme Court.',
    icon: '⚖️', // Scales of justice
  },
  {
    id: 'quality',
    title: 'Right to Education',
    articles: '21A',
    short: 'Free and compulsory education.',
    detailed: 'The Right to Education ensures free and compulsory education for all children between the age of 6 to 14 years.',
    example: 'Every child has the right to education.',
    icon: '📚',
  },
];

export const SCENARIOS = [
  {
    id: 1,
    scenario: 'You are a student from a lower caste background. The school principal refuses to admit you because of your caste. What right is being violated?',
    options: [
      { text: 'Right to Equality (Article 14)', correct: true },
      { text: 'Right to Freedom (Article 19)', correct: false },
      { text: 'Right to Education (Article 21A)', correct: false },
    ],
    explanation: 'This violates the Right to Equality as it discriminates based on caste.',
  },
  {
    id: 2,
    scenario: 'A journalist is arrested for criticizing the government in a newspaper article. Which right is affected?',
    options: [
      { text: 'Right to Freedom of Speech (Article 19)', correct: true },
      { text: 'Right Against Exploitation (Article 23)', correct: false },
      { text: 'Right to Constitutional Remedies (Article 32)', correct: false },
    ],
    explanation: 'Freedom of speech and expression is protected under Article 19.',
  },
  {
    id: 3,
    scenario: 'A child is forced to work in a factory instead of going to school. What fundamental right is violated?',
    options: [
      { text: 'Right Against Exploitation (Article 23)', correct: true },
      { text: 'Cultural and Educational Rights (Article 29)', correct: false },
      { text: 'Freedom of Religion (Article 25)', correct: false },
    ],
    explanation: 'Child labour is prohibited under the Right Against Exploitation.',
  },
  {
    id: 4,
    scenario: 'A minority community wants to set up their own school to preserve their culture. Is this allowed?',
    options: [
      { text: 'Yes, under Cultural and Educational Rights (Article 29)', correct: true },
      { text: 'No, only government schools are allowed', correct: false },
      { text: 'Only if approved by the majority community', correct: false },
    ],
    explanation: 'Article 29 protects the rights of minorities to establish educational institutions.',
  },
  {
    id: 5,
    scenario: 'Your neighbor is being beaten by police without any reason. You want to file a petition in court. Which right allows this?',
    options: [
      { text: 'Right to Constitutional Remedies (Article 32)', correct: true },
      { text: 'Right to Equality (Article 14)', correct: false },
      { text: 'Right to Freedom (Article 19)', correct: false },
    ],
    explanation: 'Article 32 allows citizens to approach the Supreme Court for enforcement of fundamental rights.',
  },
];

export const MCQ_DATA = {
  equality: [
    {
      question: "What does the Right to Equality ensure?",
      options: ["Everyone is equal before the law", "Only men are equal", "Only rich people are equal", "Only Hindus are equal"],
      correct: 0,
      explanation: "The Right to Equality ensures that all persons are equal before the law and prohibits discrimination."
    },
    {
      question: "Which grounds are prohibited for discrimination under Article 14?",
      options: ["Religion, race, caste, sex, place of birth", "Only caste", "Only religion", "Only sex"],
      correct: 0,
      explanation: "Article 14 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth."
    },
    {
      question: "What is the main purpose of the Right to Equality?",
      options: ["Equal protection of the laws", "Unequal treatment", "Favoritism", "Exploitation"],
      correct: 0,
      explanation: "It guarantees equal protection of the laws within the territory of India."
    },
    {
      question: "Can the government discriminate based on caste?",
      options: ["No, it is prohibited", "Yes, sometimes", "Only in villages", "Only in cities"],
      correct: 0,
      explanation: "The Constitution prohibits discrimination on grounds of caste."
    },
    {
      question: "What does Article 15 prohibit?",
      options: ["Discrimination on grounds of religion, race, caste, sex", "Freedom of speech", "Right to property", "Right to vote"],
      correct: 0,
      explanation: "Article 15 prohibits discrimination in access to public places."
    },
    {
      question: "Is untouchability abolished under the Right to Equality?",
      options: ["Yes, under Article 17", "No", "Only in some states", "Only for women"],
      correct: 0,
      explanation: "Article 17 abolishes untouchability and forbids its practice."
    },
    {
      question: "What does Article 16 ensure?",
      options: ["Equality of opportunity in public employment", "Private jobs only", "Only for men", "Only for women"],
      correct: 0,
      explanation: "Article 16 ensures equality of opportunity in matters of public employment."
    },
    {
      question: "Can reservations be made for backward classes?",
      options: ["Yes, under Article 16(4)", "No, never", "Only for SC/ST", "Only for minorities"],
      correct: 0,
      explanation: "Article 16(4) allows for reservations in favor of backward classes."
    },
    {
      question: "What is the significance of the Right to Equality?",
      options: ["It forms the bedrock of democracy", "It allows inequality", "It promotes caste system", "It ignores minorities"],
      correct: 0,
      explanation: "The Right to Equality is fundamental to a democratic society."
    },
    {
      question: "Which article deals with abolition of titles?",
      options: ["Article 18", "Article 14", "Article 15", "Article 16"],
      correct: 0,
      explanation: "Article 18 abolishes titles and prohibits acceptance of titles from foreign states."
    }
  ],
  quality: [
    {
      question: "What does Article 21A of the Indian Constitution provide?",
      options: ["Right to Education", "Right to Property", "Right to Freedom", "Right to Equality"],
      correct: 0,
      explanation: "Article 21A provides the Right to Education, ensuring free and compulsory education for children aged 6 to 14."
    },
    {
      question: "For which age group is education free and compulsory under Article 21A?",
      options: ["6 to 14 years", "5 to 15 years", "7 to 16 years", "4 to 12 years"],
      correct: 0,
      explanation: "Article 21A mandates free and compulsory education for children between 6 and 14 years of age."
    },
    {
      question: "What is the primary goal of the Right to Education?",
      options: ["To provide quality education to all children", "To promote higher education only", "To restrict education to certain castes", "To make education optional"],
      correct: 0,
      explanation: "The Right to Education aims to ensure that every child receives quality education without discrimination."
    },
    {
      question: "Is the Right to Education applicable to private schools?",
      options: ["Yes, they must follow RTE norms", "No, only government schools", "Only for minority schools", "Only for urban areas"],
      correct: 0,
      explanation: "Private schools are required to adhere to the Right to Education Act and provide free education to a certain percentage of students."
    },
    {
      question: "What does the Right to Education prohibit?",
      options: ["Denial of admission due to inability to pay fees", "Charging high fees", "Providing education only to boys", "All of the above"],
      correct: 3,
      explanation: "The RTE Act prohibits schools from denying admission or charging capitation fees, and ensures education for all children."
    },
    {
      question: "Which year was the Right to Education added to the Constitution?",
      options: ["2002", "2009", "2010", "1993"],
      correct: 1,
      explanation: "The Right to Education was added as Article 21A in 2009 through the 86th Constitutional Amendment."
    },
    {
      question: "What is the role of the government in implementing the Right to Education?",
      options: ["To establish and maintain schools", "To ignore private education", "To charge fees from parents", "To limit school hours"],
      correct: 0,
      explanation: "The government is responsible for providing infrastructure and ensuring that education is accessible to all."
    },
    {
      question: "Can parents be held responsible if they do not send their children to school?",
      options: ["Yes, under certain conditions", "No, education is optional", "Only for rich families", "Only for rural areas"],
      correct: 0,
      explanation: "Parents can face penalties if they fail to ensure their children attend school, as per the RTE Act."
    },
    {
      question: "What is the significance of the Right to Education?",
      options: ["It empowers future generations", "It promotes illiteracy", "It restricts knowledge", "It favors only elites"],
      correct: 0,
      explanation: "The Right to Education is crucial for building a knowledgeable and empowered society."
    },
    {
      question: "Which international convention influenced the Right to Education in India?",
      options: ["Convention on the Rights of the Child", "Universal Declaration of Human Rights", "Both A and B", "None"],
      correct: 2,
      explanation: "India's commitment to the Right to Education is influenced by both the UNCRC and UDHR."
    }
  ],
  freedom: [
    {
      question: "What does Article 19 of the Indian Constitution guarantee?",
      options: ["Right to Freedom", "Right to Equality", "Right to Property", "Right to Education"],
      correct: 0,
      explanation: "Article 19 guarantees the Right to Freedom, including speech, expression, assembly, association, movement, residence, and profession."
    },
    {
      question: "Which of the following is NOT protected under Article 19?",
      options: ["Freedom of speech and expression", "Freedom to practice any profession", "Freedom from arrest", "Freedom of assembly"],
      correct: 2,
      explanation: "Freedom from arbitrary arrest is protected under Article 22, not Article 19."
    },
    {
      question: "Can the government impose reasonable restrictions on freedom of speech?",
      options: ["Yes, for public order and decency", "No, never", "Only during elections", "Only for minorities"],
      correct: 0,
      explanation: "Article 19 allows reasonable restrictions on freedoms for purposes like public order, morality, and security."
    },
    {
      question: "What does freedom of assembly mean?",
      options: ["Right to peacefully assemble without arms", "Right to form armed groups", "Right to protest violently", "Right to gather secretly"],
      correct: 0,
      explanation: "Freedom of assembly allows citizens to assemble peacefully and without arms, subject to reasonable restrictions."
    },
    {
      question: "Is freedom of movement restricted within India?",
      options: ["No, citizens can move freely", "Yes, only in border areas", "Yes, only for foreigners", "Yes, always"],
      correct: 0,
      explanation: "Article 19(1)(d) guarantees freedom of movement throughout the territory of India."
    },
    {
      question: "What is the significance of freedom of profession under Article 19?",
      options: ["Citizens can practice any lawful profession", "Only government jobs allowed", "Professions can be banned", "Only for skilled workers"],
      correct: 0,
      explanation: "Article 19(1)(g) allows citizens to practice any profession, trade, or business, subject to reasonable restrictions."
    },
    {
      question: "Can the state impose restrictions on freedom of association?",
      options: ["Yes, for public order and morality", "No, never", "Only for political parties", "Only for unions"],
      correct: 0,
      explanation: "Reasonable restrictions can be imposed on freedom of association for sovereignty, integrity, public order, and morality."
    },
    {
      question: "What does Article 20 protect?",
      options: ["Protection in respect of conviction for offences", "Freedom of speech", "Right to property", "Right to vote"],
      correct: 0,
      explanation: "Article 20 provides protection against double jeopardy, self-incrimination, and ex post facto laws."
    },
    {
      question: "Is the Right to Freedom available to all persons in India?",
      options: ["Yes, to all citizens", "No, only to adults", "No, only to men", "No, only to Hindus"],
      correct: 0,
      explanation: "The Right to Freedom under Article 19 is available to all citizens of India."
    },
    {
      question: "What is the purpose of Article 21?",
      options: ["Protection of life and personal liberty", "Freedom of speech", "Right to equality", "Right to property"],
      correct: 0,
      explanation: "Article 21 states that no person shall be deprived of his life or personal liberty except according to procedure established by law."
    }
  ],
  exploitation: [
    {
      question: "What does Article 23 of the Indian Constitution prohibit?",
      options: ["Trafficking in human beings and forced labour", "Freedom of speech", "Right to property", "Discrimination based on caste"],
      correct: 0,
      explanation: "Article 23 prohibits trafficking in human beings and all forms of forced labour."
    },
    {
      question: "Is begar a form of forced labour?",
      options: ["Yes, it is prohibited", "No, it is allowed", "Only in rural areas", "Only for women"],
      correct: 0,
      explanation: "Begar, or forced labour without payment, is abolished under Article 23."
    },
    {
      question: "What does Article 24 protect children from?",
      options: ["Employment in factories before age 14", "Education", "Voting rights", "Freedom of speech"],
      correct: 0,
      explanation: "Article 24 prohibits the employment of children below the age of 14 in factories or mines."
    },
    {
      question: "Can the state make laws to prevent economic exploitation?",
      options: ["Yes, under Article 23", "No, never", "Only for adults", "Only for men"],
      correct: 0,
      explanation: "Article 23 allows the state to make laws prohibiting forced labour and economic exploitation."
    },
    {
      question: "What is the main purpose of the Right Against Exploitation?",
      options: ["To protect vulnerable individuals from exploitation", "To allow forced labour", "To promote child labour", "To restrict education"],
      correct: 0,
      explanation: "The Right Against Exploitation aims to safeguard people from being exploited economically or physically."
    },
    {
      question: "Is trafficking in human beings allowed under any circumstances?",
      options: ["No, it is completely prohibited", "Yes, for certain purposes", "Only in foreign countries", "Only for adults"],
      correct: 0,
      explanation: "Article 23 strictly prohibits all forms of trafficking in human beings."
    },
    {
      question: "What age is considered for prohibiting child labour in hazardous occupations?",
      options: ["Below 14 years", "Below 18 years", "Below 21 years", "Below 16 years"],
      correct: 0,
      explanation: "Article 24 prohibits employment of children below 14 in factories, mines, or other hazardous occupations."
    },
    {
      question: "Can forced labour be imposed as a punishment for crime?",
      options: ["No, it is unconstitutional", "Yes, always", "Only for minor crimes", "Only in prisons"],
      correct: 0,
      explanation: "Forced labour as a punishment is prohibited, except as a consequence of a lawful sentence."
    },
    {
      question: "What does the Right Against Exploitation ensure?",
      options: ["Protection from inhumane conditions", "Right to exploit others", "Freedom to work long hours", "Right to beg"],
      correct: 0,
      explanation: "It ensures protection from economic exploitation and inhumane working conditions."
    },
    {
      question: "Which articles cover the Right Against Exploitation?",
      options: ["Articles 23 and 24", "Articles 14 and 15", "Articles 19 and 20", "Articles 25 and 26"],
      correct: 0,
      explanation: "Articles 23 and 24 deal with prohibition of forced labour, trafficking, and child labour."
    }
  ],
  religion: [
    {
      question: "What does Article 25 of the Indian Constitution guarantee?",
      options: ["Freedom of conscience and free profession, practice, and propagation of religion", "Right to property", "Freedom of speech", "Right to equality"],
      correct: 0,
      explanation: "Article 25 guarantees freedom of conscience and the right to profess, practice, and propagate religion."
    },
    {
      question: "Can the state regulate religious practices in the interest of public order?",
      options: ["Yes, subject to reasonable restrictions", "No, never", "Only for minorities", "Only for Hindus"],
      correct: 0,
      explanation: "Article 25 allows reasonable restrictions on religious practices for public order, morality, and health."
    },
    {
      question: "What does freedom of conscience mean?",
      options: ["Freedom to believe or not believe in any religion", "Freedom to force beliefs on others", "Freedom to discriminate", "Freedom to worship only one god"],
      correct: 0,
      explanation: "Freedom of conscience allows individuals to hold or not hold any religious belief."
    },
    {
      question: "Is propagation of religion allowed under Article 25?",
      options: ["Yes, it is protected", "No, it is prohibited", "Only in private", "Only for missionaries"],
      correct: 0,
      explanation: "Article 25 includes the right to propagate religion, subject to reasonable restrictions."
    },
    {
      question: "What does Article 26 protect?",
      options: ["Rights of religious denominations to manage their affairs", "Freedom of speech", "Right to property", "Right to vote"],
      correct: 0,
      explanation: "Article 26 allows religious denominations to establish and maintain institutions for religious purposes."
    },
    {
      question: "Can the state impose taxes on religious institutions?",
      options: ["Yes, for charitable purposes", "No, never", "Only on Hindu temples", "Only on churches"],
      correct: 0,
      explanation: "Article 27 prohibits taxes on religious grounds, but allows taxes for charitable purposes."
    },
    {
      question: "What does Article 28 prohibit?",
      options: ["Religious instruction in state-funded schools", "Freedom of religion", "Right to education", "Right to assembly"],
      correct: 0,
      explanation: "Article 28 prohibits religious instruction in educational institutions wholly maintained by the state."
    },
    {
      question: "Is the Freedom of Religion available to all citizens?",
      options: ["Yes, to all persons", "No, only to Hindus", "No, only to minorities", "No, only to adults"],
      correct: 0,
      explanation: "Freedom of Religion is a fundamental right available to all citizens and persons in India."
    },
    {
      question: "What is the significance of Freedom of Religion?",
      options: ["It promotes secularism and tolerance", "It allows religious discrimination", "It restricts beliefs", "It favors one religion"],
      correct: 0,
      explanation: "Freedom of Religion ensures a secular state where individuals can practice their faith without interference."
    },
    {
      question: "Which articles are part of the Freedom of Religion?",
      options: ["Articles 25 to 28", "Articles 14 to 18", "Articles 19 to 22", "Articles 29 to 30"],
      correct: 0,
      explanation: "Articles 25 to 28 deal with freedom of religion and related rights."
    }
  ],
  culture: [
    {
      question: "What does Article 29 of the Indian Constitution protect?",
      options: ["Rights of minorities to conserve their culture and language", "Freedom of speech", "Right to property", "Right to vote"],
      correct: 0,
      explanation: "Article 29 protects the rights of cultural, linguistic, and religious minorities to conserve their heritage."
    },
    {
      question: "Can minorities establish educational institutions under Article 29?",
      options: ["Yes, to preserve their culture", "No, only government can", "Only for Hindus", "Only for majorities"],
      correct: 0,
      explanation: "Article 29 allows minorities to establish and administer educational institutions."
    },
    {
      question: "What does Article 30 guarantee to minorities?",
      options: ["Right to establish and administer educational institutions", "Right to free speech", "Right to equality", "Right to freedom"],
      correct: 0,
      explanation: "Article 30 ensures minorities have the right to establish and administer educational institutions of their choice."
    },
    {
      question: "Is the state allowed to discriminate against minority institutions?",
      options: ["No, it is prohibited", "Yes, always", "Only in private matters", "Only for religious minorities"],
      correct: 0,
      explanation: "Article 30 prohibits the state from discriminating against minority educational institutions."
    },
    {
      question: "What is the main purpose of Cultural and Educational Rights?",
      options: ["To protect minority cultures and languages", "To promote majority culture", "To restrict education", "To allow discrimination"],
      correct: 0,
      explanation: "These rights ensure that minorities can preserve their distinct culture, language, and script."
    },
    {
      question: "Can the government regulate minority educational institutions?",
      options: ["Yes, for maintaining standards", "No, never", "Only for financial reasons", "Only for cultural reasons"],
      correct: 0,
      explanation: "The government can regulate these institutions to ensure they meet educational standards."
    },
    {
      question: "What does 'minority' refer to in Article 29?",
      options: ["Religious or linguistic minorities", "Only religious", "Only linguistic", "Only caste-based"],
      correct: 0,
      explanation: "Article 29 refers to minorities based on religion or language."
    },
    {
      question: "Is the right to conserve culture absolute?",
      options: ["No, subject to public order", "Yes, always", "Only for adults", "Only in rural areas"],
      correct: 0,
      explanation: "The right is subject to reasonable restrictions for public order, morality, and health."
    },
    {
      question: "What is the significance of Cultural and Educational Rights?",
      options: ["Promotes diversity and inclusion", "Promotes uniformity", "Restricts minority rights", "Favors majorities"],
      correct: 0,
      explanation: "These rights promote cultural diversity and protect minority interests in education."
    },
    {
      question: "Which articles cover Cultural and Educational Rights?",
      options: ["Articles 29 and 30", "Articles 25 and 26", "Articles 19 and 20", "Articles 14 and 15"],
      correct: 0,
      explanation: "Articles 29 and 30 deal with the protection of minority culture and educational rights."
    }
  ],
  remedies: [
    {
      question: "What does Article 32 of the Indian Constitution provide?",
      options: ["Right to Constitutional Remedies", "Right to Freedom", "Right to Equality", "Right to Property"],
      correct: 0,
      explanation: "Article 32 allows citizens to move the Supreme Court for enforcement of fundamental rights."
    },
    {
      question: "Is the Right to Constitutional Remedies available to all citizens?",
      options: ["Yes, to all persons", "No, only to adults", "No, only to men", "No, only to Hindus"],
      correct: 0,
      explanation: "Article 32 is available to all persons whose fundamental rights are violated."
    },
    {
      question: "What is the significance of Article 32?",
      options: ["It is the heart and soul of the Constitution", "It allows arbitrary arrests", "It restricts court access", "It promotes inequality"],
      correct: 0,
      explanation: "Article 32 is called the heart and soul of the Constitution as it provides remedies for rights violations."
    },
    {
      question: "Can the Supreme Court issue writs under Article 32?",
      options: ["Yes, habeas corpus, mandamus, etc.", "No, only lower courts", "Only for civil matters", "Only for criminal matters"],
      correct: 0,
      explanation: "The Supreme Court can issue writs like habeas corpus, mandamus, prohibition, certiorari, and quo warranto."
    },
    {
      question: "What is a writ of habeas corpus?",
      options: ["To release a person from unlawful detention", "To direct a public official to perform duty", "To prohibit a lower court", "To transfer a case"],
      correct: 0,
      explanation: "Habeas corpus is used to secure the release of a person who is detained unlawfully."
    },
    {
      question: "Can Article 32 be suspended during emergencies?",
      options: ["No, it cannot be suspended", "Yes, always", "Only during war", "Only for minorities"],
      correct: 0,
      explanation: "Article 32 cannot be suspended even during a national emergency."
    },
    {
      question: "What does a writ of mandamus do?",
      options: ["Compels a public official to perform a duty", "Releases from detention", "Prohibits a court", "Quashes an order"],
      correct: 0,
      explanation: "Mandamus is issued to compel a public authority to perform a public duty."
    },
    {
      question: "Is the Right to Constitutional Remedies enforceable by law?",
      options: ["Yes, directly enforceable", "No, only through Parliament", "Only in High Courts", "Only for citizens"],
      correct: 0,
      explanation: "Article 32 is directly enforceable by the Supreme Court."
    },
    {
      question: "What is the purpose of Constitutional Remedies?",
      options: ["To protect fundamental rights", "To allow violations", "To restrict freedoms", "To promote discrimination"],
      correct: 0,
      explanation: "It provides a mechanism to enforce and protect fundamental rights."
    },
    {
      question: "Which court primarily handles Article 32 petitions?",
      options: ["Supreme Court", "High Courts", "District Courts", "All courts"],
      correct: 0,
      explanation: "Article 32 empowers the Supreme Court to issue writs for enforcement of rights."
    }
  ]
};
