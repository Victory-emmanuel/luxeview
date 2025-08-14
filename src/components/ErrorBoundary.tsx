import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-6">
          <Card className="bg-primary border-accent/20 max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="text-text-primary font-heading flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-text-primary/70 font-body">
                An unexpected error occurred. This might be due to:
              </p>
              
              <ul className="text-text-primary/60 text-sm space-y-2 ml-4">
                <li>• Missing Firebase configuration or permissions</li>
                <li>• Network connectivity issues</li>
                <li>• Invalid data in the database</li>
                <li>• Component rendering errors</li>
              </ul>

              {this.state.error && (
                <details className="mt-4">
                  <summary className="text-text-primary/80 cursor-pointer hover:text-text-primary">
                    Technical Details (Click to expand)
                  </summary>
                  <div className="mt-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 font-mono text-sm mb-2">
                      {this.state.error.name}: {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <pre className="text-red-300/70 text-xs overflow-auto max-h-40">
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  className="border-accent/30 text-text-primary hover:bg-accent/10"
                >
                  Try Again
                </Button>
                <Button
                  onClick={this.handleReload}
                  className="bg-accent hover:bg-accent/90 text-primary"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">Quick Fixes:</h4>
                <ol className="text-blue-300/80 text-sm space-y-1">
                  <li>1. Check your Firebase setup and security rules</li>
                  <li>2. Ensure you have admin role in the users collection</li>
                  <li>3. Verify your internet connection</li>
                  <li>4. Clear browser cache and reload</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
