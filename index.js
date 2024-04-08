const { createApp } = Vue;

createApp({
    data() {
        return {
            display: "0",
            numeroAnterior: null,
            numeroAtual: null,
            operador: null,
            aguardandoNovoNumero: false,
        }
    },
    methods: {
        lidarBotao(valor) {
            switch (valor) {
                case '*':
                case '/':
                case '-':
                case '+':
                    this.lidarOperador(valor);
                    break;

                case '.':
                    this.lidarDecimal();
                    break;

                case 'C':
                    this.lidarLimpar();
                    break;

                case '=':
                    this.lidarIgual();
                    break;

                default:
                    this.lidarNumero(valor);
            }
        },
        lidarOperador(valor) {
            if (this.operador !== null) {
                this.lidarIgual();
            }
            this.operador = valor;
            this.numeroAnterior = this.display;
            this.aguardandoNovoNumero = true;
        },
        lidarDecimal() {
            if (!this.display.includes('.')) {
                this.display += '.';
            }
        },
        lidarLimpar() {
            this.display = '0';
            this.numeroAtual = null;
            this.numeroAnterior = null;
            this.operador = null;
        },
        lidarIgual() {
            let resultado;
            const anterior = parseFloat(this.numeroAnterior);
            const atual = parseFloat(this.display);
            if (isNaN(anterior) || isNaN(atual)) return;
            switch (this.operador) {
                case '+':
                    resultado = anterior + atual;
                    break;
                case '-':
                    resultado = anterior - atual;
                    break;
                case '*':
                    resultado = anterior * atual;
                    break;
                case '/':
                    resultado = anterior / atual;
                    break;
                default:
                    return;
            }
            this.display = resultado.toString();
            this.operador = null;
            this.numeroAnterior = null;
            this.aguardandoNovoNumero = true;
        },
        lidarNumero(valor) {
            if (this.aguardandoNovoNumero) {
                this.display = valor;
                this.aguardandoNovoNumero = false;
            } else {
                this.display = this.display === '0' ? valor : this.display + valor;
            }
        }
    }
}).mount("#app");
