import React, { Component } from 'react'
import { DragSource as dragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import _partial from 'lodash/partial'

import { refConstructor } from './utils'

/**
 * Wrap any ReactComponent to accept drop and its Container component should be wrapped into dndContext which is internally use by React-Dnd.
 * @lifecycle defined in dndConstant->EVENT.DRAG
 * @notes It will return new dynamic component, so instead of directly use in render we can save this in constructor.
 * @param ComponentToDrag should be React element.
 * @param dndId unique id to determine drag
 * @param dragCallbackHooks Callback Hooks to be used for the drag lifecycle
 * @param options extra params which will be passed in the output component as props
 * @returns {*}
 */
function makeDraggable(
  ComponentToDrag,
  dndId,
  dragCallbackHooks = {},
  options = {}
) {
  const DRAG_COLLECTOR = options.dragCollector

  class DragWrapper extends Component {
    componentDidMount() {
      const { props } = this
      if (props.dragPreview && !!options.customDragPreview) {
        props.dragPreview(getEmptyImage(), { captureDraggingState: true })
      }
    }

    render() {
      console.log("inside draggable's render")
      const renderWrapper = this.props.dragSource || ((component) => component)
      console.log("rendering draggable's super")
      //Need to do this as react-dnd does not allow to use React custom elements, only native ones are allowed
      return React.cloneElement(<ComponentToDrag {...this.props} />, {
        ref: _partial(
          refConstructor,
          'withDraggable',
          this,
          renderWrapper,
          options.refProp
        ),
      })
    }
  }

  DragWrapper.displayName = `${dndId} Drag`

  return dragSource(dndId, dragCallbackHooks, DRAG_COLLECTOR)(DragWrapper)
}

export const defaultDragCollector = (connector, monitor) => ({
  dragSource: connector.dragSource(),
  isDragging: monitor.isDragging(),
})

export default makeDraggable
