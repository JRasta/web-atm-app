let balance;

async function performPINRequest() {
    let PIN = concatPIN();
    alert(PIN);

    const resp = await axios.post(`https://frontend-challenge.screencloud-michael.now.sh/api/pin/`, {
        headers: {
            'Content-Type': 'application/json',
        }, pin: JSON.stringify(PIN) })
        .then(function (response) {
            alert('Content found');
            balance = response.data.currentBalance;
            // window.location.href = 'account.html';
        })
            .catch(function (response) {
                alert(response.message);
                // window.location.href = 'error.html';
        });
    return balance;
}


function concatPIN() {
    let a = document.getElementById("pin1").value;
    let b = document.getElementById("pin2").value;
    let c = document.getElementById("pin3").value;
    let d = document.getElementById("pin4").value;
    let totalPIN = a + b + c + d;
    return Number(totalPIN);
}

function callBalance() {
    debugger;
    alert(balance);
    // document.getElementById('balance').innerHTML = balance;
}
