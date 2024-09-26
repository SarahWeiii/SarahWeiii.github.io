async function fetchStarCount(owner, repo, elementId) {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const response = await fetch(url);
    const data = await response.json();
  
    // Update the star count in the provided element
    document.getElementById(elementId).innerText = data.stargazers_count;
  }