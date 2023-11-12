class errorElement extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
    .error {
        padding: 1rem 4rem;
        text-align: center;
        font-size: 30px;
    }

    .error h2 {
    color: rgb(255, 94, 0);
    }

    @media screen and (max-width: 768px) {
    .error {
        font-size: 25px;
        padding: 1rem 2rem;
    }
    }

    @media screen and (max-width: 576px) {
    .error {
        font-size: 16px;
        padding: 1rem 2rem;
    }
    }
    </style>
     <div class="error">
      <h2>ERROR!</h2>
      <p tabindex="0">An error occurred while loading data from the server, please try again later!</p>
    </div>`;
  }
}

customElements.define('error-element', errorElement);
