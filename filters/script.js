import { h, Component, render } from 'https://esm.sh/preact'
import { useEffect, useState } from 'https://esm.sh/preact/hooks'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

function Filter() {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [list, setList] = useState([])

  const parseList = (list) => {
    const len = list.length
    let html = ''
    if (len <= 5) {
      html = `: ${list.join(', ')}`
    } else {
      html = ': '
      for (let x = 0; x < 5; x++) {
        html += `${list[x]}, `
      }
      if (len > 5) {
        html += `+${len - 5}`
      }
    }
    return(html) 
  }

  const reset = () => {
    setFilter(undefined)
    setOpen(false)
    setList(false)
  }

  useEffect(() => {
    const onClick = () => {
      if (event.target.closest('[data-remove]')) return
      if (open) setOpen(false)
      if (!event.target.closest('.filter-step-one, .filter-step-two')) return
      setOpen(true)
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [open])

  return(html`
    <div class="pds-menu-container">
      <button type="button" class="pds-button pds-button-xs" onClick=${() => {setOpen(!open)}}>
        ${filter ? `${filter}${list ? parseList(list) : ''}` : 'Add filter'}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-label="Down chevron icon" aria-hidden="true">
          <polyline points="5 9 12 17 19 9"></polyline>
        </svg>
      </button>
      <div class="pds-menu-backdrop" hidden=${!open}>
        <div class="pds-menu pds-menu-left filter-step-one" hidden=${filter}>
          <ul>
            <li><button class="pds-menu-item" type="button" onClick=${() => {setFilter('Client')}}>Client</button></li>
            <li><button class="pds-menu-item" type="button" onClick=${() => {setFilter('Project')}}>Project</button></li>
            <li><button class="pds-menu-item" type="button" onClick=${() => {setFilter('Task')}}>Task</button></li>
            <li><button class="pds-menu-item" type="button" onClick=${() => {setFilter('Person')}}>Person</button></li>
          </ul>
        </div>
        <div class="pds-popover pds-popover-se pds-p-md filter-step-two" hidden=${!filter}>
          <div class="pds-flex-list pds-mb-sm">
            <div class="filter-settings-name">
              ${filter}
            </div>
            <select class="pds-input pds-input-xs">
              <option>is</option>
              <option>is not</option>
            </select>
          </div>
          <input type="email" class="pds-input" list="options" value=${list ? list : ''} onInput=${({target}) => setList(target.value.split(','))} multiple />
          <datalist id="options">
            <option>one</option>
            <option>two</option>
            <option>three</option>
            <option>four</option>
            <option>five</option>
            <option>six</option>
            <option>seven</option>
            <option>eight</option>
            <option>nine</option>
            <option>ten</option>
          </datalist>
          <button type="button" data-remove class="pds-button-link pds-mt-sm pds-fl-right" onClick=${reset}>Remove filter</button>
        </div>
      </div>
    </div>
  `)
}

function App() {
  const [count, setCount] = useState(1)
  const elements = []

  for (let i = 0; i < count; i++) {
    elements.push(html`<${Filter} />`)
  }

  return elements
}

render(html`<${App} />`, document.getElementById('root'))
