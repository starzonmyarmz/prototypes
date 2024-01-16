import { h, Component, render } from 'https://esm.sh/preact'
import { useState } from 'https://esm.sh/preact/hooks'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

function App() {
  const [currentWhyStep, setCurrentWhyStep] = useState('start')
  const [whyStep, setWhyStep] = useState(null)

  return (html`
    ${currentWhyStep === 'start' && (html`
      <section>
        <h1 class="pds-mb-md">Close account</h1>
        <img src="./peace.png" width="200" height="252" class="pds-fl-right pds-ml-md" />
        <p>Okay, here’s what to expect…</p>
        <ul>
          <li>Your Harvest account will be closed immediately.</li>
          <li>We’ll email you a link to download your Harvest data. The link will expire in one week.</li>
          <li>We’ll securely delete your Harvest data within 10 days. There are no recovery options.</li>
        </ul>
        <p>We’ve got three quick questions for you. Once we’ve got your answers, you’ll be able to finish closing the account.</p>
        <p>Have you considered converting your account to our <a href="#">free plan</a>?</p>
        <button type="button" class="pds-button pds-button-primary" onClick=${() => setCurrentWhyStep('why')}>Continue</button>
      </section>
    `)}

    ${currentWhyStep === 'why' && (html`
      <section>
        <fieldset>
          <legend class="pds-mb-md">
            <div class="pds-h5">Question 1 of 3</div>
            <div class="pds-h3">Why are you closing your Harvest account?</div>
          </legend>
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
          <button type="button" class="pds-button pds-button-primary" onClick=${() => setCurrentWhyStep(whyStep == null ? 'competitor' : whyStep)}>Continue</button>
        </div>
      </section>
    `)}

    ${currentWhyStep === 'needs' && (html`
      <section>
        <fieldset>
          <legend class="pds-mb-md">
            <div class="pds-h5">Question 2 of 3</div>
            <div class="pds-h3">Why doesn’t Harvest fit your needs?</div>
          </legend>
          <div class="pds-radio">
            <input type="radio" id="needs_1" name="needs" />
            <label for="needs_1">We’re trying to use fewer tools</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="needs_2" name="needs" />
            <div class="pds-flex-fill">
              <label for="needs_2">Harvest is missing the feature(s) or integration(s) we need</label>
              <textarea rows="2" class="pds-input pds-m-0 pds-mt-xs pds-mb-sm" placeholder="Can you tell us more?"></textarea>
            </div>
          </div>
          <div class="pds-radio">
            <input type="radio" id="needs_3" name="needs" />
            <label for="needs_3">Harvest has more features than we need</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="needs_4" name="needs" />
            <div class="pds-flex-fill">
              <label for="needs_4">We struggled to fit Harvest into our workflow</label>
              <textarea rows="2" class="pds-input pds-m-0 pds-mt-xs pds-mb-sm" placeholder="Can you tell us more?"></textarea>
            </div>
          </div>
          <div class="pds-radio">
            <input type="radio" id="needs_5" name="needs" />
            <div class="pds-flex-fill">
              <label for="needs_5">We were looking for a different kind of tool</label>
              <textarea rows="2" class="pds-input pds-m-0 pds-mt-xs pds-mb-sm" placeholder="Can you tell us more?"></textarea>
            </div>
          </div>
          <div class="pds-radio">
            <input type="radio" id="needs_6" name="needs" />
            <label for="needs_6">Harvest is too expensive</label>
          </div>
        </fieldset>
        <div class="pds-flex pds-gap-xs">
          <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('why')}>Back</button>
          <button type="button" class="pds-button pds-button-primary" onClick=${() => setCurrentWhyStep('competitor')}>Continue</button>
        </div>
      </section>
    `)}

    ${currentWhyStep === 'business' && (html`
      <section>
        <fieldset>
          <legend class="pds-mb-md">
            <div class="pds-h5">Question 2 of 3</div>
            <div class="pds-h3">What changed about your business?</div>
          </legend>
          <div class="pds-radio">
            <input type="radio" id="business_1" name="business" />
            <label for="business_1">We changed how we bill</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="business_2" name="business" />
            <label for="business_2">We finished this project</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="business_3" name="business" />
            <label for="business_3">We need to cut costs</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="business_4" name="business" />
            <label for="business_4">Our company got acquired</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="business_5" name="business" />
            <label for="business_5">Our business closed</label>
          </div>
        </fieldset>
        <div class="pds-flex pds-gap-xs">
          <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('why')}>Back</button>
          <button type="button" class="pds-button pds-button-primary" onClick=${() => setCurrentWhyStep('competitor')}>Continue</button>
        </div>
      </section>
    `)}

    ${currentWhyStep === 'life' && (html`
      <section>
        <fieldset>
          <legend class="pds-mb-md">
            <div class="pds-h5">Question 2 of 3</div>
            <div class="pds-h3">What changed about your life?</div>
          </legend>
          <div class="pds-radio">
            <input type="radio" id="life_1" name="life" />
            <label for="life_1">I started a new job</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="life_2" name="life" />
            <label for="life_2">I retired</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="life_3" name="life" />
            <label for="life_3">I’m taking some time away from work</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="life_4" name="life" />
            <label for="life_4">I’m leaving this company</label>
          </div>
        </fieldset>
        <div class="pds-flex pds-gap-xs">
          <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('why')}>Back</button>
          <button type="button" class="pds-button pds-button-primary" onClick=${() => setCurrentWhyStep('competitor')}>Continue</button>
        </div>
      </section>
    `)}

    ${currentWhyStep === 'adopt' && (html`
      <section>
        <fieldset>
          <legend class="pds-mb-md">
            <div class="pds-h5">Question 2 of 3</div>
            <div class="pds-h3">Why aren’t you ready to adopt Harvest?</div>
          </legend>
          <div class="pds-radio">
            <input type="radio" id="adopt_1" name="adopt" />
            <label for="adopt_1">Reason one</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="adopt_2" name="adopt" />
            <label for="adopt_2">Reason two</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="adopt_3" name="adopt" />
            <label for="adopt_3">Reason three</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="adopt_4" name="adopt" />
            <label for="adopt_4">Reason four</label>
          </div>
        </fieldset>
        <div class="pds-flex pds-gap-xs">
          <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('why')}>Back</button>
          <button type="button" class="pds-button pds-button-primary" onClick=${() => setCurrentWhyStep('competitor')}>Continue</button>
        </div>
      </section>
    `)}

    ${currentWhyStep === 'extra' && (html`
      <section>
        <fieldset>
          <legend class="pds-mb-md">
            <div class="pds-h5">Question 2 of 3</div>
            <div class="pds-h3">Why are you closing an extra account?</div>
          </legend>
          <div class="pds-radio">
            <input type="radio" id="extra_1" name="extra" />
            <label for="extra_1">I accidentally opened this account</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="extra_2" name="extra" />
            <label for="extra_2">We’re moving to a different Harvest account</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="extra_3" name="extra" />
            <label for="extra_3">This was a test account</label>
          </div>
        </fieldset>
        <div class="pds-flex pds-gap-xs">
          <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('why')}>Back</button>
          <button type="button" class="pds-button pds-button-primary" onClick=${() => setCurrentWhyStep('competitor')}>Continue</button>
        </div>
      </section>
    `)}

    ${currentWhyStep === 'competitor' && (html`
      <section>
        <fieldset>
          <legend class="pds-mb-md">
            <div class="pds-h5">Question 3 of 3</div>
            <div class="pds-h3">What tool will you be using instead of Harvest?</div>
          </legend>
          <div class="pds-radio">
            <input type="radio" id="tool_1" name="tool" />
            <div class="pds-flex-fill">
              <label for="tool_1">A time tracking tool</label>
              <div class="pds-choices pds-m-0 pds-mt-xs pds-mb-sm">
                <div class="pds-choice">
                  <input type="radio" name="times" id="time_1" />
                  <label for="time_1">Clockify</label>
                </div>
                <div class="pds-choice">
                  <input type="radio" name="times" id="time_2" />
                  <label for="time_2">Everhour</label>
                </div>
                <div class="pds-choice">
                  <input type="radio" name="times" id="time_3" />
                  <label for="time_3">Toggl</label>
                </div>
                <div class="pds-choice">
                  <input type="radio" name="times" id="time_4" />
                  <label for="time_4">Other</label>
                </div>
              </div>
              <input class="pds-input pds-m-0 pds-mb-sm" placeholder="What tool?" />
            </div>
          </div>
          <div class="pds-radio">
            <input type="radio" id="tool_2" name="tool" />
            <div class="pds-flex-fill">
              <label for="tool_2">A project management tool</label>
              <div class="pds-choices pds-m-0 pds-mt-xs pds-mb-sm">
                <div class="pds-choice">
                  <input type="radio" name="pms" id="pms_1" />
                  <label for="pms_1">Asana</label>
                </div>
                <div class="pds-choice">
                  <input type="radio" name="pms" id="pms_2" />
                  <label for="pms_2">ClickUp</label>
                </div>
                <div class="pds-choice">
                  <input type="radio" name="pms" id="pms_3" />
                  <label for="pms_3">Monday</label>
                </div>
                <div class="pds-choice">
                  <input type="radio" name="pms" id="pms_4" />
                  <label for="pms_4">Other</label>
                </div>
              </div>
              <input class="pds-input pds-m-0 pds-mb-sm" placeholder="What tool?" />
            </div>
          </div>
          <div class="pds-radio">
            <input type="radio" id="tool_3" name="tool" />
            <div class="pds-flex-fill">
              <label for="tool_3">An accounting/invoicing tool</label>
              <div class="pds-choices pds-m-0 pds-mt-xs pds-mb-sm">
                <div class="pds-choice">
                  <input type="radio" name="invoices" id="invoices_1" />
                  <label for="invoices_1">Freshbooks</label>
                </div>
                <div class="pds-choice">
                  <input type="radio" name="invoices" id="invoices_2" />
                  <label for="invoices_2">QuickBooks</label>
                </div>
                <div class="pds-choice">
                  <input type="radio" name="invoices" id="invoices_3" />
                  <label for="invoices_3">Xero</label>
                </div>
                <div class="pds-choice">
                  <input type="radio" name="invoices" id="invoices_4" />
                  <label for="invoices_4">Other</label>
                </div>
              </div>
              <input class="pds-input pds-m-0 pds-mb-sm" placeholder="What tool?" />
            </div>
          </div>
          <div class="pds-radio">
            <input type="radio" id="tool_4" name="tool" />
            <label for="tool_4">A spreadsheet</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="tool_5" name="tool" />
            <label for="tool_5">We built our own solution</label>
          </div>
          <div class="pds-radio">
            <input type="radio" id="tool_6" name="tool" />
            <div class="pds-flex-fill">
              <label for="tool_6">Another tool not listed</label>
              <input class="pds-input pds-m-0 pds-mt-xs pds-mb-sm" placeholder="What tool?" />
            </div>
          </div>
          <div class="pds-radio">
            <input type="radio" id="tool_7" name="tool" />
            <label for="tool_7">We won't be tracking time</label>
          </div>
        </fieldset>
        <div class="pds-flex pds-gap-xs">
          <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep(whyStep == null ? 'why' : whyStep)}>Back</button>
          <button type="button" class="pds-button pds-button-primary" onClick=${() => setCurrentWhyStep('finish')}>Continue</button>
        </div>
      </section>
    `)}

    ${currentWhyStep === 'finish' && (html`
      <section>
        <h1 class="pds-mb-md">Thanks for sharing!</h1>
        <img src="./check.png" width="200" height="200" class="pds-fl-right pds-ml-md" />
        <p>Okay, here’s what to expect…</p>
        <ul>
          <li>Your Harvest account will be closed immediately, and you will lose access.</li>
          <li>We’ll email you a link to download your Harvest data. The link will expire in one week.</li>
          <li>We’ll securely delete your Harvest data within 10 days. There are no recovery options.</li>
          <li>You will not be billed again.</li>
        </ul>

        <div class="pds-my-lg">
          <label for="anything_else" class="pds-label">Anything else you’d like to share?</label>
          <textarea id="anything_else" class="pds-input" rows="3"></textarea>
        </div>

        <div class="pds-flex pds-gap-xs">
          <button type="button" class="pds-button" onClick=${() => setCurrentWhyStep('competitor')}>Back</button>
          <button type="button" class="pds-button pds-button-danger">Close my account</button>
        </div>
      </section>
    `)}

    <div class="pds-mt-xl pds-text-sm pds-color-muted">
      Feel free to <a href="#" class="pds-color-inherit">contact support</a> if you have any questions.
    </div>
  `)
}

render(html`<${App} />`, document.getElementById('root'))
