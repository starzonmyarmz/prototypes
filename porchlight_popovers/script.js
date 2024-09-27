const button = document.querySelector("#anchor-button")
const popover = document.querySelector("#anchor-popover")

document.querySelector("#bposition").addEventListener("change", ({ target }) => {
  button.className = `pds-button button-${target.value}`;
})

document.querySelector("#pposition").addEventListener("change", ({ target }) => {
  popover.className = `pdsf-popover pdsf-popover-${target.value} pds-p-md`;
})

