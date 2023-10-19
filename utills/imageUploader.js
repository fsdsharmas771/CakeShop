import admin from "firebase-admin";
import { data } from '../config/serviceAccount.js';
import { firebaseConfig } from "../firebase.js";

admin.initializeApp({
    credential: admin.credential.cert(data),
    storageBucket: firebaseConfig.storageBucket,
});
const bucket = admin.storage().bucket();

export const uploadImageToFirebase = async (imageBuffer, destinationPath) => {
    console.log(firebaseConfig.storageBucket)
    const file = bucket.file(destinationPath);
    await file.save(imageBuffer, {
        metadata: {
            contentType: 'image/png', // Modify the content type as needed based on your file type
        },
    });

    const url = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2100', // Adjust expiration as needed
    });

    return url[0];
};