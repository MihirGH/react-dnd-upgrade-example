// Libraries
import React from 'react'
import { DragDropContext as dragDropContext } from 'react-dnd'
import HTML5 from 'react-dnd-html5-backend'

// Components
import CardsList from './components/CardContainer'

// Styles
import './App.css'

const connectDndBackend = dragDropContext(HTML5)

function App() {
  return <CardsList />
}

export default connectDndBackend(App)
