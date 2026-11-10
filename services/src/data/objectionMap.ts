export const objectionMap = [
  { pattern: /price|cost|expensive|payment/i, question: 'What does it cost?', fact: 'price', missing: '[Insert approved pricing and billing terms]' },
  { pattern: /time|long|fast|when/i, question: 'What is the timeline?', fact: 'timeline', missing: '[Insert confirmed timeline and dependencies]' },
  { pattern: /support|help|setup|complex/i, question: 'What support is included?', fact: 'support', missing: '[Insert confirmed support and implementation scope]' },
  { pattern: /refund|guarantee|risk|cancel/i, question: 'What are the cancellation and refund terms?', fact: 'refund_policy', missing: '[Insert approved cancellation and refund policy]' },
] as const;
