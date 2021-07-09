import { findDOMNode as reactFindDOMNode } from 'react-dom'
import _isFunction from 'lodash/isFunction'

/**
 * Function used when initializing a component inside makeDraggable or makeDroppable.
 * also calls the ref callback defined by the original component if it wants to do more than just assigning the reference of
 * instance
 * @param  {object} context  Value of context(current component)
 * @param  {funct}  wrapper  Wrapper function to connect to drag or drop
 * @param  {string} refProp  Property to set on the context when the ref constructor is called
 * @param  {object} instance React component that is being initialized
 * @return {*}               React component to render
 */
export function refConstructor(place, context, wrapper, refProp, instance) {
  console.log('place', place)
  if (refProp) {
    if (_isFunction(context[refProp])) {
      context[refProp](instance)
    } else {
      context[refProp] = instance
    }
  }
  return wrapper(reactFindDOMNode(instance))
}
