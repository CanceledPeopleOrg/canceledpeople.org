import cancelations from './database.js';
const headers = [
  /*id=*/"",
  "Name",
  "Organization",
  "Position",
  "Offense",
  "Result",
  "Date",
  "Country"
];

const table = document.createElement('table');
table.className = 'mdl-data-table mdl-js-data-table mdl-shadow--2dp';

// Build the `<thead>` and all of its headers, per the above structure.
const thead = table.appendChild(document.createElement('thead'));
const thead_row = thead.appendChild(document.createElement('tr'));
for (const header of headers) {
  const th = thead_row.appendChild(document.createElement('th'));
  th.innerText = header;
}

// Build the `<tbody>` for each cancelation.
const tbody = table.appendChild(document.createElement('tbody'));

for (const cancelation of cancelations) {
  const tr = document.createElement('tr');
  for (const [property, value] of Object.entries(cancelation)) {
    const td = document.createElement('td');
    td.innerHTML = value;

    // We're using country codes instead of raw HTML
    if (property == 'country' && value.length == 2) {
      const img = document.createElement('img');
      img.height = '16';
      img.loading = 'lazy';
      img.src = `https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${value}.svg`;
      td.innerHTML = '';
      td.append(img);
    }

    td.className = 'mdl-data-table__cell--non-numeric';
    if (property == 'description') {
      td.classList.add('wide');
    }
    tr.append(td);
  }
  tbody.append(tr);
}

section.append(table);
