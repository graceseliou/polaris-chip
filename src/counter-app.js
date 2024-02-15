import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

    static get tag() {
        return 'counter-app';
      }

    constructor() {
        super();
        this.number=0;
        this.button1="-";
        this.button2="+";
        this.min="";
        this.max="";
    }

    static get styles() {
        return css`
            :root, html, body {
                font-size: 16px;
            }

            :host {
                display: inline-flex;
            }

            :host([number="18"]) .counter-wrapper {
                background-color: #371f76;;
            }
            :host([number="21"]) .counter-wrapper {
                background-color: #371f76;;
            }
            :host([number="10"]) .counter-wrapper {
                background-color: #371f76;;
            }
            :host([number="25"]) .counter-wrapper {
                background-color: #371f76;;
            }
            :host([number="0"]) .counter-wrapper {
                background-color: #371f76;;
            }
            :host([number="100"]) .counter-wrapper {
                background-color: #371f76;;
            }

            .counter-wrapper {
                text-align: center;
                display: block;
                background-color: #6b66c6;
                padding: 16px;
                border: 2px solid black;
                margin: 8px;
                height: 200px;
                width: 200px;
            }

            .number {
                text-align: center;
                color: white;
                font-size: 48px;
                margin-top: 24px;
            }

            .button1 {
                background-color: #371f76;
                color: white;
                font-size: 30px;
                padding: 10px;
                width: 50px;
            }

            .button2 {
                background-color: #371f76;
                color: white;
                font-size: 30px;
                padding: 10px;
                width: 50px;
            }

            .button1:focus,
            .button1:hover {
                background-color: white;
                color: black;
            }

            .button2:focus,
            .button2:hover {
                background-color: white;
                color: black;
            }
        `;
    }

    render() {
        return html`
        <confetti-container id="confetti">
        <div class="counter-wrapper">
            <p class="number">${this.number}</p>
            <button class="button1" @click="${this.decrement}" ?disabled="${this.min === this.number}">${this.button1}</button>
            <button class="button2" @click="${this.increment}" ?disabled="${this.max === this.number}">${this.button2}</button>
        </div>
        </confetti-container>
        `;
    }

    static get properties() {
        return {
            number: { type: Number, reflect: true },
            button1: { type: String },
            button2: { type: String },
            min: { type: Number },
            max: { type: Number },
        };
    }

    increment() {
        if(this.number < this.max) {
            this.number++;
        }
    }

    decrement() {
        if(this.number > this.min) {
            this.number--;
        }
    }

    updated(changedProperties) {
        if (changedProperties.has('number') && this.number == 21) {
          this.makeItRain();
        }
      }
      
      makeItRain() {
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
          (module) => {
            setTimeout(() => {
              this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
          }
        );
      } 
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
