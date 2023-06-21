import React from 'react';
//
import { pageAccessedByReload } from '../../../data/isPageReloaded';
//
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    componentDidUpdate() {
        if (pageAccessedByReload) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div className='ErrorBoundary Container'>
                    <h2>
                        Something went wrong !?! Please try to reload this page
                        or contact us for support.
                    </h2>
                    <button
                        type='button'
                        onClick={() => window.location.reload()}
                    >
                        Reload Page
                    </button>
                    <details>
                        <summary>Error's details</summary>
                        <p>{this.state.error && this.state.error.toString()}</p>
                        <p>{this.state.errorInfo.componentStack}</p>
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundary;
