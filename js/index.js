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
        error.innerText = 'Please input a phone name !!!';
        input.value = '';
        showPhones.innerHTML = '';
        phoneDetails.innerHTML = '';
    }
    else if (isNaN(inputValue) == false && parseInt(inputValue) !== 'string'){
        error.innerText = 'Please avoid a number input !!!';
        input.value = '';
        showPhones.innerHTML = '';
        phoneDetails.innerHTML = '';
    }
    else{
        error.innerText = 'No Phone found, please give a valid input !!!';
        showPhones.innerHTML = '';
        phoneDetails.innerHTML = '';
    }
}

// display all phones
const displayPhones = phones => {
    const first20Phones = phones.slice(0,20);
    const restPhones = phones.slice(21);
    console.log(restPhones);
    first20Phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col-md-6', 'col-lg-4', 'text-center');
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
    });
    spinner.style.display = 'none';
    showAllPhone .style.display = 'block';
    document.getElementById('show-btn').addEventListener('click', function() {
        restPhones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col-md-6', 'col-lg-4', 'text-center');
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
    const sensorList = [];
    const sensors = details.mainFeatures.sensors.forEach(sensor => {
        sensorList.push(sensor);
    });
    div.innerHTML = `
        <div class="card mx-auto mb-5 shadow-lg" style="width: 18rem;">
            <img src="${details.image}" class="card-img-top img-fluid" alt="image">
            <div class="card-body">
                <h4 class="card-title"><span id="text-color">Name : </span> ${details.name}</h4>
                <h5 class="card-title"><span id="text-color">Brand : </span>${details.brand}</h5>
                <h6 class="card-title"><span id="text-color">Release Date : </span> ${details.releaseDate ? details.releaseDate: 'Not Found'}</h6>
                <h6 class="card-title"><span id="text-color">Chipset : </span>${details.mainFeatures.chipSet}</h6>
                <h6 class="card-title"><span id="text-color">Display Size : </span>${details.mainFeatures.displaySize}</h6>
                <h6 class="card-title"><span id="text-color">Memory : </span>${details.mainFeatures.memory}</h6>
                <h6 class="card-title"><span id="text-color">Sensors : </span>${sensorList}</h6>
                <h6 class="card-title"><span id="text-color">Blutooth :</span>${details.others.Bluetooth}</h6>
                <h6 class="card-title"><span id="text-color">GPS :</span>${details.others.GPS}</h6>
                <h6 class="card-title"><span id="text-color">NFC :</span>${details.others.NFC}</h6>
                <h6 class="card-title"><span id="text-color">Radio :</span>${details.others.Radio}</h6>
                <h6 class="card-title"><span id="text-color">USB :</span>${details.others.USB}</h6>
                <h6 class="card-title"><span id="text-color">WLAN :</span>${details.others.WLAN}</h6>
            </div>
        </div> 
    `;
    phoneDetails.appendChild(div);
}