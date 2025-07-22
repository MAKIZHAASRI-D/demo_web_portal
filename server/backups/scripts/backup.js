/*
const cron = require('node-cron');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// 🔧 CONFIGURATION
//const DB_NAME = 'user';     
const dbName = 'user'; // ✅ or whatever your actual DB name is
const mongoUri = `mongodb://localhost:27017/${dbName}`;         // Change this
const BACKUP_DIR = path.join(__dirname, 'backups'); // Folder to store backups
const RETENTION_DAYS = 7;

// 🕛 Schedule: Every day at midnight
//cron.schedule('*/
  /*
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, `${dbName}-backup-${timestamp}`);

  // Create backup using mongodump
  const dumpCommand = `mongodump --uri="${mongoUri}" --out="${backupPath}"`;
  console.log(`[${new Date().toLocaleString()}] Starting backup...`);

  exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Backup failed:', error);
      return;
    }

    console.log(`✅ Backup created at: ${backupPath}`);
    cleanOldBackups(); // Optional: Delete old backups
  });
});

// 🧹 Delete backups older than RETENTION_DAYS
function cleanOldBackups() {
  fs.readdir(BACKUP_DIR, (err, files) => {
    if (err) return console.error('❌ Cleanup error:', err);

    files.forEach((folder) => {
      const folderPath = path.join(BACKUP_DIR, folder);
      fs.stat(folderPath, (err, stats) => {
        if (err) return;

        const now = Date.now();
        const ageInDays = (now - stats.ctimeMs) / (1000 * 60 * 60 * 24);

        if (ageInDays > RETENTION_DAYS) {
          fs.remove(folderPath)
            .then(() => console.log(`🗑️ Deleted old backup: ${folder}`))
            .catch((err) => console.error('❌ Error deleting old backup:', err));
        }
      });
    });
  });
}

// Ensure backup folder exists
fs.ensureDirSync(BACKUP_DIR);
*/

const cron = require('node-cron');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const dbName = 'user';
const mongoUri = `mongodb://localhost:27017/${dbName}`;
const BACKUP_DIR = path.join(__dirname, 'backups');
const RETENTION_DAYS = 7;

// 🧹 Clean old backups
function cleanOldBackups() {
  fs.readdir(BACKUP_DIR, (err, files) => {
    if (err) return console.error('❌ Cleanup error:', err);

    files.forEach((folder) => {
      const folderPath = path.join(BACKUP_DIR, folder);
      fs.stat(folderPath, (err, stats) => {
        if (err) return;

        const now = Date.now();
        const ageInDays = (now - stats.ctimeMs) / (1000 * 60 * 60 * 24);

        if (ageInDays > RETENTION_DAYS) {
          fs.remove(folderPath)
            .then(() => console.log(`🗑️ Deleted old backup: ${folder}`))
            .catch((err) => console.error('❌ Error deleting old backup:', err));
        }
      });
    });
  });
}

// 📦 Convert all BSON to readable JSON
function convertBSONtoJSON(backupPath) {
  const collectionDir = path.join(backupPath, dbName);
  fs.readdir(collectionDir, (err, files) => {
    if (err) return console.error('❌ Error reading BSON files:', err);

    files
      .filter(file => file.endsWith('.bson'))
      .forEach(file => {
        const bsonPath = path.join(collectionDir, file);
        const jsonPath = bsonPath.replace('.bson', '.json');
        const dumpCommand = `bsondump "${bsonPath}" > "${jsonPath}"`;

        exec(dumpCommand, (error) => {
          if (error) {
            console.error('❌ BSON to JSON conversion failed:', error);
          } else {
            console.log(`📄 Converted ${file} to JSON`);
          }
        });
      });
  });
}

// 🕛 Run every 2 minutes
cron.schedule('*/2 * * * *', () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, `${dbName}-backup-${timestamp}`);

  console.log(`[${new Date().toLocaleString()}] Starting backup...`);
  const dumpCommand = `mongodump --uri="${mongoUri}" --out="${backupPath}"`;

  exec(dumpCommand, (error) => {
    if (error) {
      console.error('❌ Backup failed:', error);
      return;
    }

    console.log(`✅ Backup created at: ${backupPath}`);
    convertBSONtoJSON(backupPath); // 🔄 Convert to readable JSON
    cleanOldBackups(); // 🧹 Clean up old
  });
});

// 🗂️ Ensure backup folder exists
fs.ensureDirSync(BACKUP_DIR);
