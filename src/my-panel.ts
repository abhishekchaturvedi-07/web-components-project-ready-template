import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

@customElement('my-panel')
export class myPanel extends LitElement {

    static styles = css`
    .panel-container{
        width:400px;
        text-align:center;
    }
    .title{
        background: var(--my-panel-primary-bg, brown);
        color: var(--my-panel-primary-color, yellow);
        padding: 0.8rem;
        
        border-radius: 1rem 1rem 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.2s ease-in-out;
    }
    .title.closed{
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }
    .body{
        padding: 1 rem;
        border: 1px solid aquamarine;
    }
    
    `
    @property({ type: String })
    message = ''

    @property({ type: String })
    title = 'Widget'

    @property({ type: String })
    icon = '🌟'

    @property({ type: Boolean })
    opened = false;

    private handleIconClickEvent(e: MouseEvent) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('icon-click', { bubbles: true }))
    }

    render() {
        return html`
        <div class="panel-container" >
            <div class=${classMap({ 'title': true, 'closed': !this.opened })} @click=${() => this.opened = !this.opened}>
                ${this.title}   
                <div @click=${this.handleIconClickEvent}>
                    ${this.icon}
                </div>
            </div>
            ${when(
            this.opened,
            () => html`
                        <div class="body"> 
                            ${this.message}
                            <slot></slot>
                        </div>
                    `
        )
            }
        </div>
         
            
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'my-panel': myPanel
    }
}