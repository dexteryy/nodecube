
const RE_DATA = /(.*)\[\[(.+?)\]\](.*)/;

export default function errorResponse(req, res) {
  const requestId = req.get('Request-Id');
  return (err = new Error('UNDEFINED ERROR')) => {
    let data = err;
    const message = err.message
      .replace(RE_DATA, ($0, before, json = '', after) => {
        try {
          data = JSON.parse(json) || {};
        } catch (ex) {
          data = err;
        }
        return before + after;
      });
    if (!data.isExpected) {
      if (process.env.NODE_ENV === 'production') {
        logger.error(`[Request-Id: ${requestId}]`, err);
      } else {
        console.error(requestId, err);
      }
    }
    res.json({
      status: data.status || -100,
      message,
    });
  };
}
