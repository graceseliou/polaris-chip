import { LitElement, html, css } from 'lit';

export class Alert extends LitElement {

    static get tag() {
        return 'alert-notification';
      }
    
    constructor() {
        super();
        this.state="";
        this.date="";
        this.message="";

        this.opened=true;
        if (localStorage.getItem('campus-alert-opened-state') == "false") {
            this.opened=false;
        }
        
        this.sticky=false;
    }

    static get styles() {
        return css`

            .sticky {
                position: sticky;
                top: 0;
                z-index: 100;
            }
            
            :host([date]){
                color: black;
            }

            .alert-wrapper {
                background-color: pink;
                margin-bottom: 16px;
                font-size: 16px;
                color: black;
                width: 100vw;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: auto;
            }

            /* .alert-wrapper-left,
            .alert-wrapper-right {
                display: flex;
                align-items: center;
            } */

            .date {
                font-size: 16px;
                font-weight: bold;
                color: black;
            }

            .close-button {
                font-size: 16px;
                border: none;
                background: none;
                margin-bottom: 40px;
            }

            .message-wrap {
                background-color: white;
                transform: skew(20deg);
                height: 100%;
                text-align: center;
                width: 75vw;
                margin-left: 16px;
                margin-right: 16px;
                display: inline-flex;
            }

            .icon {
                width: 50px;
                height: 40px;
                transform: skew(-20deg);
                margin-left: 20px;
                margin-top: 25px;
            }

            .message {
                font-size: 16px;
                padding: 20px;
                color: black;
                transform: skew(-20deg);
            }

            .openedContainer{
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .closedContainer {
                display: flex;
                margin-bottom: 8px;
                align-items: center;
                justify-content: center;
                width: 100%;
            }

            .closed-toggle-button {
                display: flex;
                margin-bottom: 8px;
                align-items: center;
                justify-content: center;
                padding: 10px;
                font-size: 30px;
                background-color: green;
                width: 100%;
            }

            .closed-alert {
                font-size: 25px;
                font-family: sans-serif;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
            }

            .alert-wrapper,
            .date,
            .message,
            .close-button {
                font-family: sans-serif;
            }
        `;
    }

    toggleAlert() {
        this.opened=!this.opened;
        localStorage.setItem("campus-alert-opened-state", this.opened);
    }

    openedView(color, secondaryColor) {
        return html `
        <div class="alert-wrapper ${(this.sticky) ? "sticky" : ""}"  style="background-color:${secondaryColor}">
            <div class="openedContainer">
                <div class="alert-wrapper-left">
                    <div class="date">${this.date}</div>
                </div>
                    <div class="message-wrap" style="background-color:${color}">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>alert-circle-outline</title>
                        <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                    </svg>
                    <p class="message">${this.message}</p>
                    </div>
                <div class="alert-wrapper-right">
                    <button class="close-button" @click="${this.toggleAlert}">&times close</button>
                </div>
                <slot></slot>
            </div>
        </div>
        `;
    }

    handleKeyDown(event) {
        if(event.keyCode === 13) {
            this.toggleAlert();
        }
    }

    closedView(color) {
        return html `
        <div class="closedContainer ${(this.sticky) ? "sticky" : ""}">
            <div class="closed-toggle-button" style="background-color: ${color}" @click="${this.toggleAlert}" @keydown="${this.handleKeyDown}" tabindex="0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="40">
                    <title>alert-circle-outline</title>
                    <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                </svg>
                <div class="closed-alert">
                    <p>TEST CAMPUS ALERT</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="40">
                    <title>chevron-down</title>
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
                </div>
            </div>
        </div>
        `;
    }

    render() {
        let color = "white";
        if(this.state === "notice") color = "lightblue";
        if(this.state === "warning") color = "yellow";
        if(this.state === "alert") color = "red";

        let secondaryColor = "white";
        if(this.state === "notice") secondaryColor = "blue";
        if(this.state === "warning") secondaryColor = "orange";
        if(this.state === "alert") secondaryColor = "pink";

        if(this.state === "notice") 
            this.message = "notice message";
        if(this.state === "warning") 
            this.message = "warning message";
        if(this.state === "alert") 
            this.message = "alert message";
        
        return (this.opened) ? this.openedView(color, secondaryColor) : this.closedView(color);
    }

    static get properties() {
        return {
            state: { type: String, reflect: true },
            date: { type: String },
            message: { type: String },

            opened: { type: Boolean, reflect: true },
            sticky: { type: Boolean },
        }
    }
}

globalThis.customElements.define(Alert.tag, Alert);
