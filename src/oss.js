import ALY from 'aliyun-sdk';
import path from 'path';
import mime from 'mime-types';

export default function oss(opt) {
  const config = Object.assign({
    apiVersion: '2013-10-15',
  }, opt);
  const oss = new ALY.OSS(config);
  oss.putObj = ({
    bucket = opt.bucket,
    key,
    data,
    contentType,
    contentEncoding = '',
    contentDisposition,
    serverSideEncryption,
    maxAge,
    timeout,
    timeoutCallback,
    error,
    success,
  }) => {
    let timeoutTimer;
    if (timeout) {
      timeoutTimer = setTimeout(() => {
        const meta = {
          config,
          bucket,
          key,
          contentType,
          contentEncoding,
          contentDisposition,
          serverSideEncryption,
          maxAge,
          timeout,
        };
        logger.error('[OSS PUTOBJECT TIMEOUT]', meta);
        if (timeoutCallback) {
          timeoutCallback(meta);
        }
      }, timeout);
    }
    const putConfig = {
      Bucket: bucket,
      Key: key,
      Body: data,
      AccessControlAllowOrigin: '',
      ContentType: contentType
        || mime.lookup(path.extname(key)),
      CacheControl: maxAge ? `max-age=${maxAge}, public` : 'no-cache',
      ContentEncoding: contentEncoding,
      Expires: null,
    };
    if (contentDisposition) {
      putConfig.ContentDisposition = contentDisposition;
    }
    if (serverSideEncryption) {
      putConfig.ServerSideEncryption = serverSideEncryption;
    }
    return oss.putObject(putConfig, function (err) {
      clearTimeout(timeoutTimer);
      if (err) {
        error({
          status: -1,
          message: err.message,
        });
        return;
      }
      success({
        status: 0,
      });
    });
  };
  return oss;
}
