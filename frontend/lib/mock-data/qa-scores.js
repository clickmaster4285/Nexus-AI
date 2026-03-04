export const qaScores = [
  { id: "QA001", callId: "C001", agentId: "A001", score: 92, evaluator: "Supervisor A", date: "2024-03-01" },
  { id: "QA002", callId: "C002", agentId: "A002", score: 68, evaluator: "Supervisor B", date: "2024-03-01" },
  { id: "QA003", callId: "C003", agentId: "A003", score: 95, evaluator: "Supervisor A", date: "2024-03-01" },
  { id: "QA004", callId: "C004", agentId: "A001", score: 78, evaluator: "Supervisor C", date: "2024-03-02" },
  { id: "QA005", callId: "C006", agentId: "A007", score: 88, evaluator: "Supervisor A", date: "2024-03-02" },
  { id: "QA006", callId: "C009", agentId: "A012", score: 82, evaluator: "Supervisor B", date: "2024-03-02" },
  { id: "QA007", callId: "C010", agentId: "A013", score: 97, evaluator: "Supervisor C", date: "2024-03-03" },
  { id: "QA008", callId: "C012", agentId: "A016", score: 76, evaluator: "Supervisor A", date: "2024-03-03" },
  { id: "QA009", callId: "C013", agentId: "A017", score: 91, evaluator: "Supervisor B", date: "2024-03-03" },
  { id: "QA010", callId: "C014", agentId: "A019", score: 74, evaluator: "Supervisor C", date: "2024-03-04" },
];

export const getQAScoreById = (id) => qaScores.find(score => score.id === id);

export const getQAScoresByAgent = (agentId) => qaScores.filter(score => score.agentId === agentId);

export const getAverageQAScore = () => {
  const total = qaScores.reduce((sum, score) => sum + score.score, 0);
  return Math.round(total / qaScores.length);
};
