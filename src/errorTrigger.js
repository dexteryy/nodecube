
export default function errorTrigger({
  status = -101,
  isExpected = true,
  message,
  ...meta
}) {
  throw Object.assign(new Error(message), {
    status,
    isExpected,
    meta,
  });
}
