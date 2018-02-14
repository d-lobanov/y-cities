export default function render(didPlayerWin, cities, onClose) {
    const modal = document.getElementById('modal');

    const citiesElement = cities.map(city => `<span>${city}</span>`).join(' — ');

    modal.innerHTML = `
      <div class="modal-window">
        <div class="result">${didPlayerWin ? 'Вы выиграли 🎉' : 'Вы проиграли 😞'}</div>
        <div class="history">Ход игры:</div>
        <div class="cities-container">
            <div class="cities-list">${citiesElement}</div>
        </div>
        <div class="modal-footer">
            <input type="button" value="Играть еще" class="button"/>
        </div>
      </div>
    `;

    modal.style.display = 'block';
    modal.querySelector('input[type=button]').onclick = onClose;
};