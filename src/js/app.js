let balance, message;

let machine = {
    fivePounds: 4,
    tenPounds: 15,
    twentyPounds: 7
}

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
    document.getElementById("bal").innerHTML = "£ " + JSON.parse(localStorage.getItem('currentBalance'));
}

function displayError() {
    document.getElementById("errorMsg").innerHTML = localStorage.getItem('errorMessage');
}

function logout() {
    window.location.href = 'index.html'
}

function withdrawMoney() {

}

function depositMoney() {
    let transaction = "Deposit";
    createModal(transaction);
}

function transferMoney() {
    let transaction = "Transfer";
    createModal(transaction);
}

function calculateAmount() {

}

function createModal(transaction) {
    let modal = document.getElementById("constructionModal");
    let span = document.getElementsByClassName("close")[0];
    document.getElementById("modal-title").innerHTML = transaction;

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("amount").focus();
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.getElementById("amount").focus();
        }
    }
}

