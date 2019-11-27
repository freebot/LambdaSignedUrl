const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = function (event, context) { 

  let key = event.file;
  const bucket = process.env['s3_bucket']
  const params = {
	Bucket: bucket,
	Key: key,
	Expires: 180
  }

  try {
    const url = await new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, function (err, url) {
        if (err) {
          reject(err)
        }
        resolve(url)
      })
    })

    return url
  } catch (err) {
    logger.error('s3 getObject,  get signedUrl failed')
    throw err
  }
}




