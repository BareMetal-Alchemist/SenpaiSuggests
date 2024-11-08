import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function GoogleAuth() {
  return (
    <GoogleOAuthProvider clientId='812767787151-figdc7q3ji25eg9uc83fbdh6qp0r4qrq.apps.googleusercontent.com'>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          var credentialResponseDecoded = jwtDecode(
            credentialResponse.credential
          );
          console.log(credentialResponseDecoded);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        theme={'filled_black'}
      />
    </GoogleOAuthProvider>

  );
}
