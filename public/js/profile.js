const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#pet-name').value.trim();
  const species = document.querySelector('#species').value.trim();
  const breed = document.querySelector('#breed').value.trim();
  const size = document.querySelector('#size').value.trim();
  let allergies = document.querySelector('#allergies').value.trim();
  const diet_needs = document.querySelector('#diet_needs').value.trim();
  const other_needs = document.querySelector('#other_needs').value.trim();
  const age = document.querySelector('#age').value.trim();

  if (name && species && breed && size && allergies && diet_needs && other_needs && age) {
    if(allergies == 'none' || allergies == 'None') {
      allergies = false;
    } else {
      allergies = true;
    }

    const response = await fetch(`/api/pets`, {
      method: 'POST',
      body: JSON.stringify({ name, species, breed, size, allergies, diet_needs, other_needs, age }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to add pet');
    }
  }
};

const toggleForm = () => {
  document
  .querySelector('#newPetForm')
  .classList.toggle('hidden');
}

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/pets/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete pet');
    }
  }
};

document
.querySelector('#newPetBtn')
.addEventListener('click', toggleForm);

document
  .querySelector('.new-pet-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('#pet-delete')
  .addEventListener('click', delButtonHandler);
