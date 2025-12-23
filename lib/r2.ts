import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Validate required environment variables
const validateR2Config = () => {
  const requiredVars = {
    R2_ENDPOINT: process.env.R2_ENDPOINT,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_PUBLIC_DOMAIN: process.env.R2_PUBLIC_DOMAIN,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key, _]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required R2 configuration: ${missingVars.join(", ")}`
    );
  }

  return requiredVars as Record<keyof typeof requiredVars, string>;
};

// Lazy initialization of R2 client to avoid module-load-time failures
// Note: Node.js is single-threaded, so this pattern is safe from race conditions
let r2Client: S3Client | null = null;
let r2Config: ReturnType<typeof validateR2Config> | null = null;

const getR2Client = () => {
  if (!r2Client || !r2Config) {
    r2Config = validateR2Config();
    r2Client = new S3Client({
      region: "auto",
      endpoint: r2Config.R2_ENDPOINT,
      credentials: {
        accessKeyId: r2Config.R2_ACCESS_KEY_ID,
        secretAccessKey: r2Config.R2_SECRET_ACCESS_KEY,
      },
    });
  }
  return { client: r2Client, config: r2Config };
};

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
  const { client, config } = getR2Client();

  const command = new PutObjectCommand({
    Bucket: config.R2_BUCKET_NAME,
    Key: filename,
    Body: Buffer.from(fileBuffer),
    ContentType: contentType,
  });

  await client.send(command);

  // Generate public URL using configured domain
  const url = `${config.R2_PUBLIC_DOMAIN}/${filename}`;

  return {
    url,
    pathname: filename,
    downloadUrl: url,
  };
}
