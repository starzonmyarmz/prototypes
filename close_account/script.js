import { h, Component, render } from 'https://esm.sh/preact'
import { useEffect, useState } from 'https://esm.sh/preact/hooks'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

function App() {
  const [currentWhyStep, setCurrentWhyStep] = useState('start')
  const [whyStep, setWhyStep] = useState(null)
  const [whyDisabled, setWhyDisabled] = useState(true)
  const [needsStep, setNeedsStep] = useState(null)
  const [needsDisabled, setNeedsDisabled] = useState(true)
  const [businessStep, setBusinessStep] = useState(null)
  const [businessDisabled, setBusinessDisabled] = useState(true)
  const [lifeStep, setLifeStep] = useState(null)
  const [lifeDisabled, setLifeDisabled] = useState(true)
  const [extraStep, setExtraStep] = useState(null)
  const [extraDisabled, setExtraDisabled] = useState(true)
  const [competitorStep, setCompetitorStep] = useState(null)
  const [competitorDisabled, setCompetitorDisabled] = useState(true)

  useEffect(() => {
    if (whyStep !== null) setWhyDisabled(false)
    if (needsStep !== null) setNeedsDisabled(false)
    if (businessStep !== null) setBusinessDisabled(false)
    if (lifeStep !== null) setLifeDisabled(false)
    if (extraStep !== null) setExtraDisabled(false)
    if (competitorStep !== null) setCompetitorDisabled(false)
  })

  return (html`
    <section class="${currentWhyStep === 'start' && ('active')}">
      <h1 class="pds-mb-md">Close account</h1>
      <img src="./peace.png" width="200" height="252" class="pds-fl-right pds-ml-md" />
      <p>Okay, here’s what to expect…</p>
      <ul>
        <li>Your Harvest account will be closed immediately.</li>
        <li>We’ll email you a link to download your Harvest data. The link will expire in one week.</li>
        <li>We’ll securely delete your Harvest data within 10 days. There are no recovery options.</li>
      </ul>
      <p>We’ve got three quick questions for you. Once we’ve got your answers, you’ll be able to finish closing the account.</p>
      <p>Thanks for taking the time!</p>
      <button type="button" class="pds-button pds-button-primary" onClick=${() => setCurrentWhyStep('why')}>Continue to first question</button>
    </section>

    <section class="${currentWhyStep === 'why' && ('active')}">
      <fieldset>
        <legend class="pds-h4 pds-mb-md">Why are you closing your Harvest account?</legend>
        <div class="pds-radio">
          <input type="radio" id="whyCloseAccount_1" name="whyCloseAccount" onClick=${() => setWhyStep('needs')} />
          <label for="whyCloseAccount_1">Harvest doesn’t fit our needs</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="whyCloseAccount_2" name="whyCloseAccount" onClick=${() => setWhyStep('business')} />
          <label for="whyCloseAccount_2">Something changed for our business</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="whyCloseAccount_3" name="whyCloseAccount" onClick=${() => setWhyStep('life')} />
          <label for="whyCloseAccount_3">Something changed for me</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="whyCloseAccount_4" name="whyCloseAccount" onClick=${() => setWhyStep('adopt')} />
          <label for="whyCloseAccount_4">We’re not ready to adopt Harvest</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="whyCloseAccount_5" name="whyCloseAccount" onClick=${() => setWhyStep('extra')} />
          <label for="whyCloseAccount_5">We’re closing an extra account</label>
        </div>
      </fieldset>
      <div class="pds-flex pds-gap-xs">
        <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('start')}>Back</button>
        <button type="button" class="pds-button pds-button-primary" disabled=${whyDisabled} onClick=${() => setCurrentWhyStep(whyStep === 'adopt' ? 'competitor' : whyStep)}>Continue to second question</button>
      </div>
    </section>

    <section class="${currentWhyStep === 'needs' && ('active')}">
      <fieldset>
        <legend class="pds-h4 pds-mb-md">Why doesn’t Harvest fit your needs?</legend>
        <div class="pds-radio">
          <input type="radio" id="needs_1" name="needs" onClick=${() => setNeedsStep('needs')} />
          <label for="needs_1">We're trying to use fewer tools</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="needs_2" name="needs" onClick=${() => setNeedsStep('needs')} />
          <div>
            <label for="needs_2">Harvest is missing the feature(s) or integration(s) we need</label>
            <textarea rows="2" class="pds-input pds-m-0 pds-mt-xs pds-mb-sm" placeholder="Can you tell us more?"></textarea>
          </div>
        </div>
        <div class="pds-radio">
          <input type="radio" id="needs_3" name="needs" onClick=${() => setNeedsStep('needs')} />
          <label for="needs_3">Harvest has more features than we need</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="needs_4" name="needs" onClick=${() => setNeedsStep('needs')} />
          <div>
            <label for="needs_4">We struggled to fit Harvest into our workflow</label>
            <textarea rows="2" class="pds-input pds-m-0 pds-mt-xs pds-mb-sm" placeholder="Can you tell us more?"></textarea>
          </div>
        </div>
        <div class="pds-radio">
          <input type="radio" id="needs_5" name="needs" onClick=${() => setNeedsStep('five')} />
          <div>
            <label for="needs_5">We were looking for a different kind of tool</label>
            <textarea rows="2" class="pds-input pds-m-0 pds-mt-xs pds-mb-sm" placeholder="Can you tell us more?"></textarea>
          </div>
        </div>
        <div class="pds-radio">
          <input type="radio" id="needs_6" name="needs" onClick=${() => setNeedsStep('six')} />
          <label for="needs_6">Harvest is too expensive</label>
        </div>
      </fieldset>
      <div class="pds-flex pds-gap-xs">
        <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('why')}>Back</button>
        <button type="button" class="pds-button pds-button-primary" disabled=${needsDisabled} onClick=${() => setCurrentWhyStep('competitor')}>Continue to last question</button>
      </div>
    </section>

    <section class="${currentWhyStep === 'business' && ('active')}">
      <fieldset>
        <legend class="pds-h4 pds-mb-md">What changed about your business?</legend>
        <div class="pds-radio">
          <input type="radio" id="business_1" name="business" onClick=${() => setBusinessStep('business')} />
          <label for="business_1">We changed how we bill</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="business_2" name="business" onClick=${() => setBusinessStep('business')} />
          <label for="business_2">We finished this project</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="business_3" name="business" onClick=${() => setBusinessStep('business')} />
          <label for="business_3">We need to cut costs</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="business_4" name="business" onClick=${() => setBusinessStep('business')} />
          <label for="business_4">Our company got acquired</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="business_5" name="business" onClick=${() => setBusinessStep('business')} />
          <label for="business_5">Our business closed</label>
        </div>
      </fieldset>
      <div class="pds-flex pds-gap-xs">
        <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('why')}>Back</button>
        <button type="button" class="pds-button pds-button-primary" disabled=${businessDisabled} onClick=${() => setCurrentWhyStep('competitor')}>Continue to last question</button>
      </div>
    </section>

    <section class="${currentWhyStep === 'life' && ('active')}">
      <fieldset>
        <legend class="pds-h4 pds-mb-md">What changed about your life?</legend>
        <div class="pds-radio">
          <input type="radio" id="life_1" name="life" onClick=${() => setLifeStep('life')} />
          <label for="life_1">I started a new job</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="life_2" name="life" onClick=${() => setLifeStep('life')} />
          <label for="life_2">I retired</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="life_3" name="life" onClick=${() => setLifeStep('life')} />
          <label for="life_3">I'm taking some time away from work</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="life_4" name="life" onClick=${() => setLifeStep('life')} />
          <label for="life_4">I'm leaving this company</label>
        </div>
      </fieldset>
      <div class="pds-flex pds-gap-xs">
        <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('why')}>Back</button>
        <button type="button" class="pds-button pds-button-primary" disabled=${lifeDisabled} onClick=${() => setCurrentWhyStep('competitor')}>Continue to last question</button>
      </div>
    </section>

    <section class="${currentWhyStep === 'extra' && ('active')}">
      <fieldset>
        <legend class="pds-h4 pds-mb-md">Why are you closing an extra account?</legend>
        <div class="pds-radio">
          <input type="radio" id="extra_1" name="extra" onClick=${() => setExtraStep('extra')} />
          <label for="extra_1">I accidentally opened this account</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="extra_2" name="extra" onClick=${() => setExtraStep('extra')} />
          <label for="extra_2">We're moving to a different Harvest account</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="extra_3" name="extra" onClick=${() => setExtraStep('extra')} />
          <label for="extra_3">This was a test account</label>
        </div>
      </fieldset>
      <div class="pds-flex pds-gap-xs">
        <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('why')}>Back</button>
        <button type="button" class="pds-button pds-button-primary" disabled=${extraDisabled} onClick=${() => setCurrentWhyStep('competitor')}>Continue to last question</button>
      </div>
    </section>

    <section class="${currentWhyStep === 'competitor' && ('active')}">
      <fieldset>
        <legend class="pds-h4 pds-mb-md">What tool will you be using instead of Harvest to track time?</legend>
        <div class="pds-radio">
          <input type="radio" id="tool_1" name="tool" onClick=${() => setCompetitorStep('competitor')} />
          <div>
            <label for="tool_1">A time tracking tool</label>
            <div class="pds-choices pds-m-0 pds-mt-xs pds-mb-sm">
              <div class="pds-choice">
                <input type="radio" name="times" id="time_1" />
                <label for="time_1" aria-label="Clockify"><img src="clockify-logo.png" alt="" width="88" aria-hidden="true" /></label>
              </div>
              <div class="pds-choice">
                <input type="radio" name="times" id="time_2" />
                <label for="time_2" aria-label="Everhour"><img src="everhour-logo.png" alt="" width="96" aria-hidden="true" /></label>
              </div>
              <div class="pds-choice">
                <input type="radio" name="times" id="time_3" />
                <label for="time_3" aria-label="Toggl"><img src="toggl-logo.png" alt="" width="72" aria-hidden="true" /></label>
              </div>
              <div class="pds-choice">
                <input type="radio" name="times" id="time_4" />
                <label for="time_4">Other</label>
              </div>
            </div>
          </div>
        </div>
        <div class="pds-radio">
          <input type="radio" id="tool_2" name="tool" onClick=${() => setCompetitorStep('competitor')} />
          <div>
            <label for="tool_2">A project management tool</label>
            <div class="pds-choices pds-m-0 pds-mt-xs pds-mb-sm">
              <div class="pds-choice">
                <input type="radio" name="pms" id="pms_1" />
                <label for="pms_1" aria-label="Asana"><img src="asana-logo.png" alt="" width="88" aria-hidden="true" /></label>
              </div>
              <div class="pds-choice">
                <input type="radio" name="pms" id="pms_2" />
                <label for="pms_2" aria-label="ClickUp"><img src="clickup-logo.png" alt="" width="88" aria-hidden="true" /></label>
              </div>
              <div class="pds-choice">
                <input type="radio" name="pms" id="pms_3" />
                <label for="pms_3" aria-label="Monday"><img src="monday-logo.png" alt="" width="96" aria-hidden="true" /></label>
              </div>
              <div class="pds-choice">
                <input type="radio" name="pms" id="pms_4" />
                <label for="pms_4">Other</label>
              </div>
            </div>
          </div>
        </div>
        <div class="pds-radio">
          <input type="radio" id="tool_3" name="tool" onClick=${() => setCompetitorStep('competitor')} />
          <div>
            <label for="tool_3">An accounting/invoicing tool</label>
            <div class="pds-choices pds-m-0 pds-mt-xs pds-mb-sm">
              <div class="pds-choice">
                <input type="radio" name="invoices" id="invoices_1" />
                <label for="invoices_1" aria-label="Freshbooks"><img src="freshbooks-logo.png" alt="" width="88" aria-hidden="true" /></label>
              </div>
              <div class="pds-choice">
                <input type="radio" name="invoices" id="invoices_2" />
                <label for="invoices_2" aria-label="QuickBooks"><img src="quickbooks-logo.png" alt="" width="88" aria-hidden="true" /></label>
              </div>
              <div class="pds-choice">
                <input type="radio" name="invoices" id="invoices_3" />
                <label for="invoices_3" aria-label="Xero"><img src="xero-logo.png" alt="" width="40" aria-hidden="true" /></label>
              </div>
              <div class="pds-choice">
                <input type="radio" name="invoices" id="invoices_4" />
                <label for="invoices_4">Other</label>
              </div>
            </div>
          </div>
        </div>
        <div class="pds-radio">
          <input type="radio" id="tool_4" name="tool" onClick=${() => setCompetitorStep('competitor')} />
          <label for="tool_4">A spreadsheet</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="tool_5" name="tool" onClick=${() => setCompetitorStep('competitor')} />
          <label for="tool_5">We built our own solution</label>
        </div>
        <div class="pds-radio">
          <input type="radio" id="tool_6" name="tool" onClick=${() => setCompetitorStep('competitor')} />
          <div>
            <label for="tool_6">Another tool not listed</label>
            <input class="pds-input pds-m-0 pds-mt-xs pds-mb-sm" placeholder="What tool?" />
          </div>
        </div>
        <div class="pds-radio">
          <input type="radio" id="tool_7" name="tool" onClick=${() => setCompetitorStep('competitor')} />
          <label for="tool_7">We won't be tracking time</label>
        </div>
      </fieldset>
      <div class="pds-flex pds-gap-xs">
        <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep(whyStep === 'adopt' ? 'why' : whyStep)}>Back</button>
        <button type="button" class="pds-button pds-button-primary" disabled=${competitorDisabled} onClick=${() => setCurrentWhyStep('finish')}>Continue to close account</button>
      </div>
    </section>

    <section class="${currentWhyStep === 'finish' && ('active')}">
      <h1 class="pds-mb-md">Thanks for sharing!</h1>
      <img src="./check.png" width="200" height="200" class="pds-fl-right pds-ml-md" />
      <p>Okay, here’s what to expect…</p>
      <ul>
        <li>Your Harvest account will be closed immediately.</li>
        <li>We’ll email you a link to download your Harvest data. The link will expire in one week.</li>
        <li>We’ll securely delete your Harvest data within 10 days. There are no recovery options.</li>
      </ul>
      <div class="pds-flex pds-gap-xs">
        <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('competitor')}>Back</button>
        <button type="button" class="pds-button pds-button-danger">Close my account</button>
      </div>
    </section>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
