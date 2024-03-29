import axios, { AxiosBasicCredentials } from "axios";
const fs = require("fs");
const NextcloudClient = require("nextcloud-link").default;
const dotenvResult = require("dotenv");
dotenvResult.config();

if (dotenvResult.error) {
  console.error("Error loading .env file:", dotenvResult.error);
}
// console.log(process.env.NEXT_CLOUD_USERNAME)
export const auth: AxiosBasicCredentials = {
  username: process.env.NEXT_CLOUD_USERNAME as string,
  password: process.env.NEXT_CLOUD_PASSWORD as string,
};

export const client = new NextcloudClient({
  url: process.env.NEXT_CLOUD_URL,
  username: process.env.NEXT_CLOUD_USERNAME as string,
  password: process.env.NEXT_CLOUD_PASSWORD as string,
});

export async function executeNextcloudTask(
  filePath: string,
  targetPath: string
) {
  try {
    const readStream = fs.createReadStream(filePath);
    await client.put(targetPath, readStream);
    const files = await client.getFiles(targetPath);
    return files;
  } catch (error) {
    throw error;
  }
}

export const generateImageUrl = async (filePath: string, fileName: string) => {
  try {
    const shareResponse = await axios.post(
      "https://nextcloud.fashquik.com/ocs/v2.php/apps/files_sharing/api/v1/shares",
      {
        path: fileName,
        shareType: 3,
      },
      {
        auth,
        headers: {
          "OCS-APIREQUEST": "true",
        },
      }
    );
    fs.unlinkSync(filePath);
    return shareResponse.data;
  } catch (error) {
    console.error("Error sharing file:", error);
    throw new Error("Failed to share file");
  }
};
