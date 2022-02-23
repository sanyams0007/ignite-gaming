import React, { Component } from "react";
import ErrorContainer from "./ErrorContainer";

class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  //lifecycle method for catching any error in component tree
  static getDerivedStateFromError(error) {
    // process the error by return error state
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log({ error, info });
  }

  render() {
    if (this.state.hasErrored) {
      return <ErrorContainer />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
