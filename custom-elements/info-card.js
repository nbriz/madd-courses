// here's how we can "extend" the base HTMLElement class
// to create our own custom HTML element
class InfoCard extends HTMLElement {

  // tell the browser which attributes to watch for changes
  static get observedAttributes() {
    return ['title', 'num', 'prof']
  }

  constructor() {
    // always required first, this calls the base HTMLElement's constructor.
    super() 
    // this hides the CSS and HTML code internally, so it doesn't spill out into the larger html page. We create it once here, so render() can redraw it as often as needed
    this.attachShadow({ mode: 'open' })
  }

  // runs when the element is first added to the page
  connectedCallback() {
    this.render()
  }

  // runs whenever one of the observedAttributes changes, for ex:
  // nn.get('info-card').set('title', 'Example Class')
  attributeChangedCallback() {
    this.render()
  }

  // reads the current attributes and (re)draws the card
  render() {
    // These are the attributes on the element, for ex:
    // <info-card title="Capstone" prof="Nick Briz">
    const title = this.getAttribute('title')
    const num = this.getAttribute('num')
    const prof = this.getAttribute('prof')

    // here's the custom element's internal CSS and HTML
    // since it's a JS string it unfortunately doesn't have
    // the nice syntax colors like the rest of our HTML/CSS
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 400px;
          padding: 10px;
          color: white;
          border: 8px solid black;
          border-radius: 12px;
          background: maroon;
        }

        .sub-row {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }
      </style>

      <h1>${title}</h1>

      <div class="sub-row">
        <span>MADD ${num}</span>
        <span>Professor ${prof}</span>
      </div>`
  }

}

customElements.define('info-card', InfoCard)