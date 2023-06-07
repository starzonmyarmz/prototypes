import { h, Component, render } from 'https://esm.sh/preact'
import { useEffect, useState } from 'https://esm.sh/preact/hooks'
import { Dialog } from '../dialog.js'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

const data = [
  {
    "name": "Product team time",
    "format": "Excel",
    "recurring": "Weekly",
    "date": "05/04/2023"
  },
  {
    "name": "Engineering team expenses",
    "format": "Excel",
    "recurring": "Monthly",
    "date": "05/03/2023"
  },
  {
    "name": "Company expenses",
    "format": "PDF",
    "recurring": "Monthly",
    "date": "05/20/2023"
  },
  {
    "name": "Company time for accountant",
    "format": "Excel",
    "recurring": "Weekly",
    "date": "04/12/2023"
  },
  {
    "name": "Joe's Pizza website design",
    "format": "CSV",
    "recurring": "Daily",
    "date": "04/01/2023"
 
 }
]

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  function Menu() {
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
      <div class="pds-position-relative">
        <button type="button" class="pds-button pds-button-sm list-menu-button" onClick=${() => { setMenuOpen(true)}}>
          Actions
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-label="Down chevron icon" aria-hidden="true">
            <polyline points="5 9 12 17 19 9"></polyline>
          </svg>
        </button>
        ${menuOpen && (html`
          <div class="pds-menu pds-menu-right list-menu">
            <ul>
              <li><button type="button" class="pds-menu-item" onClick=${() => setDialogOpen(true)}>Edit</button></li>
              <li><button type="button" class="pds-menu-item" onClick=${() => setDialogOpen(true)}>Export</button></li>
              <li><button type="button" class="pds-menu-item pds-menu-separator pds-menu-item-danger" onClick=${() => setDeleteDialogOpen(true)}>Delete</button></li>
            </ul>
          </div>
        `)}
      </div>
    `)
  }

  return (html`
    <${Dialog} dialogOpen=${dialogOpen} setDialogOpen=${setDialogOpen} state="edit" />
    <div class="pds-dialog-backdrop ${deleteDialogOpen ? 'pds-dialog-open' : '' }">
      <div class="pds-dialog pds-dialog-sm" role="alertdialog">
        <h1 class="pds-dialog-title">Delete export</h1>
        <p>Are you sure you want to delete this recurring export? There is no undo. Deleting this export will not remove any data from your account.</p>
        <div class="pds-flex-list pds-mt-sm">
          <button type="button" class="pds-button pds-button-danger" onClick=${() => setDeleteDialogOpen(false)}>Delete export</button>
          <button type="button" class="pds-button" onClick=${() => setDeleteDialogOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
    <div class="pds-container">
      <table class="pds-table">
        <thead>
          <tr>
            <th>Report name</th>
            <th>Format</th>
            <th>Recurring</th>
            <th>Date last exported</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${data.map((row, index) => {
            return(html`
              <tr key=${index}>
                <td><strong>${row.name}</strong></td>
                <td>${row.format}</td>
                <td>${row.recurring}</td>
                <td>${row.date}</td>
                <td class="pds-text-right">
                  ${Menu()}
                </td>
              </tr>
            `)
          })}
        </tbody>
      </table>
    </div>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
