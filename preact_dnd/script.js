import { h, Component, render } from 'https://esm.sh/preact'
import { dndItem } from './preact_dnd.js'
import htm from 'https://esm.sh/htm'

const html = htm.bind(h)

const items = [{ text: "hello" }, { text: "there" }]

function App() {

  return (html`
    ${items.map((item, index) => (html`
      <${dndItem} item=${item} key=${index} />
    `))}
  `)
}

render(html`<${App} />`, document.getElementById('root'))