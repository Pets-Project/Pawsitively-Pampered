const contactform = document.querySelector('#contact-Form');
const Name = document.getElementById('Name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');


contactform.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = {
        name: Name.value,
        email: email.value,
        phone: phone.value,
        message: message.value
    }
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/send');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = () => {
    
        if(xhr.responseText == 'success'){
            alert('Thank you for contact us. Have a great day!');
            Name.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
        } else{
            alert('something went wrong!')
        }
    }

    xhr.send(JSON.stringify(formData));

})