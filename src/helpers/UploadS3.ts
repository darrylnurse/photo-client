import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import getCurrentDate from "../helpers/GetCurrentDate.ts";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = import.meta.env.VITE_AWS_REGION;
const accessKey = import.meta.env.VITE_AWS_ACCESS_KEY;
const secretKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    }
});

const createKey = (fileName: string, fileType: string, date: string): string => {
    const extension = String(fileType).slice(fileType.indexOf('/') + 1);
    const firstPass: string = fileName.replace(`.${extension}`, "") + date;
    const secondPass: string = firstPass.replace(/\./g, '-');
    const sanitizedKey = secondPass.match(/^\w/) ? secondPass : secondPass.slice(1);
    return encodeURIComponent(sanitizedKey + '.' + extension);
};

export default async function s3Upload(file, fileName, fileType) {

    const timeStamp = getCurrentDate();

    const originalKey = createKey(fileName, fileType, timeStamp);
    const resizedKey = createKey(`resized-${fileName}`, fileType, timeStamp);

    const originalPutParams = {
        Bucket: "gleam-photo-bucket",
        Key: originalKey,
        Body: file,
        ContentType: fileType,
    };

    const originalPutCommand = new PutObjectCommand(originalPutParams);
    const originalUrlCommand = new PutObjectCommand({
        Bucket: originalPutParams.Bucket,
        Key: originalPutParams.Key,
    });

    const resizedBlob = await resizeImage(file); // Resize to 300x300 (example)

    // Upload resized image
    const resizedPutParams = {
        Bucket: "gleam-photo-bucket",
        Key: resizedKey,
        Body: resizedBlob,
        ContentType: fileType,
    };

    const resizedPutCommand = new PutObjectCommand(resizedPutParams);
    const resizedUrlCommand = new PutObjectCommand({
        Bucket: resizedPutParams.Bucket,
        Key: resizedPutParams.Key,
    });

    try {
        await s3.send(originalPutCommand);
        const originalUrl = await getSignedUrl(s3, originalUrlCommand, { expiresIn: 3600 });

        await s3.send(resizedPutCommand);
        const resizedUrl = await getSignedUrl(s3, resizedUrlCommand, { expiresIn: 3600 });

        return {
            originalUrl: originalUrl.slice(0, originalUrl.lastIndexOf("?")),
            resizedUrl: resizedUrl.slice(0, resizedUrl.lastIndexOf("?")),
        };
    } catch (error) {
        console.error("Upload error:", error);
        return { originalUrl: "", resizedUrl: "" };
    }
}

async function resizeImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {
            if (typeof event.target.result === "string") {
                img.src = event.target.result;
            }
        }

        img.onload = () => {
            const canvas = document.createElement("canvas");

            const width = img.width / 3;
            const height = img.height / 3;

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                if(blob) resolve(blob);
                else reject(new Error("Failed to create image blob from canvas."));
            }, file.type, 0.7);
        }

        img.onerror = () => reject(new Error("Failed to load image"));
        reader.onerror = () => reject(new Error("Failed to read file"));

        reader.readAsDataURL(file);
    });
}

