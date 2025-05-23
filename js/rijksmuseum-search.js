document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('search-form');
  const resultsContainer = document.getElementById('results');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const key = document.getElementById('api-key').value.trim();
    const query = document.getElementById('query').value.trim();
    resultsContainer.innerHTML = '';

    if (!key || !query) {
      resultsContainer.textContent = 'Please enter both API key and query.';
      return;
    }

    const url = `https://www.rijksmuseum.nl/api/en/collection?key=${encodeURIComponent(key)}&format=json&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.artObjects && data.artObjects.length) {
        data.artObjects.forEach(obj => {
          const item = document.createElement('div');
          item.className = 'result-item';
          const img = obj.webImage ? `<img src="${obj.webImage.url}" alt="${obj.title}">` : '';
          item.innerHTML = `<h3>${obj.title}</h3>${img}`;
          resultsContainer.appendChild(item);
        });
      } else {
        resultsContainer.textContent = 'No results found.';
      }
    } catch (err) {
      console.error(err);
      resultsContainer.textContent = 'Error fetching data.';
    }
  });
});
