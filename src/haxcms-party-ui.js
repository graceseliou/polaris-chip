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
        this.userArray=[];
        this.maxUsers=4;
        this.tempUser="";
        this.sidebar=false;
    }

    static get styles() {
      return [
        super.styles,
        css`
        :host {
          display: block;
        }
        
        p{
            margin: 0px;
        }

        .everything-wrapper {
            display: inline-flex;
            flex-direction: row;
            padding: var(--ddd-spacing-2);
            margin: var(--ddd-spacing-2);
        }

        .party-ui-wrapper {
            background-color: var(--ddd-theme-default-limestoneGray);
            padding: var(--ddd-spacing-5);
            width: 650px;
            height: 470px;
            display: inline-block;
            overflow: auto;
            border: 2px solid white;
        }
        
        .usernames-wrapper {
            background-color: var(--ddd-theme-default-alertImmediate);
            padding: var(--ddd-spacing-5);
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
            padding: var(--ddd-spacing-5);
            width: 600px;
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
            /* margin-top: 15px; */
        }

        .users-wrapper {
            background-color: var(--ddd-theme-default-alertImmediate);
            border: 2px solid white;
            display: flex;
            /* flex-wrap: wrap; */
        }

        .user-container {
            background-color: var(--ddd-theme-default-limestoneGray);
            margin: 10px;
            padding: 10px;
            border: 2px solid white;
            /* position: relative; */
        }

        .delete-button {
            margin-left: 22px;
        }

        .end-wrapper {
            background-color: var(--ddd-theme-default-alertImmediate);
            padding: var(--ddd-spacing-5);
            width: 330px;
            display: flex;
            margin: auto;
            justify-content: center;
            align-items: center;
            border: 2px solid white;
        }

        .sidebar-wrapper {
            display: flex;
            width: 200px;
        }

        .popUp {
            display: flex;
            flex-direction: column;
            background-color: var(--ddd-theme-default-alertImmediate);
            border: 2px solid white;
            color: var(--ddd-theme-default-potentialMidnight);
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
            tempUser: { type: String }, 
            sidebar: { type: Boolean, reflect: true },
        }
    }

    render() {
        return html`
        <div class="everything-wrapper">
            <div class="party-ui-wrapper">
                <div class="usernames-wrapper">
                    <input class="text-input" type="text" value=${this.username} @input=${this.updateName}>
                    <button id="add-user-button" @click="${this.addUser}" ?disabled="${this.userArray.length >= this.maxUsers}">Add user</button>
                </div>
                <div class="characters-wrapper">
                    <div class="users-wrapper">
                        ${this.userArray.map(element =>
                            this.characterView(element))}
                    </div>
                </div>
                <confetti-container id="confetti">
                    <div class="end-wrapper">
                        <p class="save">${this.save}</p>
                        <button class="save-button" @click="${this.makeItRain}" ?disabled="${this.userArray.length == 0}">Save members to party</button>
                    </div>
                </confetti-container>
            </div>
            <div class="sidebar-wrapper" style="${(!this.sidebar) ? "display:none;" : ""}">
                <div class = popUp>
                    ${this.characterView(this.tempUser)}
                </div>
            </div>
        </div>
        `;
    }

    characterView(name) {
        let sidebarStyle="";

        if(name===this.tempUser) {
            sidebarStyle = "margin-top: 16px;"
        }

        return html `
        <div class="user-container">
            <div class="user-character">
                <rpg-character id="rpg" hat="random" seed=${name} style="height: 100px; width: 100px;"></rpg-character>
                <br>
                <p style="${sidebarStyle}">${name}</p>
            <button class="delete-button" id="${name}" @click="${this.deleteUser}">Delete</button>
        </div>
        `;
    }

    updateName(event) {
        let inputValue = event.target.value;
        const sanitizedValue = inputValue.replace(/[^a-z0-9]/g, "");
        event.target.value = sanitizedValue;

        this.tempUser = sanitizedValue;
        this.sidebar = sanitizedValue.length > 0;

        // this.tempUser = event.target.value;
        // this.sidebar = true;

        this.requestUpdate();
    }

    addUser(event) {
        if(this.userArray.length < this.maxUsers) {
            this.userArray.push(this.tempUser);
            // this.userArray[this.userArray.length - 1];
            this.shadowRoot.querySelector('.text-input').value ="";
            // this.userArray.push("");
            this.sidebar = false;
            setTimeout(() => { 
                this.requestUpdate();
            });
        }
    }

    deleteUser(event) {
        let id = event.target.id;
        let position = this.userArray.indexOf(id);
        
        this.userArray.splice(position, 1);

        this.requestUpdate();
    }

    deleteUserButton(name) {
        const index = this.userArray.indexOf(name);
        if (index !== 0) {
            this.userArray.splice(index, 1);
            this.requestUpdate();
        }
    }

    handleInput(event) {
        const inputValue = event.target.value;

        if(inputValue.length > -1) {
            this.sidebar = true;
        }
        else {
            this.sidebar = false;
        }

        const sanitizedValue = inputValue.replace(/[^a-z0-9]/g, "");
        event.target.value = sanitizedValue.splice(0, 10);
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

    // saveAlert() {
    //     const saveAlert = this.userArray.join(", ");
    //     alert("successfully added to party!");
    // }

    updated(changedProperties) {
        if (changedProperties.has('save')) {
          this.makeItRain();
        }
    }
  }

  globalThis.customElements.define(PartyUI.tag, PartyUI);
