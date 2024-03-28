import { h, Component, render } from 'https://esm.sh/preact@10.19.7'
import { signal } from 'https://esm.sh/@preact/signals@1.2.3'
import htm from 'https://esm.sh/htm'
import dayjs from 'https://esm.sh/dayjs/dayjs.min.js'

const html = htm.bind(h)
const DATE_FORMAT = "MM/DD/YYYY"

const data = signal([
  {
    "rate": "100.00",
    "start": dayjs('3/28/2022'),
    "end": dayjs('9-9-9999')
  },
  {
    "rate": "90.00",
    "start": dayjs('08-01-2019'),
    "end": dayjs('3/27/2022')
  },
  {
    "rate": "80.00",
    "start": dayjs('1-1-1111'),
    "end": dayjs('07-31-2019')
  }
])

const newRate = signal('')
const newStart = signal('')
const newEnd = signal('')

function addRow() {
  document.body.classList.add('loaded')

  data.value = [...data.value, {
    rate: parseDecimal(newRate.value),
    start: dayjs(newStart.value),
    end: dayjs(newEnd.value)
  }].sort((a, b) => (dayjs(b.start).isAfter(dayjs(a.end)) ? 1 : -1))

  newRate.value = ''
  newStart.value = ''
  newEnd.value = ''
}

function updateValue(prop, index) {
  let value = event.target.value

  if (prop === 'rate') value = parseDecimal(value)
  if (prop === 'start') value = value === 'forever' ? dayjs('1-1-1111') : dayjs(value)
  if (prop === 'end') value = value === 'forever' ? dayjs('9-9-9999') : dayjs(value)

  data.value[index][prop] = value

  data.value = [...data.value].sort((a, b) => (dayjs(b.start).isAfter(dayjs(a.end)) ? 1 : -1))
}

function parseForever(value) {
  return value.$y == "1111" || value.$y == "9999" ? "forever" : dayjs(value).format(DATE_FORMAT)
}

function parseDecimal(value) {
  if (!value.includes('.')) return `${value}.00`
}

function submitForm(event) {
  addRow()
  event.preventDefault()
}

function removeRow(index) {
  data.value.splice(index, 1)
  data.value = [...data.value].sort((a, b) => (dayjs(b.start).isAfter(dayjs(a.end)) ? 1 : -1))
}

function App() {
  return(html`
    <form onSubmit=${submitForm}>
      <table class="pds-table">
        <thead>
          <tr>
            <th>Hourly Rate</th>
            <th>Start date</th>
            <th class="pds-pl-xs">End date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${data.value.length > 0 ? html`
            ${data.value.map((item, index) => {
              let diff = 0

              if (index > 0) {
                const thisEndDate = dayjs(item.end)
                const prevStartDate = dayjs(data.value[index - 1].start)
                diff = prevStartDate.diff(thisEndDate, 'day')
              }

              return(html`
                ${diff > 1 && html`
                  <tr>
                    <td colspan="4" class="error-row">
                      There’s ${diff}-day gap missing a billable rate!
                    </td>
                  </tr>
                `}

                ${diff < 0 && html`
                  <tr>
                    <td colspan="4" class="error-row">
                      There’s ${Math.abs(diff)}-day overlap of billable rates!
                    </td>
                  </tr>
                `}

                <tr>
                  <td>
                    <div class="faux-input">
                      <div class="pds-flex pds-gap-xs wrap currency">
                        <span class="pds-color-muted">$</span>
                        <input type="text" onBlur=${(event) => updateValue('rate', index)} value=${item.rate} class="pds-flex-fill pds-text-right no-style" required />
                        <span class="pds-color-muted">USD</span>
                      </div>
                    </div>
                  </td>
                  <td class="pds-pr-0">
                    <div class="pds-flex pds-gap-xs date">
                      <div class="pds-flex pds-gap-xs faux-input faux-input-start">
                        <span class="pds-color-muted">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </span>
                        <input type="text" onBlur=${(event) => updateValue('start', index)} value=${parseForever(item.start)} class="pds-flex-fill" required />
                      </div>
                      to
                    </div>
                  </td>
                  <td class="pds-pl-xs">
                    <div class="pds-flex pds-gap-xs date faux-input faux-input-end">
                      <span class="pds-color-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </span>
                      <input type="text" onBlur=${(event) => updateValue('end', index)} value=${parseForever(item.end)} class="pds-flex-fill" required />
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
              <td colspan="4" class="empty">
                <div class="pds-empty">There are no billable rates!</div>
              </td>
            </tr>
          `}

          <tr class="form">
            <td>
              <div class="faux-input">
                <div class="pds-flex pds-gap-xs wrap currency">
                  <span class="pds-color-muted">$</span>
                  <input type="text" value=${newRate.value} onInput=${(event) => { newRate.value = event.target.value }} class="pds-flex-fill pds-text-right no-style" required />
                  <span class="pds-color-muted">USD</span>
                </div>
              </div>
            </td>
            <td class="pds-pr-0">
              <div class="pds-flex pds-gap-xs date">
                <div class="pds-flex pds-gap-xs faux-input">
                  <span class="pds-color-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </span>
                  <input type="text" value=${newStart.value} onInput=${(event) => { newStart.value = event.target.value }} class="pds-flex-fill" required />
                </div>
                to
              </div>
            </td>
            <td class="pds-pl-xs">
              <div class="pds-flex pds-gap-xs date faux-input">
                <span class="pds-color-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 30, 28, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Calendar icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </span>
                <input type="text" value=${newEnd.value} onInput=${(event) => { newEnd.value = event.target.value }} class="pds-flex-fill" required />
              </div>
            </td>
            <td>
              <button type="submit" class="pds-button pds-button-sm">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
