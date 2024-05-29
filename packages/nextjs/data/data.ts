interface ChallengeData {
  title: string;
  description: string;
  stake: string;
  spotsFilled: string;
}

export const challenges: ChallengeData[] = Array(40).fill({
  title: "30 Day Running",
  description:
    "Run at least for 40 minutes or 4 miles every other day for 30 days.",
  stake: "0.5 ETH",
  spotsFilled: "2",
});
export const categories = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
