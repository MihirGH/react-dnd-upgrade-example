// Libraries
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Components
import CardsList from './components/CardContainer'

// Styles
import './App.css'

const connectDndBackend = (Component) => (props) =>
  (
    <DndProvider backend={HTML5Backend}>
      <Component {...props} />
    </DndProvider>
  )

function App() {
  return <CardsList />
}

export default connectDndBackend(App)
