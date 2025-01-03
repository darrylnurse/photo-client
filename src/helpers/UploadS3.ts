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

const createKey = (fileName: string, fileType: string): string => {
    const extension = String(fileType).slice(fileType.indexOf('/') + 1);
    const firstPass: string = fileName.replace(`.${extension}`, "") + getCurrentDate();
    const secondPass: string = firstPass.replace(/\./g, '-');
    const sanitizedKey = secondPass.match(/^\w/) ? secondPass : secondPass.slice(1);
    return encodeURIComponent(sanitizedKey + '.' + extension);
};

export default async function s3Upload (file, fileName, fileType) {

    const key = createKey(fileName, fileType);

    const putParams = {
        Bucket: "gleam-photo-bucket",
        Key: key,
        Body: file,
        ContentType: fileType,
    }

    const putCommand = new PutObjectCommand(putParams);
    const urlCommand = new PutObjectCommand({
        Bucket: putParams.Bucket,
        Key: putParams.Key
    });

    try{
        await s3.send(putCommand);
        const url = await getSignedUrl(s3, urlCommand, { expiresIn: 3600 });
        return url.slice(0, url.lastIndexOf('?'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch(error) {
        return "";
    }
}

