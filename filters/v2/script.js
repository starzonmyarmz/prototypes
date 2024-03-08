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

function App() {
  const [activeFilters, setActiveFilters] = useState([])

  function FilterType(activeFilter) {
    const [left, setLeft] = useState(0)
    const [buttonContent, setButtonContent] = useState(activeFilter.type)
    const anchorId = useId()
    const popoverId = useId()
    const ref = useRef(null)

    function setFilter(item) {
      setButtonContent(`${activeFilter.type}: ${item}`)
      document.getElementById(popoverId).hidePopover()
    }

    useLayoutEffect(() => {
      setLeft(ref.current.getBoundingClientRect().left)
    }, [ref])

    return(html`
      <div class="pds-menu-container" ref=${ref}>
        <button type="button" class="pds-button pds-button-sm" id=${anchorId} invoketarget=${popoverId}>
          ${buttonContent}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-label="Down chevron icon" aria-hidden="true">
            <polyline points="5 9 12 17 19 9"></polyline>
          </svg>
        </button>
        <div class="pds-menu pds-menu-left" id=${popoverId} anchor=${anchorId} popover="auto" style="left:${left}px">
          <ul>
            ${data.filter(item => item.type == activeFilter.type)[0].options.map((item) => html`
              <li key=${item}><button class="pds-menu-item" onClick=${() => setFilter(item)}>${item}</button></li>
            `)}
          </ul>
        </div>
      </div>
    `)
  }

  function AddFilter() {
    const [leftOffset, setLeftOffset] = useState(0)
    const addFilterRef = useRef(null)

    useLayoutEffect(() => {
      setLeftOffset(addFilterRef.current.getBoundingClientRect().left)
    }, [addFilterRef])

    function clickedItem(item) {
      setActiveFilters([...activeFilters, item.type])
    }

    return(html`
      <div class="pds-menu-container" ref=${addFilterRef}>
        <button class="pds-button-link pds-text-sm" id="addFilterButton" invoketarget="addFilterPopover">
          Add filter
        </button>
        <div class="pds-menu pds-menu-left" id="addFilterPopover" anchor="addFilterButton" popover="auto" style="left:${leftOffset}px">
          <ul>
            ${data.filter(item => !activeFilters.includes(item.type)).map((item) => html`
              <li key=${item}><button class="pds-menu-item" type="button" onclick=${() => clickedItem(item)}>${item.type}</button></li>
            `)}
          </ul>
        </div>
      </div>
    `)
  }

  return(html`
    <h1>Projects</h1>
    <div class="pds-my-lg pds-flex pds-items-center pds-gap-sm">
      ${activeFilters.map((item) => html`<${FilterType} key=${item} type=${item} />`)}
      ${activeFilters.length < data.length && html`<${AddFilter} />`}
    </div>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
