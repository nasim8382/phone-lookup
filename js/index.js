const searchButton = () => {
    const input = document.getElementById('input-value');
    const error = document.getElementById('error-message');
    const inputValue = input.value;
    const samsung = 'samsung';
    const iphone = 'iphone';
    const oppo = 'oppo';
    const huawei = 'huawei';
    if (inputValue.toLowerCase() === samsung || inputValue.toLowerCase() === iphone || inputValue.toLowerCase() === oppo || inputValue.toLowerCase() === huawei) {
        error.innerText = 'Phone found';
        input.value = '';
    }
    else if(inputValue == ''){
        error.innerText = 'Please input a phone name !!!';
        input.value = '';
    }
    else if (isNaN(inputValue) == false && parseInt(inputValue) !== 'string'){
        error.innerText = 'Please avoid a number input !!!';
        input.value = '';
    }
    else{
        error.innerText = 'Phone not found, please give a valid input !!!';
    }
}