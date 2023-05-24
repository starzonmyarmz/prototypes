import { h, Component, render } from 'https://esm.sh/preact'
import { useEffect, useState } from 'https://esm.sh/preact/hooks'
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

  return (html`
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
                  <button type="button" class="pds-button pds-button-sm">
                    Actions
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-label="Down chevron icon" aria-hidden="true">
                      <polyline points="5 9 12 17 19 9"></polyline>
                    </svg>
                  </button>
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
