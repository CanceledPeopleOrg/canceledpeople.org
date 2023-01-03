import cancelations from './database.js';

// Keep this synchronized with the responsive data table labels in `main.css`.
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

  // For (almost each property of the cancelation, build a `<td>` for the row.
  for (const [property, value] of Object.entries(cancelation)) {
    // For our table, the `source` is only relevant to the `description`, so we
    // don't built a separate `<td>` for it.
    if (property == 'source')
      continue;

    const td = document.createElement('td');
    td.className = 'mdl-data-table__cell--non-numeric';
    td.innerHTML = `<p>${value}</p>`;

    if (property == 'number') {
      const button = document.createElement('button');
      button.className = 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect';
      td.id = `row-${value}`;
      button.addEventListener('click', copyLink, {capture: true});
      button.addEventListener('touchend', copyLink, {capture: true});
      const i = button.appendChild(document.createElement('i'));
      i.className = 'material-icons';
      i.textContent = 'link';

      td.innerHTML = '';
      td.append(button);
    }

    // Get an SVG image of the country's flag, given the country code.
    if (property == 'country') {
      const img = document.createElement('img');
      img.height = '16';
      img.loading = 'lazy';
      img.src =
          `https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${value}.svg`;
      img.alt = value;
      img.title = value;

      td.innerHTML = '';
      td.append(img);
    }

    if (property == 'description') {
      td.classList.add('wide');
      // The `source` is stored separately from the `description`. Since we're
      // processing the `description` `<td>` here, we'll just pull the `source`
      // out manually.
      td.innerHTML = `<p>${value}<a href=${cancelation.source}>Source</a></p>`;
    }
    tr.append(td);
  }
  tbody.append(tr);
}

section.append(table);

function copyLink(e) {
  console.log(e.target.parentNode.id);
  const url = new URL(location.href);
  // `e.target` is the inner <span>. We have to climb up to the <button> and
  // finally the <td> to get the right navigable ID.
  url.hash = `#${e.target.parentNode.parentNode.id}`;
  navigator.clipboard.writeText(url);

  const toast = document.querySelector('#copy-link-toast');
  const data = {
    message: 'Link copied to clipboard',
    timeout: 1000
  };
  toast.MaterialSnackbar.showSnackbar(data);
}
