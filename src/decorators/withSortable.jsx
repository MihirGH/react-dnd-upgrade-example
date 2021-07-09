import React from 'react'

import withDroppable, { defaultDropCollector } from './withDroppable'
import withDraggable, { defaultDragCollector } from './withDraggable'

export default function (Component, itemType) {
  return class DraggableComponent extends React.PureComponent {
    constructor(props) {
      super(props)
      this.DraggableTab = withDraggable(
        withDroppable(Component, itemType, this.getDropCallbacks(), {
          dropCollector: defaultDropCollector,
        }),
        itemType,
        this.getDragCallbacks(),
        { dragCollector: defaultDragCollector }
      )
    }

    getDragCallbacks() {
      return {
        beginDrag: (props) => ({ id: props.id, index: props.index }),
      }
    }

    getDropCallbacks() {
      return {
        hover: (props, monitor) => {
          const sourceIndex = monitor.getItem().index
          const targetIndex = this.props.index

          if (sourceIndex === targetIndex) return

          this.props.moveItems(sourceIndex, targetIndex)
          monitor.getItem().index = targetIndex
        },
      }
    }

    render() {
      const { DraggableTab } = this

      return <DraggableTab key={this.props.id} {...this.props} />
    }
  }
}
