import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

    static get tag() {
        return 'counter-app';
      }

    constructor() {
        super();
        this.number="";
        this.plus="";
        this.minus="";
    }

    static get styles() {
        return css`
            :host {
                display: inline-flex;
            }

            :host([fancy]) {
                display: block;
                background-color: lavender;
                border: 2px solid white;
                box-shadow: 10px 5px 5px #6b66c6;
                width: 451px;
            }

            .counter-wrapper {
                text-align: center;
            }

            .number {

            }

            .btn {
                background-color: white;
                color: black;
                font-size: 20px;
                border-radius: 15px;
                padding: 12px;
                margin-top: 10px;
            }

            .btn:focus, 
            .btn:hover {
                background-color: #6b66c6;
            }

            .card{
                /* display: flex; */
                padding: 24px;
            }
        `;
    }

    render() {
        return html`
          <div class="counter">
            <div class="counter-wrapper">
                <h1 class="number">${this.number}</h1>
            </div>
          </div>
        `;
    }

    static get properties() {
        return {
            number: { type: String },
        };
    }
}