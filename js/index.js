const showPhones = document.getElementById('phones');

const searchButton = () => {
    const input = document.getElementById('input-value');
    const error = document.getElementById('error-message');
    const inputValue = input.value;
    const samsung = 'samsung';
    const iphone = 'iphone';
    const oppo = 'oppo';
    const huawei = 'huawei';
    if (inputValue.toLowerCase() === samsung || inputValue.toLowerCase() === iphone || inputValue.toLowerCase() === oppo || inputValue.toLowerCase() === huawei) {
        error.innerText = '';
        input.value = '';
        phones.innerHTML = '';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhones(data.data));
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

const displayPhones = phones => {
    phones.forEach(phone => {
        console.log(phone);

        const div = document.createElement('div');
        div.classList.add('col-md-6', 'col-lg-4', 'text-center');
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top w-75 mx-auto pt-3" alt="image">
                <div class="card-body">
                    <h4 class="card-title">${phone.phone_name}</h4>
                    <h5 class="card-text">${phone.brand}</h5>
                    <button class="btn btn-success fw-bolder">See Details</button>
                </div>
            </div>
        `;
        showPhones.appendChild(div);
    });
}