// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Fetch GitHub repos for H-1709 and render simple cards
async function loadRepos(){
  const grid = document.getElementById('repoGrid');
  try {
    const res = await fetch('https://api.github.com/users/H-1709/repos?sort=updated&per_page=9');
    if(!res.ok) throw new Error('GitHub rate limit or user not found');
    const repos = await res.json();
    const filtered = repos
      .filter(r => !r.fork)
      .sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0,9);
    grid.setAttribute('aria-busy','false');
    grid.innerHTML = filtered.map(r=> `
      <article class="repo">
        <h5><a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a></h5>
        <p>${r.description ? r.description : 'No description provided.'}</p>
        <div class="meta"><span>★ ${r.stargazers_count}</span><span>⬢ ${r.language || 'N/A'}</span></div>
      </article>
    `).join('');
  } catch (err){
    grid.setAttribute('aria-busy','false');
    grid.innerHTML = `<div class="repo">Unable to load repositories right now. You can still visit <a href="https://github.com/H-1709" target="_blank" rel="noopener">github.com/H-1709</a>.</div>`;
  }
}
loadRepos();
