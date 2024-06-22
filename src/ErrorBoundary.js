import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error", error, info);
        this.logErrorToService(error, info);
    }

    logErrorToService = (error, info) => {
        logError(error, info);
        console.log("Logged to error service:", error, info);
    };

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h1>Oops! Something went wrong.</h1>
                    <p>We're sorry for the inconvenience. Our team has been notified.</p>
                    <button onClick={this.handleRetry}>Retry</button>
                    {this.props.showErrorDetails && (
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo.componentStack}
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    showErrorDetails: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
    showErrorDetails: false,
};

export default ErrorBoundary;
