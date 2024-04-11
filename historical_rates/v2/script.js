import { h, Component, render } from 'https://esm.sh/preact@10.19.7'
import { useState } from 'https://esm.sh/preact@10.19.7/hooks'
import { signal } from 'https://esm.sh/@preact/signals@1.2.3'
import htm from 'https://esm.sh/htm'
import dayjs from 'https://esm.sh/dayjs/dayjs.min.js'

const html = htm.bind(h)
const DATE_FORMAT = "MM/DD/YYYY"

const data = signal([
  {
    "rate": "100.00",
    "start": dayjs('3/28/2022'),
    "open": false
  },
  {
    "rate": "90.00",
    "start": dayjs('08-01-2019'),
    "open": false
  },
  {
    "rate": "80.00",
    "start": dayjs('1-1-1111'),
    "open": false
  }
])

const toggleNewPopover = signal(false)
const newRate = signal('')
const newStart = signal('')

function openEditRate(index) {
  if (toggleNewPopover.value) return
  data.value.forEach((item) => item.open = false)
  data.value[index].open = true
  data.value = [...data.value]
}

function closeEditRate(index) {
  data.value.forEach((item) => item.open = false)
  data.value = [...data.value]
}

function saveRate() {
  data.value = [...data.value, {
    rate: newRate.value,
    start: dayjs(newStart.value)
  }]

  newRate.value = ''
  newStart.value = ''
  toggleNewPopover.value = false
}

function App() {
  return(html`
    <div class="pds-dialog-backdrop pds-dialog-open">
      <dialog class="pds-dialog" open="open">
        <h1 class="pds-dialog-title">Edit rate</h1>
        <fieldset class="pds-mb-md">
          <legend class="pds-label">What billable rates would you like to use?</lengend>
          <div class="pds-radio pds-mb-xs">
            <input type="radio" id="r1" name="rg" checked="" />
            <label for="r1">Default billable rates</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="r2" name="rg" checked="checked" />
            <label for="r2">Custom billable rates</label>
          </div>
        </fieldset>

        <div id="default"></div>

        <div id="custom">
          <div id="graph">
            <ul id="graph-x">
              <li>2018</li>
              <li>2019</li>
              <li>2020</li>
              <li>2021</li>
              <li>2021</li>
              <li>2022</li>
              <li>2023</li>
              <li>2024</li>
            </ul>
            <ul id="graph-rates">
              ${data.value.map((item, index) => {
                return(html`
                  <li class="pds-position-relative">
                    <button class="graph-rate" onClick=${() => openEditRate(index)} aria-label="$${item.rate} starting ${dayjs(item.start).format(DATE_FORMAT)}" data-tooltip="n">$${item.rate}</button>
                    ${item.open && html`
                      <div class="pds-popover pds-popover-s edit-rate">
                        <div class="pds-flex pds-items-end pds-gap-xs pds-p-md">
                          <div>
                            <label for="rate" class="pds-label pds-text-sm">Hourly rate</label>
                            <input type="text" id="rate" class="pds-input pds-input-sm" value="$${item.rate}" />
                          </div>
                          <div>
                            <label for="start" class="pds-label pds-text-sm">Start date</label>
                            <input type="text" id="start" class="pds-input pds-input-sm" value=${dayjs(item.start).format(DATE_FORMAT)} />
                          </div>
                          <button class="pds-button pds-button-primary pds-button-sm">Save rate</button>
                          <button class="pds-button pds-button-sm" onClick=${() => closeEditRate()}>Cancel</button>
                        </div>
                      </div>
                    `}
                  </li>
                `)}
              )}
            </ul>
          </div>

          <div class="pds-card pds-card-warm-white pds-p-md" hidden>
            <div class="pds-label">Hourly rate</label>
            <input type="text" class="pds-input" />
            <button type class="pds-button pds-button-primary">Save</button>
          </div>
        </div>

        <div class="pds-mt-lg">
          <div class="pds-flex pds-items-center pds-justify-between">
            <div id="dialog-actions" class="pds-flex pds-gap-xs">
              <button class="pds-button pds-button-primary">Save billable rates</button>
              <button class="pds-button">Cancel</button>
            </div>
            <div style="height:34px"></div>
            <div class="pds-position-relative">
              <button id="add-custom-rate" class="pds-button pds-button-sm" onClick=${() => toggleNewPopover.value = true}>Add custom rate</button>
              ${toggleNewPopover.value && html`
                <div class="pds-popover pds-popover-sw new-rate">
                  <div class="pds-flex pds-items-end pds-gap-xs pds-p-md">
                    <div>
                      <label for="rate" class="pds-label pds-text-sm">Hourly rate</label>
                      <input type="text" onInput=${({target}) => newRate.value = target.value } id="rate" class="pds-input pds-input-sm" />
                    </div>
                    <div>
                      <label for="start" class="pds-label pds-text-sm">Start date</label>
                      <input type="text" onInput=${({target}) => newStart.value = target.value } id="start" class="pds-input pds-input-sm" />
                    </div>
                    <button class="pds-button pds-button-primary pds-button-sm" onClick=${() => saveRate()}>Save rate</button>
                    <button class="pds-button pds-button-sm" onClick=${() => toggleNewPopover.value = false}>Cancel</button>
                  </div>
                </div>
              `}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  `)
}

render(html`<${App} />`, document.getElementById('root'))