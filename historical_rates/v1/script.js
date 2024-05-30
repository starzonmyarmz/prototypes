import { h, Component, render } from 'https://esm.sh/preact@10.19.7'
import { signal } from 'https://esm.sh/@preact/signals@1.2.3'
import htm from 'https://esm.sh/htm'
import dayjs from 'https://esm.sh/dayjs/dayjs.min.js'

const html = htm.bind(h)
const DATE_FORMAT = "MM/DD/YYYY"

// const data = signal([
//   {
//     "rate": "100.00",
//     "start": dayjs('3/28/2022')
//   },
//   {
//     "rate": "90.00",
//     "start": dayjs('08-01-2019')
//   },
//   {
//     "rate": "80.00",
//     "start": dayjs('1-1-1111')
//   }
// ])

const data = signal([])

const newRate = signal('')
const newStart = signal('')

function addRow() {
  document.body.classList.add('loaded')

  data.value = [...data.value, {
    rate: parseDecimal(newRate.value),
    start: dayjs(newStart.value)
  }].sort((a, b) => (dayjs(b.start).isAfter(dayjs(a.start)) ? 1 : -1))

  newRate.value = ''
  newStart.value = ''
}

function updateValue(prop, index) {
  let value = event.target.value

  if (prop === 'rate') value = parseDecimal(value)
  if (prop === 'start') value = value === 'forever' ? dayjs('1-1-1111') : dayjs(value)

  data.value[index][prop] = value

  data.value = [...data.value].sort((a, b) => (dayjs(b.start).isAfter(dayjs(a.start)) ? 1 : -1))
}

function validateRow() {
  if (!newRate.value) return
  if (!newStart.value && data.value.length > 0) return
  if (!newStart.value && data.value.length === 0) {
    newStart.value = '1/1/1111'
  }
  addRow()
}

function parseToday(value) {
  return dayjs(value).format(DATE_FORMAT)
}

function parseYesterday(value) {
  return dayjs(value).subtract(1, 'day').format(DATE_FORMAT)
}

function parseDecimal(value) {
  if (!value.includes('.')) return `${value}.00`
}

function removeRow(index) {
  data.value.splice(index, 1)
  data.value = [...data.value]
}

function App() {
  return (html`
    <dialog class="pdsf-dialog pds-dialog-open pds-dialog-md" open>
      <h1 class="pds-dialog-title">Edit George’s billable rates</h1>
      <table class="pds-table">
        <thead>
          <tr>
            <th class="hourly-rate pds-text-center">Hourly Rate</th>
            <th class="start-date pds-text-center">Start date</th>
            <th class="end-date pds-text-center">End date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${data.value.length > 0 ? html`
            ${data.value.map((item, index) => {
    return (html`
                <tr>
                  <td>
                    <div class="faux-input">
                      <div class="pds-flex pds-gap-xs wrap currency">
                        <span class="pds-color-muted">$</span>
                        <input type="number" onBlur=${(event) => updateValue('rate', index)} value=${item.rate} class="pds-flex-fill pds-text-right no-style" />
                        <span class="pds-color-muted">USD</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${data.value.length === 1 ? html`
                      <div class="pds-text-center pds-color-muted">—</div>
                    ` : html`
                      ${index === data.value.length - 1 ? html`
                        <div class="pds-text-center pds-color-muted">—</div>
                      ` : html`
                        <div class="pds-flex pds-gap-xs faux-input date">
                          <span class="pds-color-muted">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          </span>
                          <input type="text" onBlur=${(event) => updateValue('start', index)} value=${parseToday(item.start)} />
                        </div>
                      `}
                    `}
                  </td>
                  <td class="pds-text-center pds-color-muted">
                    ${data.value.length === 1 ? html`
                      <div class="pds-text-lg">—</div>
                    ` : html`
                      ${index === 0 ? html`
                      <div class="pds-text-lg">—</div>
                      ` : html`
                        <div class="pds-text-sm">${parseYesterday(data.value[index - 1]?.start)}</div>
                      `}
                    `}
                  </td>
                  <td>
                    <button onClick=${() => removeRow(index)} class="pds-button pds-button-icon pds-button-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="X icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </td>
                </tr>
              `)
  }
  )}
          ` : html`
            <tr>
              <td colspan="100" class="pds-py-lg">
                You don’t have any rates!
              </td>
            </tr>
          `}
          <tr class="spacer"><td colspan="100"></td></tr>
          <tr class="form">
            <td>
              <div class="faux-input">
                <div class="pds-flex pds-gap-xs wrap currency">
                  <span class="pds-color-muted">$</span>
                  <input type="number" value=${newRate.value} onInput=${(event) => { newRate.value = event.target.value }} class="pds-flex-fill pds-text-right no-style" />
                  <span class="pds-color-muted">USD</span>
                </div>
              </div>
            </td>
            <td>
              ${data.value.length > 0 ? html`
                <div class="pds-flex pds-gap-xs faux-input date">
                  <span class="pds-color-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </span>
                  <input type="text" value=${newStart.value} onInput=${(event) => { newStart.value = event.target.value }} />
                </div>
              ` : html`
                <div class="pds-text-center pds-color-muted">—</div>
              `}
            </td>
            <td class="pds-text-center pds-color-muted">
              ${data.value.length > 0 ? '' : '—'}
            </td>
            <td>
              <button onClick=${validateRow} class="pds-button pds-button-sm">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pds-mt-lg pds-flex pds-gap-xs">
        <button class="pds-button pds-button-primary">Save billable rates</button>
        <button class="pds-button">Cancel</button>
      </div>
    </dialog>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
