import React from 'react';

interface State {
  hasError?: boolean
};

interface Props {
  fallback?: React.ReactNode,
  children?: React.ReactNode
}

export class ErrorBoundary extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) return this.props.fallback || <h1>Error</h1>;

    return this.props.children;
  }
}