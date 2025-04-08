import dragula from 'dragula';
import '../styles/main.css';
import Card from './card';

class TrelloApp {
  constructor() {
    this.columns = ['todo', 'in-progress', 'done'];
    this.init();
  }

  init() {
    this.loadFromLocalStorage();
    this.setupEventListeners();
    this.setupDragAndDrop();
    this.setupEmptyState();
  }

  loadFromLocalStorage() {
    this.columns.forEach(columnId => {
      const container = document.querySelector(`#${columnId} .cards-container`);
      container.innerHTML = '';
      
      const cards = JSON.parse(localStorage.getItem(columnId)) || [];
      cards.forEach(cardData => {
        const card = new Card(cardData.text, columnId);
        container.appendChild(card.element);
      });
    });
  }

  saveToLocalStorage() {
    this.columns.forEach(columnId => {
      const container = document.querySelector(`#${columnId} .cards-container`);
      const cards = Array.from(container.querySelectorAll('.card'))
        .map(card => ({
          text: card.querySelector('.card-text').textContent.trim(),
          id: card.dataset.id
        }));
      
      localStorage.setItem(columnId, JSON.stringify(cards));
    });
  }

  setupEventListeners() {
    document.querySelectorAll('.add-card').forEach(button => {
      button.addEventListener('click', () => {
        const text = prompt('Enter card text:');
        if (text && text.trim()) {
          const columnId = button.closest('.column').id;
          const container = button.previousElementSibling;
          const card = new Card(text.trim(), columnId);
          container.appendChild(card.element);
          this.saveToLocalStorage();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-card')) {
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
          e.target.closest('.card').remove();
          this.saveToLocalStorage();
        }
      }
    });
  }

  setupDragAndDrop() {
    const containers = this.columns.map(id => 
      document.querySelector(`#${id} .cards-container`)
    );

    dragula(containers, {
      moves: (el, source, handle) => {
        return handle.classList.contains('card') || 
               handle.classList.contains('card-text') ||
               handle.classList.contains('delete-card');
      },
    }).on('drop', () => {
      this.saveToLocalStorage();
    });
  }

  setupEmptyState() {
    this.columns.forEach(columnId => {
      const container = document.querySelector(`#${columnId} .cards-container`);
      if (container.children.length === 0) {
        container.innerHTML = '<p class="empty-message">Карточек пока нет</p>';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TrelloApp();
});