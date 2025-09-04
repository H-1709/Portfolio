// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Fetch GitHub repos
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
// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved theme
if(localStorage.getItem('theme') === 'light'){
  root.classList.add('light');
  themeToggle.textContent = '🌙';
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  if(root.classList.contains('light')){
    root.classList.remove('light');
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '☀️';
  } else {
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '🌙';
  }
});