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

    constructor(placeholder) {
        this.placeholder = placeholder;
    }

}

class Button extends InputMethod {
    
    constructor(text) {
        super(text);
    }

}

class Text extends InputMethod {
    
    constructor(placeholder) {
        super('Enter text');
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

// exports.Form = Form;
// exports.Button = Button;
// exports.Text = Text;