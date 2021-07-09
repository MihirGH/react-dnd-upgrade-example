// Libraries
import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { DropTarget as dropTarget } from 'react-dnd'

import _isArray from 'lodash/isArray'
import _isFunction from 'lodash/isFunction'
import _omit from 'lodash/omit'
import _defaults from 'lodash/defaults'
import _partial from 'lodash/partial'

/**
 * Wrap any ReactComponent to accept drop and its Container component should be wrapped into dndContext which is internally use by React-Dnd.
 * @lifecycle defined in dndConstant->EVENT.DROP
 * @notes It will return new dynamic component, so instead of directly use in render we can save this in constructor.
 * @param DropZoneComponent should be React Element
 * @param dndIds unique id/ids to determine drag
 * @param dropCallbackHooks Drop lifecycle hooks
 * @param options : extra params which will be passed in the output component as props
 * @returns {*}
 */
function makeDroppable(
  DropZoneComponent,
  dndIds,
  dropCallbackHooks = {},
  options = {}
) {
  if (!_isArray(dndIds)) {
    dndIds = [dndIds]
  }

  const DROP_COLLECTOR = options.dropCollector
  const { allowDrop } = dropCallbackHooks

  let DROP_LIFECYCLE_METHODS = dropCallbackHooks
  const dropFn = dropCallbackHooks.drop

  if (_isFunction(allowDrop)) {
    DROP_LIFECYCLE_METHODS = _omit(
      _defaults(
        {
          drop(...args) {
            if (allowDrop(...args)) {
              return dropFn(...args)
            }
            return ''
          },
        },
        dropCallbackHooks
      ),
      'allowDrop'
    )
  }

  const DropWrapper = React.forwardRef((props, forwardedRef) => {
    const { dropTarget: connectDropTarget } = props

    const registerRef = useCallback((elementOrInstance) => {
      if (typeof connectDropTarget === 'function') {
        connectDropTarget(ReactDOM.findDOMNode(elementOrInstance))
      }
      if (!forwardedRef) return

      if (typeof forwardedRef === 'function') {
        forwardedRef(elementOrInstance)
      } else {
        forwardedRef.current = elementOrInstance
      }
    }, [])

    //Need to do this as react-dnd does not allow to use React custom elements, only native ones are allowed
    return <DropZoneComponent {...props} ref={registerRef} />
  })

  DropWrapper.displayName = `${dndIds} DropZone`

  return dropTarget(dndIds, DROP_LIFECYCLE_METHODS, DROP_COLLECTOR)(DropWrapper)
}

export const defaultDropCollector = (connector, monitor) => ({
  dropTarget: connector.dropTarget(),
})

export default makeDroppable
