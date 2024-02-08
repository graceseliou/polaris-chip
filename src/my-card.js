import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.paragraph="";
    this.paragraph2="";
    this.image="#";
    this.button=""

    this.bgcolor="black";

    this.fancy = false;
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

      .control-wrapper {
        text-align: center;
      }

      a {
        text-decoration: none;
      }

    .btn-wrapper {
      border: 2px solid black;
      background-color: black;
      text-align: center;
      padding: 16px;
      margin: 8px;
      height: 550px;
      width: 350px;
    }

    .btn-wrapper.change-color {
      background-color: lavender;
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
      background-color: crimson;
    }

    .heading {
      color: white;
      text-align: center;
      font-size: 35px;
      padding: 16px;
      /* margin: 8px 8px 8px 8px; */
    }

    .paragraph {
      color: white;
      text-align: center;
      font-size: 20px;
      padding: 16px;
      margin: 8px;
    }

    .card{
      /* display: flex; */
      padding: 24px;
    }

    .image {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 35px;
      width: 200px;
    }

    .paragraph2 {
      color: white;
      text-align: center;
      font-size: 20px;
      padding: 16px;
      margin: 8px;
    }

    .heading, .paragraph {
      margin: 4px;
    }

    /* .btn {
      font-size: 16px;
      margin-top: 5px;
    } */

    details summary {
      color: white;
      text-align: left;
      font-size: 20px;
      padding: 8px 0;
    }

    details[open] summary {
      color: white;
      font-weight: bold;
    }
    
    details div {
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
    return html`
      <div class="card">
        <div class="btn-wrapper"
        style="background-color: ${this.bgcolor}">
            <img src="${this.image}" alt="imgname" class="image">
            <h1 class="heading">${this.title}</h1>
            <details ?open="${this.fancy}" @toggle="${this.openChanged}">
              <summary>description</summary>
              <div>
                <slot>${this.paragraph}</slot>
                <slot>${this.paragraph2}</slot>
              </div>
            </details>
            <!--<h1 class="paragraph">${this.paragraph}</h1>-->
            <!--<h1 class="paragraph2">${this.paragraph2}</h1>-->
            <button class="btn">${this.button}</button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      paragraph: { type: String },
      image: { type: String },
      paragraph2: { type: String },
      button: { type: String },

      bgcolor: { type: String },

      fancy: { type: Boolean, reflect: true },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
