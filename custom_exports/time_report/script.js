import { h, Component, render } from 'https://esm.sh/preact'
import { useEffect, useState } from 'https://esm.sh/preact/hooks'
import { Dialog } from '../dialog.js'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onClick = () => {
      if (menuOpen) setMenuOpen(false)
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [menuOpen])

  return (html`
    <${Dialog} dialogOpen=${dialogOpen} setDialogOpen=${setDialogOpen} state="save" />
    <div id="export_menu_container">
      <button type="button" id="export_menu_button" class="pds-button pds-button-sm" onClick=${() => setMenuOpen(true)}>
        Export
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-label="Down chevron icon" aria-hidden="true">
          <polyline points="5 9 12 17 19 9"></polyline>
        </svg>
      </button>
      ${menuOpen && (html`
        <div id="export_menu" class="pds-menu pds-menu-right">
          <ul>
            <li><button type="button" class="pds-menu-item">Excel</button></li>
            <li><button type="button" class="pds-menu-item">CSV</button></li>
            <li><button type="button" class="pds-menu-item">QuickBooks</button></li>
            <li><button type="button" class="pds-menu-item">PDF</button></li>
            <li><button type="button" class="pds-menu-item pds-menu-separator" onClick=${() => setDialogOpen(true)}>Custom Export</button></li>
          </ul>
        </div>
      `)}
    </div>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
