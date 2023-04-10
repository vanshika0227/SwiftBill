import React from "react"
import { Alert } from "@mui/material"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    let props = {
      margin: 4,
      ...this.props
    }
    delete props.children
    if (this.state.hasError) {
      return <Alert variant="outlined" severity="warning" sx={props}>Something went wrong!</Alert>
    }
    return this.props.children
  }
}

export default ErrorBoundary