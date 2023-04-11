import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { CardList } from '../../components/card-list/card-list.js';

export class FavoritesView extends AbstractView {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.onUpdateAppState.bind(this))
    this.setTitle('Мои книги')
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  onUpdateAppState(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  render() {
    const favorites = document.createElement('div');
    favorites.innerHTML = `
      <h1>Избранные книги - ${this.appState.favorites.length}</h1>
     `;
    favorites.append(new CardList(this.appState, { list: this.appState.favorites }).render());
    this.app.innerHTML = '';
    this.app.append(favorites);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}