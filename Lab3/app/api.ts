export const fetchRepos = async () => {
    const response = await fetch("https://api.github.com/search/repositories?q=language:cpp&sort=stars&order=desc&per_page=30&page=1");
    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return await response.json();
  };
  