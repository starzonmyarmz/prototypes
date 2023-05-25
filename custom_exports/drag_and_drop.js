import { h, Component, render } from 'https://esm.sh/preact'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

export class DndListItem extends Component {
  render({onDragStart, children}) {
    return (html`
      <div class="dnd-list-item" draggable="true" onDragStart=${onDragStart}>
        ${children}
      </div>
    `)
  }
}

export class DndList extends Component {
  onDragStart = (index, ev) => {
    ev.dataTransfer.setData("text", index)
  }

  hit(r, p) {
    return (
      p.x >= r.x && p.x < r.x + r.width
      && p.y >= r.y && p.y < r.y + r.height
    )
  }
  
  onDrop = (ev) => {
    ev.preventDefault()

    let draggedIdx = parseInt(ev.dataTransfer.getData("text"))
    let pos = {x: ev.clientX, y: ev.clientY}
    let children = Array.from(this.base.querySelectorAll(".dnd-list-item"))
    let insertBeforeIdx = null
    
    for (let idx=0, n=children.length; idx < n; ++idx) {
      let childRect = children[idx].getBoundingClientRect()
      
      if (this.hit(childRect, pos)) {
        this.props.onMoveItem(draggedIdx, idx)
        return
      }

      // "remember" the first child that's below the cursor position
      if (insertBeforeIdx == null && childRect.y >= pos.y) {
        insertBeforeIdx = idx
      }
    }
    
    this.props.onMoveItem(draggedIdx, insertBeforeIdx)
  }

  render() {
    return (html`
      <div class="dnd-list" onDrop=${this.onDrop} onDragOver=${ev => ev.preventDefault()}>
        ${Array.from(this.props.children).map((it, index) => (html`
          <${DndListItem} onDragStart=${
            (...args) => this.onDragStart(index, ...args)
          }>${it}</${DndListItem}>
        `))}
      </div>
    `)
  }
}