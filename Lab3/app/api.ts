// api.ts
export const fetchRepos = async () => {
  const response = await fetch("https://api.github.com/repositories");
  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }
  return await response.json();
};

export const fetchRepoDetails = async (fullName: string) => {
  try {
    const [branchesRes, commitsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${fullName}/branches`),
      fetch(`https://api.github.com/repos/${fullName}/commits`),
    ]);

    const branches = branchesRes.ok ? await branchesRes.json() : [];
    const commits = commitsRes.ok ? await commitsRes.json() : [];

    return {
      branchesCount: branches.length,
      commitsCount: commits.length,
    };
  } catch (error) {
    console.error("Error fetching repository details:", error);
    return { branchesCount: 0, commitsCount: 0 };
  }
};
