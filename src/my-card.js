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
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      .control-wrapper {
        text-align: center;
      }

      a {
        text-decoration: none;
      }

    .btn-wrapper {
      background-color: black;
      text-align: center;
      padding: 16px;
      margin: 8px;
      height: 550px;
      width: 350px;
    }

    /* .btn-wrapper.change-color {
      background-color: lavender;
    } */

    .btn {
      background-color: white;
      color: black;
      font-size: 20px;
      border-radius: 15%;
      padding: 24px;
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

    .center {
      display: block;
      margin-left: auto;
      margin-right: auto;
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

    .portrait img {
      max-width: 100px;
      margin-top: 5px;
    }
  `;
  }

  render() {
    return html`
      <div class="card">
        <div class="btn-wrapper"
        style="background-color: ${this.bgcolor}">
            <h1 class="heading">${this.title}</h1>
            <h1 class="paragraph">${this.paragraph}</h1>
            <img src="${this.image}" alt="imgname" class="center">
            <h1 class="paragraph2">${this.paragraph2}</h1>
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
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
