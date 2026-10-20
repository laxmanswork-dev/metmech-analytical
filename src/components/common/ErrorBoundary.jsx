import { Component } from 'react'

// Catches render errors in the page below it and shows `fallback` instead of
// leaving the visitor with a blank screen.
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Page failed to render', error, info.componentStack)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
