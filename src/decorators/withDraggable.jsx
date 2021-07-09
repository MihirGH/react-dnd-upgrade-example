// Libraries
import React, { useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { DragSource as dragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import _partial from 'lodash/partial'

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

  const DragWrapper = React.forwardRef((props, forwardedRef) => {
    const { dragPreview, dragSource: connectDragSource } = props

    useEffect(() => {
      if (dragPreview && !!options.customDragPreview) {
        dragPreview(getEmptyImage(), { captureDraggingState: true })
      }
    }, [dragPreview])

    const registerRef = useCallback(
      (elementOrInstance) => {
        if (typeof connectDragSource === 'function') {
          connectDragSource(ReactDOM.findDOMNode(elementOrInstance))
        }

        if (!forwardedRef) return

        if (typeof forwardedRef === 'function') {
          forwardedRef(elementOrInstance)
        } else {
          forwardedRef.current = elementOrInstance
        }
      },
      [connectDragSource]
    )

    //Need to do this as react-dnd does not allow to use React custom elements, only native ones are allowed
    return <ComponentToDrag {...props} ref={registerRef} />
  })

  DragWrapper.displayName = `${dndId} Drag`

  return dragSource(dndId, dragCallbackHooks, DRAG_COLLECTOR)(DragWrapper)
}

export const defaultDragCollector = (connector, monitor) => ({
  dragSource: connector.dragSource(),
  isDragging: monitor.isDragging(),
})

export default makeDraggable
