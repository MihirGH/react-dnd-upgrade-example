// Libraries
import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'

// Components
import { Card } from './Card'

const style = {
  width: 400,
}

const CardsList = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Write a cool JS library' },
    { id: 2, text: 'Make it generic enough' },
    { id: 3, text: 'Write README' },
    { id: 4, text: 'Create some examples' },
    {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    { id: 6, text: '???' },
    { id: 7, text: 'PROFIT' },
  ])

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      )
    },
    [cards]
  )

  return (
    <div style={style}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveItems={moveCard}
        />
      ))}
    </div>
  )
}

export default CardsList
