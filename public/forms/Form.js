class Form {

    /**
     * Form constructor.
     * @param {String} name 
     * @param {String} author 
     */
    constructor(name, author) {
        
        if(!name || !author) throw new TypeError('Invalid data provided in form constructor.');

        this.name = name;
        this.author = author;
        this.questions = [];
        return this;
    };

    /**
     * 
     * @param {String} title 
     * @param {String} subtitle 
     * @param {InputMethod|Array<InputMethod>} inputs 
     */
    addQuestion(title, subtitle, inputs, required = true) {
        
        if(title == null || subtitle == null || !inputs) throw new TypeError('Invalid data provided in addQuestion method.');

        this.questions.push({ title, subtitle, inputs, required });
        return this;
    }

}

class InputMethod {

    constructor(placeholder, regex) {
        this.placeholder = placeholder;
        this.regex = regex;
    }

    validate(input) {
        if(this.regex) return this.regex.test(input);
        return true;
    }

}

class Button extends InputMethod {
    
    constructor(text) {
        super(text);
    }

}

class Text extends InputMethod {
    
    constructor(placeholder, regex) {
        super(placeholder ?? 'Enter text', regex);
    }

}

class Radio extends InputMethod {
    
    constructor(value) {
        super(value);
    }

}

class Digit extends InputMethod {
    
    constructor(placeholder) {
        super('Enter numerical value');
    }

}

class Range extends InputMethod {

    constructor(min, max, step, value, suffix) {

        super('');

        this.min = min ?? 0;
        this.max = max ?? 10;
        this.step = step ?? 1;
        this.value = value ?? 0;
        this.suffix = suffix ?? '';

    }

    validate(value) {
        if(isNan(value)) return false;
        const val = parseFloat(value);
        return (val < max || val > min && isFinite(val));
    }

}

// exports.Form = Form;
// exports.Button = Button;
// exports.Text = Text;