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
        this.maxUsers=4;
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
            background-color: grey;
            padding: 20px;
            width: 450px;
            height: 420px;
            display: inline-block;
            overflow: auto;
            margin-left: 200px;
            border: 2px solid white;
        }
        
        .usernames-wrapper {
            background-color: lightblue;
            padding: 20px;
            width: 300px;
            display: flex;
            margin: auto;
            margin-top: 25px;
            margin-bottom: 10px;
            justify-content: center;
            align-items: center;
            border: 2px solid white;
        }

        .characters-wrapper {
            padding: 20px;
            width: 350px;
            display: flex;
            margin: auto;
            margin-bottom: 10px;
            justify-content: center;
            align-items: center;
            overflow: auto;
        }

        .characters-wrapper rpg-character {
            display: flex;
        }

        .characters-wrapper p {
            justify-content: center;
            align-items: center;
            margin-top: 15px;
        }

        .end-button {
            margin-right: 30px;
        }

        .save-button {
            margin-left: 30px;
        }

        .end-wrapper {
            background-color: lightblue;
            padding: 5px;
            width: 330px;
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
            userArray: { type: Array, reflect: true },
            maxUsers: { type: Number },
        }
    }

    render() {
        return html`
        <div class="party-ui-wrapper">
            <div class="usernames-wrapper">
                <input class="text-input" type="text" value=${this.username} @input=${this.updateName}>
                <button id="add-user-button" @click="${this.addUser}" ?disabled="${this.userArray.length >= this.maxUsers}">Add User</button>
            </div>
            <div class="characters-wrapper">
                <div class="users-wrapper"></div>
                ${this.userArray.map(element =>
                    this.characterView(element))}
            </div>
            <confetti-container id="confetti">
                <div class="end-wrapper">
                    <p class="save">${this.save}</p>
                    <button class="end-button" @click="${this.deleteUser}">Delete</button>
                    <button class="save-button" @click="${this.makeItRain}">Save</button>
                </div>
            </confetti-container>
        </div>
        `;
    }

    characterView(name) {
        return html `
        <div>
            <rpg-character id="rpg" hat="random" seed=${name} style="height: 100px; width: 100px;"></rpg-character>
            <p></p>
            <p>${name}</p>
        </div>
        `;
    }

    updateName(event) {
        this.username = event.target.value;
        this.userArray[this.userArray.length - 1] = event.target.value;
    }

    addUser(event) {
        if(this.userArray.length < this.maxUsers) {
            this.userArray[this.userArray.length - 1];
            this.shadowRoot.querySelector('.text-input').value ="";
            this.userArray.push("");
        }
    }

    deleteUser(event) {
        if(this.userArray.length>0) {
            this.userArray.pop();
            setTimeout(() => {
                this.requestUpdate();
            });
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

    updated(changedProperties) {
        if (changedProperties.has('save')) {
          this.makeItRain();
        }
    }
  }

  globalThis.customElements.define(PartyUI.tag, PartyUI);
