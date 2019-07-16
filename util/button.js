class Button {
    constructor(id) {
        this.button = document.getElementById(id);
    }
    initialize(text, onClick) {
        this.text = text;
        this.onClick = onClick;
        this.button.textContent = text;
        this.button.addEventListener('click', onClick);
        this.button.style.display = 'block';
    }
    updateText(newText) {
        this.text = newText;
        this.button.textContent = this.text;
    }
    updateOnClick(newOnClick) {
        this.button.removeEventListener('click', this.onClick);
        this.onClick = newOnClick;
        this.button.addEventListener('click', this.onClick); 
    }
}