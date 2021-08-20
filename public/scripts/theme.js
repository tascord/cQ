function update(theme) {
    document.body.classList = theme;
    window.localStorage.setItem('theme', theme);
}

update(window.localStorage.getItem('theme') ?? 'red');

document.querySelector('.palette .blue').onclick = () => update('blue');
document.querySelector('.palette .red').onclick = () => update('red');
document.querySelector('.palette .green').onclick = () => update('green');