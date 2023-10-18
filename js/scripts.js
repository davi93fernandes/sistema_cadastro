class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
            'data-checked',
        ]
    }
    //Iniciar a validação de todos os campos
    validate(form) {
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pega inputs
        let inputs = form.getElementsByTagName('input');

        // Transforma uma HTMLCollection -> array
        let inputsArray = [...inputs]

        //Loop nos inputs e validação
        inputsArray.forEach((input) => {

            // Loop em todas validações
            for (let i = 0; this.validations.length > i; i++) {
                //Verfica se há validação no input iterado
                if (input.getAttribute(this.validations[i]) != null) {

                    //transforma string para metodo
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // chama o metodo
                    this[method](input, value);

                }
            }

        }, this);

    }
    
    //vefica se um input tem um numero minimo de caracteres
    minlength(input, minValue) {
        const inputLength = input.value.length;

        const errorMessage = `O campo precisa de pelo menos ${minValue} caracteres!`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se um input passou de caracteres
    maxlength(input, maxValue) {
        const inputLength = input.value.length;

        const errorMessage = `O campo precisa ter menos que ${maxValue} caracteres!`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }
    // verifica se o input é requerido
    required(input) {
        let inputvalue = input.value;

        if (inputvalue === '') {
            let errorMessage = `Este campo é obrigatório!`

            this.printMessage(input, errorMessage)

        }
    }

    //valida emails
    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão nome@email.com!`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    //valida campos de nome e sobrenome somente letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/

        let inputValue = input.value;

        let errorMessage = `Neste campo somente letras!`

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage)
        }

    }

    //verifica se dois campos são iguais
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Senhas devem ser iguais!`;

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }

    }

    //Valida campo de senhas
    passwordvalidate(input) {
        //Transforma string em Array
        let charArr = input.value.split("");
        
        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0) {
            let errorMessage = `É necessário um caractere maiúsculo e um número pelo menos!`;

            this.printMessage(input, errorMessage);
            
        }
        console.log(input.value)
    }

    passwordvalidate(input) {
        const password = input.value;

        // Verifiaca se há uma letra maiuscula
        const hasUppercase = /[A-Z]/.test(password);

        // verifica se há um número
        const hasNumber = /\d/.test(password);

        if (!hasUppercase || !hasNumber) {
            const errorMessage = "A senha precisa de um caractere maiúsculo e um número";
            this.printMessage(input, errorMessage);
        }
    }

    //verifica aceite de termos de uso
    /*checkbox(input) {
        
              
        let errorMessage = "Você deve aceitar os termos de uso.";
        
        if (input = input.checked) {
            alert("ok");
        } else {
           alert(errorMessage);
            this.printMessage(input, errorMessage);
        }
       
    }*/
    
    //método para inserir mensagem na tela
    printMessage(input, mensagem) {
        // quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if (errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = mensagem;

            let inputParent = input.parentNode;

            template.classList.remove('template')

            inputParent.appendChild(template)
        }

    }

    // Limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
    
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-register");

let validator = new Validator();

submit.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(form);

});

