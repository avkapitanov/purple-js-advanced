import { DivComponent } from '../../common/div-component.js';
import './header.css';

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.innerHTML = '';
    this.el.classList.add('header');
    this.el.innerHtml = `
      <div>
        <img src="/static/logo.svg" alt="Логотип" />
      </div>
      <div class="menu">
        <a class="menu-item" href="#">
          <img src="/static/search.svg" alt="Иконка поиска">  
          Поиск книг
        </a>
        <a class="menu-item" href="#favorites">
          <img src="/static/favorites.svg" alt="Иконка избранное">  
          Избранное
          <div class="menu__counter">
            ${this.appState.favorites.length}
          </div>
        </a>
      </div>
    `;
    return this.el;
  }
}