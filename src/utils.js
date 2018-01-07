let shell;
let qs;

if (window.require) {
  const electron = window.require('electron');
  qs = window.require('querystring');
  shell = electron.shell;
}

function openExternal(e) {
  const url = e.target.getAttribute('href');

  if (!shell) { return; }
  e.preventDefault();
  shell.openExternal(url);
}

function openItem(e) {
  const url = e.target.getAttribute('href');

  if (!shell) { return; }
  e.preventDefault();
  shell.openItem(url);
}

function parseQuery(str) {
  if (!qs) { return {}; }

  str = str.replace(/^\?/, '');

  return qs.parse(str);
}

export { openExternal, openItem, parseQuery };
