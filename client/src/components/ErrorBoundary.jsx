import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("EduSense UI Error Boundary caught an exception:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] p-8 flex flex-col items-center justify-center bg-rose-50/50 border border-rose-200 rounded-2xl text-center">
          <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Component Render Error</h3>
          <p className="text-slate-600 max-w-md text-sm mb-6">
            An unexpected UI rendering error occurred. EduSense error handling prevented the dashboard from crashing.
          </p>
          <button
            onClick={this.handleReload}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
