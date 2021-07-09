// Decorators
import React, { Component } from 'react'
import withSortable from '../decorators/withSortable'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

class _Card extends Component {
  render() {
    const { text, isDragging } = this.props
    return <div style={{ ...style, opacity: isDragging ? 0 : 1 }}>{text}</div>
  }
}

export const Card = withSortable(_Card, 'CARD')
