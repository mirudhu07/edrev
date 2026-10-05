const fs = require('fs');

// Patch fs.readFileSync to handle macOS ECANCELED / EAGAIN / EINTR libuv fast-path read interrupts
const originalReadFileSync = fs.readFileSync;

fs.readFileSync = function (path, options) {
  try {
    return originalReadFileSync.call(fs, path, options);
  } catch (err) {
    if (err && (err.code === 'ECANCELED' || err.code === 'EAGAIN' || err.code === 'EINTR')) {
      // Fallback: Read using robust openSync/readSync file descriptor handling
      let fd;
      try {
        fd = fs.openSync(path, 'r');
        const stat = fs.fstatSync(fd);
        const buf = Buffer.alloc(stat.size);
        let bytesRead = 0;
        while (bytesRead < stat.size) {
          const read = fs.readSync(fd, buf, bytesRead, stat.size - bytesRead, bytesRead);
          if (read === 0) break;
          bytesRead += read;
        }
        const encoding = typeof options === 'string' ? options : options?.encoding;
        return encoding && encoding !== 'buffer' ? buf.toString(encoding) : buf;
      } finally {
        if (fd !== undefined) {
          try { fs.closeSync(fd); } catch (e) {}
        }
      }
    }
    throw err;
  }
};
