import * as React from 'react'
import AppError from './AppError'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught', { error, errorInfo })
    // TODO post errors to server for logging
  }

  render() {
    const { error } = this.state
    if (error){
      const Component = this.props.component || AppError
      return <Component {...{error}}/>
    }
    return this.props.children
  }
}
