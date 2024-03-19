import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {
    static get tag() {
        return 'haxcms-party-ui';
      }

    constructor() {
        super();
        this.save="";
        this.username="";
        this.userArray=[""];
    }

    static get styles() {
      return [
        super.styles,
        css`
        :host {
          display: block;
        }
        
        .my-div {
          padding: var(-ddd-spacing-5);
          margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
          color: var(--ddd-theme-default-keystoneYellow);
        }

        .party-ui-wrapper {
            background-color: pink;
            padding: 20px;
            width: 400px;
            height: 340px;
            display: inline-block;
            overflow: auto;
            margin-left: 200px;
            border: 2px solid white;
        }

        .usernames-wrapper {
            background-color: #371f76;
            padding: 20px;
            width: 250px;
            display: flex;
            margin: auto;
            margin-top: 25px;
            margin-bottom: 10px;
            justify-content: center;
            align-items: center;
            border: 2px solid white;
        }

        .characters-wrapper {
            /* background-color: #6b66c6; */
            padding: 20px;
            width: 350px;
            display: flex;
            margin: auto;
            margin-bottom: 10px;
            justify-content: center;
            align-items: center;
        }

        .end-button {
            margin-right: 50px;
        }

        .save-button {
            margin-legt: 50px;
        }

        .end-wrapper {
            background-color: #371f76;
            padding: 5px;
            width: 280px;
            display: flex;
            margin: auto;
            justify-content: center;
            align-items: center;
            border: 2px solid white;
        }
      `];
    }

    static get properties() {
        return {
          ...super.properties,
            save: { type: String },
            username: { type: String, reflect: true },
            userArray: { type: Array, reflect: true }
        }
    }

    render() {
        return html`
        <div class="party-ui-wrapper">
            <div class="usernames-wrapper">
                <input class="text-input" type="text" value=${this.username} @input=${this.updateName}>
                <button id="add-user-button" @click="${this.addUser}">Add User</button>
            </div>
            <div class="characters-wrapper">
                ${this.userArray.map(element =>
                    this.characterView(element))}
            </div>
            <confetti-container id="confetti">
                <div class="end-wrapper">
                    <p class="save">${this.save}</p>
                    <button class="end-button">Delete</button>
                    <button class="save-button" @click="${this.makeItRain}">Save</button>
                </div>
            </confetti-container>
        </div>
        `;
    }

    updateName(event) {
        this.username = event.target.value;
        this.userArray[this.userArray.length - 1] = event.target.value;
    }

    addUser(event) {
        this.userArray[this.userArray.length - 1];
        this.shadowRoot.querySelector('.text-input').value ="";
        this.userArray.push("");
    }

    characterView(name) {
        return html `
        <rpg-character id="rpg" hat="random" seed=${name} style="height: 100px; width: 100px;"></rpg-character>
        `;
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

    updated(changedProperties) {
        if (changedProperties.has('save')) {
          this.makeItRain();
        }
    }
  }

  globalThis.customElements.define(PartyUI.tag, PartyUI);
