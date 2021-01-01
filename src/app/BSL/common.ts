export class common{
    constructor(){

    }
    formatCurrency(value: any) {
        let moneyTmp = value.target.value.replace(",", "");
        return moneyTmp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      currencyFormatted(amount) {
    
        var formatedValue = amount;
        var real = '';
        var cents = '';
        var temp = [];
        var i = 0;
        var j = 0;
        var k = 0;
    
        formatedValue = this.clearString(formatedValue.toString(), "0123456789");
    
        if (formatedValue.length > 3) {
    
          real = formatedValue.substr(0, formatedValue.length);
          real = "" + parseInt(real, 10);
          cents = formatedValue.substr(formatedValue.length - 3, 3);
    
          if (real.length > 3) {
            temp = [];
            for (i = real.length - 1, j = 1, k = 0; i > 0; i--, j++) {
              if ((j % 3) == 0) {
                temp.push(real.substr(i, 3));
                k++;
              }
            }
            temp.reverse();
            real = real.substr(0, real.length - (3 * k)) + '.' + temp.join('.');
          }
          // formatedValue = real + ',' + cents;
          formatedValue = real
        }
        return formatedValue;
      }
    
      clearString(value, validCharacters) {
        var result = '';
        var index = -1;
        var i = 0;
    
        for (i = 0; i < value.length; i++) {
          index = validCharacters.indexOf(value.charAt(i));
    
          if (index > -1) {
            result += validCharacters.charAt(index);
          }
        }
        return result;
      }
}