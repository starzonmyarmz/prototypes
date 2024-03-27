import { h, Component, render } from 'https://esm.sh/preact@10.19.7'
import { signal } from 'https://esm.sh/@preact/signals@1.2.3'
import htm from 'https://esm.sh/htm'
import dayjs from 'https://esm.sh/dayjs/dayjs.min.js'

const html = htm.bind(h)

const data = signal([
  {
    "rate": "90.00",
    "start": dayjs('08-01-2019').format('MM/DD/YYYY'),
    "end": dayjs().subtract(2, 'year').subtract(1, 'day').format('MM/DD/YYYY')
  },
  {
    "rate": "100.00",
    "start": dayjs().subtract(2, 'year').subtract(0, 'day').format('MM/DD/YYYY'),
    "end": dayjs('11-11-9999').format('MM/DD/YYYY')
  },
  {
    "rate": "80.00",
    "start": dayjs('11-11-1111').format('MM/DD/YYYY'),
    "end": dayjs('08-01-2019').subtract(1, 'day').format('MM/DD/YYYY')
  }
])

const newRate = signal("")
const newStart = signal("")
const newEnd = signal("")

function addRow() {
  if (newRate.value === "" || newStart.value === "" || newEnd.value === "") return
  if (!newRate.value.includes('.')) newRate.value = `${newRate}.00`
  document.body.classList.add('loaded')
  data.value = [...data.value, { rate: newRate.value, start: newStart.value, end: newEnd.value }]
  newRate.value = ""
  newStart.value = ""
  newEnd.value = ""
}

function removeRow(index) {
  data.value.splice(index, 1)
  data.value = [...data.value]
}

function App() {
  const updateValue = event => (newItem.value = event.target.value)

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
        ${data.value.length > 0 ? html`
          ${data.value.sort((a, b) => (dayjs(a.start).isAfter(dayjs(b.end)) ? 1 : -1)).reverse().map((item, index) => {
            let diff = 0

            if (index > 0) {
              const thisEndDate = dayjs(item.end)
              const prevStartDate = dayjs(data.value[index - 1].start)
              diff = prevStartDate.diff(thisEndDate, 'day')
            }

            return(html`
              ${diff > 1 && html`
                <tr>
                  <td colspan="3" class="error-row">
                    There’s ${diff}-day gap missing a billable rate!
                  </td>
                </tr>
              `}

              ${diff < 0 && html`
                <tr>
                  <td colspan="3" class="error-row">
                    There’s ${Math.abs(diff)}-day overlap of billable rates!
                  </td>
                </tr>
              `}

              <tr>
                <td>
                  <div class="faux-input">
                    <div class="pds-flex pds-gap-xs wrap currency" style="width: 112px">
                      <span class="pds-color-muted">$</span>
                      <input type="text" aria-label="Billable rate of ${item.rate}" value=${item.rate} class="pds-flex-fill pds-text-right no-style" />
                      <span class="pds-color-muted">USD</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="pds-flex pds-gap-xs date" style="width: 256px">
                    <div class="pds-flex pds-gap-xs faux-input faux-input-start">
                      <span class="pds-color-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </span>
                      <input type="text" aria-label="Start date of ${item.start}" value=${item.start} class="pds-flex-fill" />
                    </div>
                    to
                    <div class="pds-flex pds-gap-xs faux-input faux-input-end">
                      <span class="pds-color-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </span>
                      <input type="text" aria-label="End date of ${item.end}" value=${item.end} class="pds-flex-fill" />
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
        ` : html`
          <tr>
            <td colspan="3" class="empty">
              <div class="pds-empty">There are no billable rates!</div>
            </td>
          </tr>
        `}

        <tr class="form">
          <td>
            <div class="faux-input">
              <div class="pds-flex pds-gap-xs wrap currency" style="width: 112px">
                <span class="pds-color-muted">$</span>
                <input type="text" aria-label="New billable rate" value=${newRate.value} onInput=${(event) => { newRate.value = event.target.value }} class="pds-flex-fill pds-text-right no-style" />
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
                <input type="text" aria-label="New start date" value=${newStart.value} onInput=${(event) => { newStart.value = event.target.value }} class="pds-flex-fill" />
              </div>
              to
              <div class="pds-flex pds-gap-xs faux-input">
                <span class="pds-color-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </span>
                <input type="text" aria-label="New end date" value=${newEnd.value} onInput=${(event) => { newEnd.value = event.target.value }} class="pds-flex-fill" />
              </div>
            </div>
          </td>
          <td>
            <button onClick=${addRow} class="pds-button pds-button-sm">Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
