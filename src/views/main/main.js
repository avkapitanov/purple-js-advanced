import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/card-list/card-list.js';

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    numFound: 0,
    offset: 0
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.onUpdateAppState.bind(this))
    this.state = onChange(this.state, this.onUpdateState.bind(this))
    this.setTitle('Поиск книг')
  }

  onUpdateAppState(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  async loadBookList(q, offset) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
    return res.json();
  }

  async onUpdateState(path) {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.loadBookList(this.state.searchQuery, this.state.offset);
      this.state.loading = false;
      this.state.list = data.docs;
      this.state.numFound = data.numFound;
    }
    if (path === 'list' || path === 'loading' || path === 'numFound') {
      this.render();
    }
  }

  render() {
    const main = document.createElement('div');
    main.append(new Search(this.state).render());
    main.append(new CardList(this.appState, this.state).render());
    this.app.innerHTML = '';
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}