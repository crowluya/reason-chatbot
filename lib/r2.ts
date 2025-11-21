import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Validate required environment variables
const validateR2Config = () => {
  const requiredVars = {
    R2_ENDPOINT: process.env.R2_ENDPOINT,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key, _]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required R2 configuration: ${missingVars.join(", ")}`
    );
  }

  return requiredVars;
};

// Initialize R2 client with validation
const initR2Client = () => {
  const config = validateR2Config();
  
  return new S3Client({
    region: "auto",
    endpoint: config.R2_ENDPOINT,
    credentials: {
      accessKeyId: config.R2_ACCESS_KEY_ID!,
      secretAccessKey: config.R2_SECRET_ACCESS_KEY!,
    },
  });
};

const r2Client = initR2Client();

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

  // Use public domain if configured, otherwise throw error
  const publicDomain = process.env.R2_PUBLIC_DOMAIN;
  
  if (!publicDomain) {
    throw new Error(
      "R2_PUBLIC_DOMAIN environment variable is required for generating public URLs"
    );
  }

  const url = `${publicDomain}/${filename}`;

  return {
    url,
    pathname: filename,
    downloadUrl: url,
  };
}
