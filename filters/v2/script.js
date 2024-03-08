import { h, Component, render } from 'https://esm.sh/preact'
import { useLayoutEffect, useId, useRef, useState } from 'https://esm.sh/preact/hooks'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

const data = [
  {
    "type": "State",
    "options": ['Active', 'Archived']
  },
  {
    "type": "Type",
    "options": ['Time & material', 'Fixed fee', 'Non-billable']
  },
  {
    "type": "Budget",
    "options": ['Overbudget', 'Underbudget', 'No budget specified']
  }
]

const projectFilters = ['State', 'Type', 'Budget', 'Client', 'Manager']

function ExistingFilter(activeFilter) {
  const [buttonContent, setButtonContent] = useState(activeFilter.type)
  const anchorId = useId()
  const popoverId = useId()
  const popoverRef = useRef()
  const menuRef = useRef()

  function setFilter(item) {
    setButtonContent(`${activeFilter.type}: ${item}`)
    popoverRef.current?.hidePopover()
  }

  function beforeToggle() {
    const { left } = menuRef.current.getBoundingClientRect()
    popoverRef.current.style.left = `${left}px`
  }

  return(html`
    <div ref=${menuRef} class="pds-menu-container">
      <button class="pds-button pds-button-sm" id=${anchorId} invoketarget=${popoverId}>
        ${buttonContent}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-label="Down chevron icon" aria-hidden="true">
          <polyline points="5 9 12 17 19 9"></polyline>
        </svg>
      </button>
      <div ref=${popoverRef} onBeforeToggle=${beforeToggle} class="pds-menu pds-menu-left" id=${popoverId} anchor=${anchorId} popover="auto">
        <ul>
          ${data.filter(item => item.type == activeFilter.type)[0].options.map((item) => html`
            <li key=${item}><button class="pds-menu-item" onClick=${() => setFilter(item)}>${item}</button></li>
          `)}
        </ul>
      </div>
    </div>
  `)
}

function AddFilter({ filters, setFilters }) {
  const addRef = useRef()
  const popoverRef = useRef()

  function clickedItem(item) {
    setFilters([...filters, item.type])
    popoverRef.current.hidePopover()
  }

  function beforeToggle() {
    const { left } = addRef.current.getBoundingClientRect()
    popoverRef.current.style.left = `${left}px`
  }

  return(html`
    <div ref=${addRef} class="pds-menu-container">
      <button class="pds-button-link pds-text-sm" id="addButton" invoketarget="addPopover">
        Add filter
      </button>
      <div ref=${popoverRef} onBeforeToggle=${beforeToggle} class="pds-menu pds-menu-left" id="addPopover" anchor="addButton" popover="auto">
        <ul>
          ${data.filter(item => !filters.includes(item.type)).map((item) => html`
            <li key=${item}><button class="pds-menu-item" onclick=${() => clickedItem(item)}>${item.type}</button></li>
          `)}
        </ul>
      </div>
    </div>
  `)
}

function App() {
  const [filters, setFilters] = useState([])

  return(html`
    <h1>Projects</h1>
    <div class="pds-my-lg pds-flex pds-items-center pds-gap-sm">
      ${filters.map((item) => html`<${ExistingFilter} key=${item} type=${item} />`)}
      ${filters.length < data.length && html`<${AddFilter} filters=${filters} setFilters=${setFilters} />`}
    </div>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
