const showPhones = document.getElementById('phones');
const phoneDetails = document.getElementById('details');
const spinner = document.getElementById('spinner');
const showAllPhone = document.getElementById('show-btn');

// get search value
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
        phoneDetails.innerHTML = '';
        spinner.style.display = 'block';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhones(data.data));
    }
    else if(inputValue == ''){
        error.innerText = 'Please give a valid phone brand name !!!';
        input.value = '';
        showPhones.innerHTML = '';
        phoneDetails.innerHTML = '';
    }
    else if (isNaN(inputValue) == false && parseInt(inputValue) !== 'string'){
        error.innerText = 'Please avoid a number input & give valid brand name  !!!';
        input.value = '';
        showPhones.innerHTML = '';
        phoneDetails.innerHTML = '';
    }
    else{
        error.innerText = 'No Phone found, please give valid brand name !!!';
        showPhones.innerHTML = '';
        phoneDetails.innerHTML = '';
    }
}

// display all phones
const displayPhones = phones => {
    const first20Phones = phones.slice(0,20);
    const restPhones = phones.slice(21);
    first20Phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col-md-6', 'col-lg-4', 'text-center');
        if(phone.phone_name.includes('Watch')){
            div.innerHTML = '';
        }
        else{
            div.innerHTML = `
            <div class="card mx-auto shadow" style="width: 18rem;">
                <img src="${phone.image}" id="card-img" class="card-img-top w-75 mx-auto pt-3" alt="image">
                <div class="card-body">
                    <h4 class="card-title">${phone.phone_name}</h4>
                    <h5 class="card-text">Brand : ${phone.brand}</h5>
                    <a href="#" class="btn fw-bolder btn-bg-color" onclick="getPhoneId('${phone.slug}')"><span class="text-white">Full Specifications</span></a>
                </div>
            </div>
        `;
        showPhones.appendChild(div);
        }
    });
    spinner.style.display = 'none';
    showAllPhone .style.display = 'block';
    document.getElementById('show-btn').addEventListener('click', function() {
        restPhones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col-md-6', 'col-lg-4', 'text-center');
            if(phone.phone_name.includes('Watch')){
                div.innerHTML = '';
            }
            else{
                div.innerHTML = `
                <div class="card mx-auto shadow" style="width: 18rem;">
                    <img src="${phone.image}" id="card-img" class="card-img-top w-75 mx-auto pt-3" alt="image">
                    <div class="card-body">
                        <h4 class="card-title">${phone.phone_name}</h4>
                        <h5 class="card-text">Brand : ${phone.brand}</h5>
                        <a href="#" class="btn fw-bolder btn-bg-color" onclick="getPhoneId('${phone.slug}')"><span class="text-white">Full Specifications</span></a>
                    </div>
                </div>
            `;
            showPhones.appendChild(div);
            }
        });
        showAllPhone .style.display = 'none';
    })
}

// get phone details by id
const getPhoneId = id => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
}

// show all specifications of phones
const displayDetails = details => {
    const div = document.createElement('div');
    phoneDetails.innerHTML = '';
    div.innerHTML = `
        <div class="card mx-auto mb-5 shadow-lg" style="width: 18rem;">
            <img src="${details.image}" class="card-img-top img-fluid" alt="image">
            <div class="card-body">
                <h3 class="card-title">${details.name}</h3>
                <h4 class="card-title">Brand: ${details.brand}</h4>
                <p class="card-title"><span class="text-color">Release Date: </span>${details.releaseDate ? details.releaseDate: 'Not Found'}</p>
                <h6 class="card-title"><span class="text-color">Chipset: </span>${details.mainFeatures.chipSet ? details.mainFeatures.chipSet: 'Not Found'}</h6>
                <h6 class="card-title"><span class="text-color">Display Size: </span>${details.mainFeatures.displaySize}</h6>
                <h6 class="card-title"><span class="text-color">Memory: </span>${details.mainFeatures.memory ? details.mainFeatures.memory: 'Not Found'}</h6>
                <h6 class="card-title"><span class="text-color">Sensors: </span>${details.mainFeatures.sensors.join()}</h6>
                <h6 class="card-title"><span class="text-color">Storage: </span>${details.mainFeatures.storage}</h6>
                <h6 class="card-title"><span class="text-color">Blutooth:</span>${details?.others?.Bluetooth ? details?.others?.Bluetooth: 'Not Found'}</h6>
                <h6 class="card-title"><span class="text-color">GPS:</span>${details?.others?.GPS ? details?.others?.GPS: 'Not Found'}</h6>
                <h6 class="card-title"><span class="text-color">NFC:</span>${details?.others?.NFC ? details?.others?.NFC: 'Not Found'}</h6>
                <h6 class="card-title"><span class="text-color">Radio:</span>${details?.others?.Radio ? details?.others?.Radio: 'Not Found'}</h6>
                <h6 class="card-title"><span class="text-color">USB:</span>${details?.others?.USB ? details?.others?.USB: 'Not Found'}</h6>
                <h6 class="card-title"><span class="text-color">WLAN:</span>${details?.others?.WLAN ? details?.others?.WLAN: 'Not Found'}</h6>
            </div>
        </div> 
    `;
    phoneDetails.appendChild(div);
}