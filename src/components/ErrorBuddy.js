
const ErrorBuddy = ({ message, code }) => {
  return (
    <div>
      <span><em>error code - {code}</em></span>
      <span><em>message - {message}</em></span>
    </div>
  )
};
export default ErrorBuddy