const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(process.env.HOME, 'log', 'my_manga_electron.log');
const log = fs.createWriteStream(LOG_FILE, { flags: 'a' });

function logger(level) {
  return {
    level: level || 3,
    levels: ['debug', 'info', 'warn', 'error'],

    error() {
      if (this._silence('error')) { return; }

      this._write('error', arguments);
    },

    warn() {
      if (this._silence('warn')) { return; }

      this._write('warn', arguments);
    },

    info() {
      if (this._silence('info')) { return; }

      this._write('info', arguments);
    },

    debug() {
      if (this._silence('debug')) { return; }

      this._write('debug', arguments);
    },

    _silence(level) {
      return this.levels.indexOf(level) >= level;
    },

    _write(level, msgs) {
      Array.from(msgs).forEach((msg) => {
        log.write(`[${(new Date()).toString()}][${level.toUpperCase()}] ${msg}\n`);

        if (level === 'error') {
          console.error(msg);
        } else {
          console.log(msg);
        }
      });
    }
  };
}

module.exports = logger;
