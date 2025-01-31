const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEx3ZTBpVVhGS1JHOXlGWDFpUTc0RkU5eDBpQyszbTdqV0E4dDJjL0puND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNktscVIrOUxHeGhqVmNHK2RTd3p5blhTQUF0cm9VWEhZMXJlazVKdnVnZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnUHBycjBFWnd5ZkZ6YVNjZy83U3A3U2h1SFkrNXJFdElyMFp6OUJJaWw0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRb1RxaXV3dGhrd3dWczNwM3d5TXc2blo0dVI4b21xOWpRVy92WGdjYzJjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9CSUh4K1hRc0tEMk9PdUFmTzVIVURlM3dYclNWR1h3UXRSVkZybk5jVkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRzQWlwQkRGd29ZVkpKTi9aekwzbXRyWmo4TjdiNE12dXEzOFhreUNQRkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUsrK05aQzM2a1VRSW5RZDJNazVNbWx6aWRHZW9pS2ZYRlRUNkhoN2EzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR254VHR1TVRrblRnWDNVckJ0SHV0Q01zZXFQWjBaN3FwY3U3WkQ2K1kwST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNVL0xyNk5JS2dDcmc4eTdjOVF3amhIdUt5bitxem44V0w1NUZMdGEwN2N0QlA4dEh0bTZOaVplbEtPdnlEalJySm9mRXQvMThLSmlvaHVKbkN1MUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDAsImFkdlNlY3JldEtleSI6Im1WOUZ1dXFxRmpOMCtkYXI2a2lON1VKa2IwOFpyamVrMlpybnVJY3Y5ZzA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ijc2Vk53NEJFUnVtTTFWaWtSSFlpc2ciLCJwaG9uZUlkIjoiY2VmMjhmZWEtMmU1NS00NjEzLThlYjktZTZjNTM3MWE2NjRhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImMyQkM1SCt3NkZaOEFvVFRxWVlPYWI3Rjc3ND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmUjNmdzlmT09lSHdGUkVxUjNXV2VLdTNmU0U9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNlNNUk5RS0ciLCJtZSI6eyJpZCI6IjQwNzcwODExOTI5Ojc2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOdWg1UFFFRU5yVzlMd0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJV1J6bm80YnJjbWlXRUZzVUZiTmpueUtwOHo1SXZ6UVRZZ2xJVG5PMGhZPSIsImFjY291bnRTaWduYXR1cmUiOiJBMmRQWFI1T2d2bE1PZDVvbi83S3ZuMDJEck5zcFdGN29vaFh3L1RYRVI0dUtLQ1pQdmkxV0JacmMzVkJ5Tmp0RmVod1BHN2lUUk5KR05mcGhZMC9DUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiT2xmQ0E1Qmx2WjJHQjR4dUZyNlg5eFJtc3p3VTY1VGxmUXdvbHZGamhqTE5uRzJZeExmb2NWN2xYb0swRUpCSzZEMk8yRG50dDBnVDUzcGZpMk1VQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0MDc3MDgxMTkyOTo3NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTRmtjNTZPRzYzSm9saEJiRkJXelk1OGlxZk0rU0w4MEUySUpTRTV6dElXIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM4MzUzNTExLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZEbyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "cosmin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "0770811929",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
})
