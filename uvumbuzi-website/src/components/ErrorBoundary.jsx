// src/components/ErrorBoundary.jsx
import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-page">
                    <div className="error-content">
                        <h1>Something went wrong.</h1>
                        <p>We're sorry, an unexpected error has occurred. Please try again later.</p>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;