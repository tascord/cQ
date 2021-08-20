let form;
let slide_index = 0;
let slide_z_index = 0;
let responses = [];

const load_form = () => {

    let js = document.createElement("script");
    js.src = `/p/forms/data/${get_URI_shard('id')}.js`;
    document.body.appendChild(js);

    js.onload = () => {

        try { _ } catch {
            create_slide('Invalid form URL', 'Make sure the URL you\'re using is exactly the same as what was given to you.', [])
            document.title = `Uh oh! — cQ`;
            return;
        }

        form = _;
        slide_z_index = form.questions.length + 1
        document.title = `${form.name} — cQ`;

        create_slides();
        // advance_slide();

    };

    js.onerror = () => {
        create_slide('Unable to load form', 'Make sure the URL is correct and/or retry later.', [])
        document.title = `Uh oh! — cQ`;
        return;
    };


}

function get_URI_shard(name) {

    // Thanks past me

    let pattern = new RegExp(`(?:(?:&|\\?)${name}=((?:[a-z0-9])+)(?:$|&|))`, 'gi');
    let code = window.location.search.replace(pattern, '$1');
    return code == window.location.search ? null : code;

}

function create_slides() {

    // Title slide
    create_slide(form.name, `by <b>${form.author}</b>`, new Button('Click here to begin!'), advance_slide);

    // Question Slides
    for (let q of form.questions) create_slide(q.title, q.subtitle, q.inputs, advance_slide, q.required);

    // Submitting Slide
    create_slide('Submitting...', `Please wait a moment while your request is handled`, []);

    // Make sure progress bar is on top of the stack
    document.querySelector('.progress').style.zIndex = form.questions.length + 2;

    // Other widgets
    const widget_layer_index = form.questions.length + 3;
    const widget_layer = document.querySelector('.ui');

    [...widget_layer.children, widget_layer].forEach(elem => {
        elem.style.zIndex = widget_layer_index;
    });


}

function advance_slide() {

    if (document.querySelectorAll('.slide')[slide_index + 1]) document.querySelectorAll('.slide')[slide_index++].style.animation = 'slide-out 1s cubic-bezier(0.2, 1.24, 1, 1) forwards';
    else return;

    // Progress bar updating
    document.querySelector('.progress>.inner').style.width = `${(slide_index / (form.questions.length + 1)) * 100}%`;

    // If on submitting slide
    if (slide_index == form.questions.length + 1) {

        request('/submit', { id: get_URI_shard('id'), responses })
            .then(() => {

                // Submitting finished
                create_slide('Thanks!', `Your answers have been recorded`, []);
                advance_slide();

            });

    }

}

function create_slide(title, subtitle, inputs, callback, required) {

    let elem = document.createElement('div');
    document.body.appendChild(elem);

    elem.outerHTML =
        `
    <div class="slide" style="z-index: ${slide_z_index}" data-slide-id="${slide_z_index}">
        
        <div class="inner">
            
            <h1>${title}</h1>
            ${subtitle == null ? '' : `<sub>${subtitle.replace(/\n/g, '<br>')}</sub>`}
            <sub class="error"></sub>

        </div>
            
        ${required === false ? '<button class="skip" onclick="advance_slide()">Skip Question</button>' : ''}
        <div class="inputs"></div>

    </div>
    `;

    elem = document.querySelector(`[data-slide-id="${slide_z_index}"]`);

    let inputs_container = elem.children[elem.children.length - 1];
    inputs instanceof Array ? inputs.forEach((e, i) => inputs_container.appendChild(create_input(e, slide_index.toString() + i, callback))) : inputs_container.appendChild(create_input(inputs, slide_index, callback));

    elem.children[elem.children.length - 1].childNodes.forEach(elem => {

        elem.style.flex = Math.min(1 / (inputs instanceof Array ? inputs.length : 1), 0.3);

    });

    slide_z_index--;

}

function create_input(input, value, callback) {

    let elem;

    if (input instanceof Button) {

        elem = document.createElement('button');
        elem.innerText = input.placeholder;
        if (callback) elem.onclick = callback;

    }

    if (input instanceof Text) {

        elem = document.createElement('input');
        elem.type = 'text';
        elem.placeholder = input.placeholder;
        if (callback) elem.onkeydown = (e) => {
            const error = e.target.parentElement.parentElement.children[0].children[2];

            if (e.keyCode == 13) {

                if (e.target.value.trim().length == 0) {
                    console.log(error.innerText = 'Please enter a value.');
                }

                else if (!input.validate(elem.value)) {
                    console.log(error.innerText = 'Invalid value');
                }

                else {

                    callback();
                    elem.blur()

                }

            }
        }

    }

    if (input instanceof Digit) {

        elem = document.createElement('input');
        elem.type = 'text';
        elem.placeholder = input.placeholder;

        elem.onkeyup = (e) => {
            const error = e.target.parentElement.parentElement.children[0].children[2];

            if (e.target.value.match(/\D/g)) {
                console.log(error.innerText = 'Please enter a number into this field.');
            }

            e.target.value = e.target.value.replace(/\D/g, '');
        }

        if (callback) elem.onkeydown = (e) => {

            const error = e.target.parentElement.parentElement.children[0].children[2];
            if (e.target.value.match(/\D/g)) console.log(error.innerText = 'Please enter a number into this field.');

            e.target.value = e.target.value.replace(/\D/g, '');

            if (e.keyCode == 13) {

                if (e.target.value.trim().length == 0) {
                    console.log(error.innerText = 'Please enter a value.');
                }

                else if (!input.validate(elem.value)) {
                    console.log(error.innerText = 'Invalid value');
                }

                else {

                    callback();
                    elem.blur()

                }

            }
        }

    }

    if (input instanceof Range) {

        elem = document.createElement('div');
        elem.classList.add('range');

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.value = input.value;
        slider.min = input.min;
        slider.max = input.max;
        slider.step = input.step;

        const label = document.createElement('label');
        label.innerText = input.value + input.suffix;

        elem.appendChild(slider);
        elem.appendChild(label);

        slider.onchange = slider.ondrag = slider.onmousemove = () => label.innerText = slider.value + input.suffix;
        label.onclick = () => {
            callback();
            elem.blur()
        }

    }

    if (input instanceof Radio) {

        elem = document.createElement('div');
        elem.classList.add('radio');

        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = value;
        radio.name = slide_index;

        radio.onchange = callback;
        elem.appendChild(radio);

        let label = document.createElement('label');
        elem.appendChild(label);

        label.outerHTML = `<label for="${value}">${input.placeholder}</label>`;
        // label.innerText = input.placeholder;

    }

    if (!elem) {
        elem = document.createElement('script');
        elem.innerHTML = `alert('Looks like something funky happened with this form.\\nPlease contact me (tascord) providing the form code: "${get_URI_shard('id')}".')`;
        console.log(input);
    }

    return elem;

}

load_form();