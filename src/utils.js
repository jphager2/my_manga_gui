let shell;

if (window.require) {
  const electron = window.require('electron');
  const fs = electron.remote.require('fs');
  shell = electron.shell;
}

function openExternal(e) {
  const url = e.target.getAttribute('href');

  if (!shell) { return; }
  e.preventDefault();
  shell.openExternal(url);
}

export { openExternal };
