import { LitElement, html, css } from 'lit';

export class Alert extends LitElement {

    static get tag() {
        return 'alert-notification';
      }
    
    constructor() {
        super();
        this.state="";
        this.icon="#";
        this.date="";
        this.information="";

        this.fancy=false;

        this.sticky=false;
    }

    static get styles() {
        return css`
            :host {
                display: inline-flex;
            }

            .alert-wrapper {
                font-size: 16px;
                color: black;
                width: 100vw;
            }

            .sticky {
                position: sticky;
                top: 0;
                z-index: 100;
            }

            .icon {
                display: inline-flex;
                width: 200px;
            }

            details summary {
                background-color: orange;
                color: black;
                text-align: center;
                font-size: 32px;
                padding: 16px;
            }

            details[open] summary {
                background-color: black;
                color: white;
                font-weight: bold;
            }
      
            details div {
                display: block;
                background-color: lightblue;
                color: white;
                border: 2px solid black;
                text-align: left;
                padding: 8px;
                height: 70px;
                overflow: auto;
            }
        `;
    }

    openChanged(e) {
        console.log(e.newState);
        if (e.newState === "open") {
          this.fancy = true;
        }
        else {
          this.fancy = false;
        }
      }

    render() {
        let color = "white";
        if(this.state === "notice") color = "lightblue";
        if(this.state === "warning") color = "yellow";
        if(this.state === "Alert") color = "red";

        return html`
        <div class="alert-wrapper" style="background-color:${color}">
            <h1 class="state">${this.state}</h1>
            <h1 class="information">${this.information}</h1>
        </div>

        <!-- <details ?open="${this.fancy}" @toggle="${this.openChanged}">
                <summary>
                    ${this.state}
                </summary>
                <div>
                    <img src="${this.icon}" alt="icon" class="icon">
                    <slot>${this.date}</slot>
                    <slot>${this.information}</slot>
                </div>
            </details> -->
        `;
    }

    static get properties() {
        return {
            state: { type: String, reflect: true },
            icon: { type: String },
            date: { type: String },
            information: { type: String },
            border1: { type: String },
            border2: { type: String },

            fancy: { type: Boolean, reflect: true },

            sticky: { type: Boolean },
        }
    }
}

globalThis.customElements.define(Alert.tag, Alert);
