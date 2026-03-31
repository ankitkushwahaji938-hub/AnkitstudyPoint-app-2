export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const LOCAL_QUIZZES: QuizCategory[] = [
  {
    id: 'pharmacology',
    title: 'Basic Pharmacology',
    description: 'Test your knowledge on drug actions and classifications.',
    questions: [
      {
        id: 1,
        question: 'Which of the following is a loop diuretic?',
        options: ['Hydrochlorothiazide', 'Furosemide', 'Spironolactone', 'Acetazolamide'],
        correctAnswer: 1,
        explanation: 'Furosemide is a potent loop diuretic that acts on the thick ascending limb of the loop of Henle.'
      },
      {
        id: 2,
        question: 'What is the antidote for Paracetamol (Acetaminophen) poisoning?',
        options: ['Atropine', 'Naloxone', 'N-Acetylcysteine', 'Flumazenil'],
        correctAnswer: 2,
        explanation: 'N-Acetylcysteine (NAC) restores glutathione levels in the liver to neutralize toxic metabolites.'
      },
      {
        id: 3,
        question: 'Which drug is commonly used as a first-line treatment for Type 2 Diabetes?',
        options: ['Insulin', 'Metformin', 'Glibenclamide', 'Pioglitazone'],
        correctAnswer: 1,
        explanation: 'Metformin is the first-line medication for the treatment of type 2 diabetes, particularly in people who are overweight.'
      }
    ]
  },
  {
    id: 'pharmaceutics',
    title: 'Pharmaceutics & Dosage Forms',
    description: 'Questions about drug delivery systems and calculations.',
    questions: [
      {
        id: 1,
        question: 'Which of the following is an example of an enteric-coated tablet?',
        options: ['Dispersible tablet', 'Sustained release tablet', 'Aspirin EC', 'Chewable tablet'],
        correctAnswer: 2,
        explanation: 'Enteric coating prevents the tablet from dissolving in the stomach and allows it to dissolve in the small intestine.'
      },
      {
        id: 2,
        question: 'The term "Bioavailability" refers to:',
        options: ['The total dose given', 'The rate and extent of drug absorption', 'The time it takes for a drug to be excreted', 'The shelf life of a drug'],
        correctAnswer: 1,
        explanation: 'Bioavailability is the fraction of an administered dose of unchanged drug that reaches the systemic circulation.'
      }
    ]
  }
];
