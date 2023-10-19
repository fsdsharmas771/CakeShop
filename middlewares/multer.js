import multer from "multer";
const storage = multer.memoryStorage();


export const singleUpload = multer({
    storage,
    limits: {
        fileSize: 1048576,
    },
}).single("file");