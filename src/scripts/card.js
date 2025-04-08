export default class Card {
    constructor(text, columnId) {
      this.text = text;
      this.columnId = columnId;
      this.id = Date.now().toString();
      this.element = this.createCardElement();
      this.bindEvents();
    }
  
    createCardElement() {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = this.id;
      card.draggable = true;
      card.innerHTML = `
        <span class="card-text">${this.text}</span>
        <span class="delete-card" title="Delete card">×</span>
      `;
      return card;
    }
  
    bindEvents() {
      this.element.querySelector('.delete-card').addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
          this.element.remove();
        }
      });
    }
  
    updateText(newText) {
      this.text = newText;
      this.element.querySelector('.card-text').textContent = newText;
    }
  }