const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let msg1 = document.querySelector('#msg-1');
let msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    
    const url = `/weather?address=${search.value}`;
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            return msg1.textContent = data.error;
        }
        msg1.textContent = data.location;
        msg2.textContent = data.forecast.join('\n');
    })
})
})