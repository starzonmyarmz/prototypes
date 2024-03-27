import { h, Component, render } from 'https://esm.sh/preact'
import { signal } from 'https://esm.sh/@preact/signals'
// import { useState } from 'https://esm.sh/preact/hooks'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

const data = signal([
  {
    "rate": "100.00",
    "start": "10/10/2000",
    "end": "10/10/2020"
  },
  {
    "rate": "100.00",
    "start": "10/10/2000",
    "end": "10/10/2020"
  },
  {
    "rate": "100.00",
    "start": "10/10/2000",
    "end": "10/10/2020"
  }
])

function removeRow(index) {
  data.value.splice(index, 1)
  data.value = [...data.value]
}

function App() {
  return(html`
    <table class="pds-table">
      <thead>
        <tr>
          <th>Hourly Rate</th>
          <th>Start/end dates</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${data.value.map((item, index) => {
          return(html`
            <tr>
              <td>
                <div class="faux-input">
                  <div class="pds-flex pds-gap-xs wrap currency" style="width: 112px">
                    <span class="pds-color-muted">$</span>
                    <input type="text" value=${item.rate} class="pds-flex-fill pds-text-right no-style" />
                    <span class="pds-color-muted">USD</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="pds-flex pds-gap-xs date" style="width: 256px">
                  <div class="pds-flex pds-gap-xs faux-input">
                    <span class="pds-color-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    <input type="text" value=${item.start} class="pds-flex-fill" />
                  </div>
                  to
                  <div class="pds-flex pds-gap-xs faux-input">
                    <span class="pds-color-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    <input type="text" value=${item.end} class="pds-flex-fill" />
                  </div>
                </div>
              </td>
              <td>
                <button onClick=${() => removeRow(index)} class="pds-button pds-button-icon pds-button-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="X icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </td>
            </tr>
          `)}
        )}
      </tbody>
    </table>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
