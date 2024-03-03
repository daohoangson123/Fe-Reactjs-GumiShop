import './SignIn.css';
//

import ErrorBoundary from '../../../Support/Error/ErrorBoundary';
import UserList from './UserList';
import SignInForm from './SignInForm';

const SignIn = () => {
    return (
        <div className="SignIn Container">
            <ErrorBoundary>
                <SignInForm />
                <UserList />
            </ErrorBoundary>
        </div>
    );
};

export default SignIn;
