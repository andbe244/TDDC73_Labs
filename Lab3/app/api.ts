export const fetchRepos = async () => {
    const response = await fetch("https://api.github.com/repositories");
    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return await response.json();
  };
  