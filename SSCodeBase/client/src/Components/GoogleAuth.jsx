
function NavigateToURL(url) {
  window.location.href = url;
}

async function GoogleOAuth() {
  const response = await fetch('http://localhost:5000/request', { method: 'post' });
  const data = await response.json();
  console.log('Google OAuth Data: ', data);

  NavigateToURL(data.url);
}

export default function GoogleSigninButton() {
  return (
    <>
      <button onClick={() => GoogleOAuth()}>
        Google Signin
      </button>
    </>
  );
}
