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

    if (property == 'number') {
      const button = document.createElement('button');
      button.className = 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect';
      td.id = `row-${value}`;
      button.addEventListener('click', copyLink);
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

function copyLink(e) {
  console.log(e.target.parentNode.id);
  const url = new URL(location.href);
  // `e.target` is the inner <span>. We have to climb up to the <button> and
  // finally the <td> to get the right navigable ID.
  url.hash = `#${e.target.parentNode.parentNode.id}`;
  navigator.clipboard.writeText(url);

  const toast = document.querySelector('#copy-link-toast');
  const data = {message: 'Link copied to clipboard'};
  toast.MaterialSnackbar.showSnackbar(data);
}
