let balance, message;

async function performPINRequest() {
    let PIN = concatPIN();

    // remove later
    alert(PIN);

    const resp = await axios.post(`https://frontend-challenge.screencloud-michael.now.sh/api/pin/`, {
        headers: {
            'Content-Type': 'application/json',
        }, pin: JSON.stringify(PIN) })
        .then(function (response) {
            balance = response.data.currentBalance;
            let currentBalance = JSON.stringify(balance);
            localStorage.setItem('currentBalance', currentBalance);
            window.location.href = 'account.html';
        })
            .catch(function (response) {
                message = response.response.data.error;
                localStorage.setItem('errorMessage', message);
                window.location.href = 'error.html';
        });
}


function concatPIN() {
    let a = document.getElementById("pin1").value;
    let b = document.getElementById("pin2").value;
    let c = document.getElementById("pin3").value;
    let d = document.getElementById("pin4").value;
    let totalPIN = a + b + c + d;
    return Number(totalPIN);
}

function clearPIN() {
    document.getElementById("pin1").value = '';
    document.getElementById("pin2").value = '';
    document.getElementById("pin3").value = '';
    document.getElementById("pin4").value = '';
    document.getElementById("pin1").focus();
}

function checkBalance() {
    document.getElementById("bal").innerHTML = JSON.parse(localStorage.getItem('currentBalance'));
}

function displayError() {
    document.getElementById("errorMsg").innerHTML = localStorage.getItem('errorMessage');
}


