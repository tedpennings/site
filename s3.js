const s3 = require("s3");

// Shamelessly copied from s3 README
// This is here because the Circle CI s3 orb takes 20s
// to install awscli python package on every build

const s3Options = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const client = s3.createClient({ s3Options });

const params = {
  localDir: "build",
  deleteRemoved: true,

  s3Params: {
    Bucket: "ted.pennin.gs",
    ACL: "public-read",
    CacheControl: "no-cache",
  },
};

const uploader = client.uploadDir(params);

uploader.on("error", function (err) {
  console.error("unable to sync:", err.stack);
});
uploader.on("progress", function () {
  console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on("end", function () {
  console.log("done uploading");
});
