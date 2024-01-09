import { h, Component, render } from 'https://esm.sh/preact'
import { useEffect, useState } from 'https://esm.sh/preact/hooks'
import { DndListItem, DndList } from './drag_and_drop.js'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

export function Dialog({ dialogOpen, setDialogOpen, state }) {
  const [format, setFormat] = useState('excel')
  const [recurring, setRecurring] = state == 'edit' ? useState('daily') : useState('never')
  const [duration, setDuration] = useState('first')
  const [columns, setColumns] = useState(['Date', 'Client', 'Project', 'Project code', 'Task', 'Notes', 'Hours', 'Hours rounded', 'Billable', 'Invoiced', 'Approved', 'Notes', 'First name', 'Last name', 'Roles', 'Employee', 'Billable rate', 'Billable amount', 'Cost rate', 'Cost amount', 'Currency', 'External reference url'])

  const moveItem = (source, dest) => {
    const newColumns = [...columns.slice(0, source), ...columns.slice(source + 1)]
    newColumns.splice(dest, 0, columns[source])
    setColumns(newColumns)
  }
  
  function Checkbox(column) {
    const [checked, setChecked] = useState(true)

    return(html`
      <div class="pds-checkbox" data-checkbox>
        <input type="checkbox" id="checkbox_column_${column}" checked=${checked} onClick=${() => setChecked(!checked)} />
        <label for="checkbox_column_${column}">${column}</label>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </div>
    `)
  }

  function Checkboxes() {
    return(html`
      <div>
        <div class="pds-card pds-card-secondary pds-p-sm" style="margin-bottom: -1px">
          <div class="pds-checkbox">
            <input type="checkbox" id="select-all" checked />
            <label for="select-all" class="pds-text-sm pds-color-muted">Column header</label>
          </div>
        </div>
        <div class="pds-card checkboxes">
          <${DndList} onMoveItem=${moveItem}>
            ${columns.map(column => Checkbox(column))}
          </${DndList}>
        </div>
        <div class="pds-field-description">
          You can include, exclude, and reorder columns.
        </div>
      </div>
    `)
  }

  function Customize() {
    return(html`
      <fieldset>
        <legend class="pds-label">Customize exported data</legend>
        ${Checkboxes()}
      </fieldset>
    `)
  }

  function Format() {
    return(html`
      <div>
        <fieldset>
          <legend class="pds-label">Export format</legend>
          <div class="pds-choices">
            <div class="pds-choice">
              <input type="radio" name="export_format" id="export_format_excel" checked=${format == 'excel'} onClick=${() => setFormat('excel')} />
              <label for="export_format_excel">Excel</label>
            </div>
            <div class="pds-choice">
              <input type="radio" name="export_format" id="export_format_csv" checked=${format == 'csv'} onClick=${() => setFormat('csv')} />
              <label for="export_format_csv">CSV</label>
            </div>
            <div class="pds-choice">
              <input type="radio" name="export_format" id="export_format_quickbooks" checked=${format == 'quickbooks'} onClick=${() => setFormat('quickbooks')} />
              <label for="export_format_quickbooks">QuickBooks</label>
            </div>
            <div class="pds-choice">
              <input type="radio" name="export_format" id="export_format_pdf" checked=${format == 'pdf'} onClick=${() => setFormat('pdf')} />
              <label for="export_format_pdf">PDF</label>
            </div>
          </div>
        </fieldset>
        ${format == 'quickbooks' ? html`
          <div class="pds-field-description">
            QuickBooks format cannot be customized.
          </div>
          ` : ''
        }
        ${format == 'pdf' ? html`
          <div class="pds-field-description">
            PDF format cannot be customized.
          </div>
          ` : ''
        }
      </div>
    `)
  }

  function RecurringDuration() {
    return(html`
      <div>
        <label class="pds-label" for="duration">Issue date</label>
        <select id="duration" class="pds-input" value=${duration} onChange=${({target}) => setDuration(target.value)}>
          <option value="first">First day of the month</option>
          <option value="fifteenth">15th of the month</option>
          <option value="last">Last day of the month</option>
        </select>
        <div class="pds-field-description">
          ${duration == 'first' ? html`This report will export now, and an updated export will be generated and sent via email on the first of every month.` : ''}
          ${duration == 'fifteenth' ? html`This report will export now, and an updated export will be generated and sent via email on the 15th of every month.` : ''}
          ${duration == 'last' ? html`This report will export now, and an updated export will be generated and sent via email on the last day of every month.` : ''}
        </div>
      </div>
    `)    
  }

  function RecurringName() {
    return(html`
      <div>
        <label class="pds-label" for="export_name">Export name</label>
        <input type="text" id="export_name" class="pds-input" />
      </div>
    `)
  }

  function Recurring() {
    return(html`
      <div>
        <fieldset>
          <legend class="pds-label">Recurring export</legend>
          <div class="pds-choices">
            <div class="pds-choice">
              <input type="radio" name="recurring_export" id="recurring_export_never" checked=${recurring == 'never'} disabled=${state == 'edit'} onClick=${() => setRecurring('never')} />
              <label for="recurring_export_never">Never</label>
            </div>
            <div class="pds-choice">
              <input type="radio" name="recurring_export" id="recurring_export_daily" checked=${recurring == 'daily'} onClick=${() => setRecurring('daily')} />
              <label for="recurring_export_daily">Daily</label>
            </div>
            <div class="pds-choice">
              <input type="radio" name="recurring_export" id="recurring_export_weekly" checked=${recurring == 'weekly'} onClick=${() => setRecurring('weekly')} />
              <label for="recurring_export_weekly">Weekly</label>
            </div>
            <div class="pds-choice">
              <input type="radio" name="recurring_export" id="recurring_export_monthly" checked=${recurring == 'monthly'} onClick=${() => setRecurring('monthly')} />
              <label for="recurring_export_monthly">Monthly</label>
            </div>
          </div>
        </fieldset>
        <div class="pds-field-description">
          ${recurring == 'never' ? 'This report will not be automatically exported.' : ''}
          ${recurring == 'daily' ? 'This report will export now and an updated export will be generated and sent via email every morning.' : ''}
          ${recurring == 'weekly' ? 'This report will export now, and an updated export will be generated and sent via email every Sunday.' : ''}
        </div>
      </div>
    `)
  }

  function buttonText() {
    if (recurring !== 'never') {
      return state === 'save' ? 'Save and export' : 'Save changes'      
    } else {
      return 'Export report'
    }
  }

  return(html`
    <div class="pds-dialog-backdrop ${dialogOpen ? 'pds-dialog-open' : '' }">
      <div class="pds-dialog pds-dialog-md" role="alertdialog">
        <h1 class="pds-dialog-title">Custom export</h1>
        <div class="contain">
          <${Format} />
          ${format == 'excel' || format == 'csv' ? Customize() : ''}
          <${Recurring} />
          ${recurring == 'monthly' ? RecurringDuration() : ''}
          ${recurring !== 'never' ? RecurringName() : ''}
          <div class="pds-flex-list pds-mt-sm">
            <button type="button" class="pds-button pds-button-primary" onClick=${() => setDialogOpen(false)}>${buttonText()}</button>
            <button type="button" class="pds-button" onClick=${() => setDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `)
}