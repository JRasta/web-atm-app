let balance, message;
let overdraft = 100;

async function performPINRequest() {
    let PIN = concatPIN();
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
    let custOD = JSON.stringify(overdraft);
    localStorage.setItem('overdraft', custOD);
}


function displayError() {
    document.getElementById("errorMsg").innerHTML = localStorage.getItem('errorMessage');
}


function logout() {
    window.location.href = 'index.html'
}


function depositMoney() {
    let transaction = "Deposit";
    constructionModal(transaction);
}


function transferMoney() {
    let transaction = "Transfer";
    constructionModal(transaction);
}


function calculateAmount() {
    let withdrawalAmt = document.getElementById("amount").value;
    withdrawalAmt = Number(withdrawalAmt);

    let currentAmt = JSON.parse(localStorage.getItem('currentBalance'));
    let overdraft = JSON.parse(localStorage.getItem('overdraft'));
    let newAmt = 0, overdraftAmt = 0;

    if (withdrawalAmt > currentAmt && overdraft === 0) {
        errorModal();
    } else {
        newAmt = currentAmt - withdrawalAmt;
        if (newAmt < 0 && overdraft !== 0){
            debugger;

            if (currentAmt < 0){
                overdraftAmt = overdraft - withdrawalAmt;
            } else {
                warningModal();
                overdraftAmt = (overdraft + currentAmt) - withdrawalAmt;
            }

            if (overdraftAmt >= 0) {
                overdraftAmt = JSON.stringify(overdraftAmt);
                localStorage.setItem('overdraft', overdraftAmt);
            } else {
                errorModal();
                return;
            }
        }
        newAmt = JSON.stringify(newAmt);
        localStorage.setItem('currentBalance', newAmt);
        document.getElementById("amount").value='';
        document.getElementById("bal").innerHTML = "£ " + JSON.parse(localStorage.getItem('currentBalance'));
        document.getElementById("amount").focus();
    }
}


function constructionModal(transaction) {
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


function errorModal() {
    let errorModal = document.getElementById("errorModal");
    let errorSpan = document.getElementsByClassName("errorClose")[0];

    errorModal.style.display = "block";

    errorSpan.onclick = function() {
        errorModal.style.display = "none";
        document.getElementById("amount").focus();
    }

    window.onclick = function(event) {
        if (event.target === errorModal) {
            errorModal.style.display = "none";
            document.getElementById("amount").focus();
        }
    }
}


function warningModal() {
    let warningModal = document.getElementById("warningModal");
    let warningSpan = document.getElementsByClassName("warningClose")[0];

    warningModal.style.display = "block";

    warningSpan.onclick = function() {
        warningModal.style.display = "none";
        document.getElementById("amount").focus();
    }

    window.onclick = function(event) {
        if (event.target === warningModal) {
            warningModal.style.display = "none";
            document.getElementById("amount").focus();
        }
    }
}


