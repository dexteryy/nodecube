
export default function errorResponse(req, res) {
  const requestId = res.get('Request-Id');
  return (err = {}) => {
    const {
      status = -100,
      isExpected,
      message = 'UNDEFINED ERROR',
      meta = {},
    } = err;
    if (!isExpected) {
      logger.error(`[${requestId}] ${status} | ${message}`, meta);
    }
    res.json({
      status,
      message,
      meta,
    });
  };
}
