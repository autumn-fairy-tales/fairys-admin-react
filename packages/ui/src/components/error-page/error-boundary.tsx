import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { routerDataInstance } from 'context/router-data';
import { ErrorPage500 } from './500';

export interface FairysErrorBoundaryProps {
  children?: ReactNode;
  /**错误时渲染内容，默认使用 ErrorPage500*/
  fallback?: ReactNode;
  /**错误回调*/
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface FairysErrorBoundaryState {
  hasError: boolean;
}

export class FairysErrorBoundary extends Component<FairysErrorBoundaryProps, FairysErrorBoundaryState> {
  state: FairysErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): FairysErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('FairysErrorBoundary', error, info);
    this.props.onError?.(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorPage500
            onBackHome={() => {
              this.setState({ hasError: false });
              routerDataInstance.navigate('/');
            }}
          />
        )
      );
    }
    return this.props.children;
  }
}
