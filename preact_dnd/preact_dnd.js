import { h, Component, render } from 'https://esm.sh/preact'
// import { useContext } from 'https://esm.sh/preact/hooks'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

export const dndItem = ({ item }) => {
  //const dispatch = useDispatch()
  const { dragging, id, text } = item

  function onDragStart(event) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    // Firefox requires us to set some data
    event.dataTransfer.setData('text/plain', '')
    // dispatch(updateLineItem({ id, dragging: true }))
  }

  function onDragEnd(event) {
    event.preventDefault()
    // dispatch(updateLineItem({ id, dragging: false }))
  }

  function onDragEnter() {
    if (dragging) return
    // dispatch(moveLineItem(id))
  }

  // const classes = classnames({ 'block-hover': dragging })

  return (html`
    <div
      draggable="true"
      onDragEnter=${onDragEnter}
      onDragStart=${onDragStart}
      onDragEnd=${onDragEnd}
      style="cursor:grab">
      ${text}
    </div>
  `)
}