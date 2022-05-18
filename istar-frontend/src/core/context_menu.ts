import { Repo } from '@/core/interfaces';
import { signalDispatcher, Signal } from '@/core/signals';

class ContextMenu {
  options = {
    menus: [
      { name: '打标签', onclick: (repo: Repo) => { signalDispatcher.send(Signal.AddTag, repo); } },
      { name: 'GitHub', onclick: (repo: Repo) => { window.open(`${repo.html_url}`, '_blank'); } },
    ],
  };

  element: HTMLElement;

  selectedRepo: Repo | null = null;

  constructor() {
    const ul = document.createElement('ul');
    ul.classList.add('context-menu');
    const { menus } = this.options;
    menus.forEach((m) => {
      const li = document.createElement('li');
      li.textContent = m.name;
      li.onclick = () => {
        if (this.selectedRepo) {
          m.onclick(this.selectedRepo);
        }
        this.hide();
      };
      ul.appendChild(li);
    });
    const body = document.querySelector('body');
    body!.appendChild(ul);
    this.element = ul;
    this.hide();
  }

  show(repo: Repo, e: PointerEvent | MouseEvent) {
    this.selectedRepo = repo;
    const menus = this.element;
    menus.style.position = 'absolute';
    menus.style.top = `${e.clientY}px`;
    menus.style.left = `${e.clientX}px`;
    menus.style.display = 'block';
  }

  hide() {
    const menus = this.element;
    menus.style.display = 'none';
  }
}

const contextMenu = new ContextMenu();
export default contextMenu;
