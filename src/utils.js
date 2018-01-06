let shell;

if (window.require) {
  const electron = window.require('electron');
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

export { openExternal, openItem };
