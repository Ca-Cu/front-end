import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

const RegisterUserAWS = () => {
    Amplify.configure(awsconfig);
    return (
        <AmplifySignOut />
    )
}

export default withAuthenticator(RegisterUserAWS);
