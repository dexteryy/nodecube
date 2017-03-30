
export default function errorTrigger({
  status = -101,
  isExpected = true,
  message,
}) {
  const errData = JSON.stringify({
    status,
    isExpected,
  });
  throw new Error(`[[${errData}]] ${message}`);
}
