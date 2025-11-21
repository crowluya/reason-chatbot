import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Initialize R2 client
const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export interface UploadResult {
  url: string;
  pathname: string;
  downloadUrl: string;
}

export async function uploadToR2(
  filename: string,
  fileBuffer: ArrayBuffer,
  contentType: string
): Promise<UploadResult> {
  const bucket = process.env.R2_BUCKET_NAME;
  
  if (!bucket) {
    throw new Error("R2_BUCKET_NAME environment variable is not set");
  }

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: filename,
    Body: Buffer.from(fileBuffer),
    ContentType: contentType,
  });

  await r2Client.send(command);

  // Construct the public URL
  const publicDomain = process.env.R2_PUBLIC_DOMAIN || process.env.R2_ENDPOINT;
  const url = `${publicDomain}/${filename}`;

  return {
    url,
    pathname: filename,
    downloadUrl: url,
  };
}
