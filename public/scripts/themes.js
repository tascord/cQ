
const colours = ['red', 'green', 'blue'];

function load_theme() {

    let theme = localStorage.getItem('theme') || 'red';
    if(colours.indexOf(theme) == -1) theme = 'red';
    document.body.classList.add(theme);

}

function apply_theme(colour) {

    if(colours.indexOf(colour) == -1) return;
    colours.forEach(c => document.body.classList.remove(c));
    localStorage.setItem('theme', colour);
    load_theme();

}
