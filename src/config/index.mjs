import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(), ".env"),
});

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    clientid: process.env.GOOGLE_CLIENT_ID,
    clientsecret: process.env.GOOGLE_CLIENT_SECRET,
    redirecturis: process.env.GOOGLE_REDIRECT_URIS,
    driveFolder: process.env.DRIVE_FOLDER,
    dropboxApiKey: process.env.DROPBOX_APP_KEY,
    dropboxApiSecret: process.env.DROPBOX_APP_SECRET,
    dropboxAccessToken: process.env.DROPBOX_ACCESS_TOKEN,
    email: process.env.USEREMAIL,
    password: process.env.USERPASSWORD,
    userEmail: process.env.SENDEREMAIL,
};
