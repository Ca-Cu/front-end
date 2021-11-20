import Amplify from 'aws-amplify';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

const RegisterUserAWS = () => {
    return (
        <AmplifySignOut />
    )
}

export default withAuthenticator(RegisterUserAWS);
