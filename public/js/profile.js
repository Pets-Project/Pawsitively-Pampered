const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#pet-name').value.trim();
  const petSpecies = document.querySelector('#species').value.trim();
  const petBreed = document.querySelector('#breed').value.trim();
  const petSize = document.querySelector('#breed').value.trim();
  const petAllergies = document.querySelector('#allergies').value.trim();
  const petDiet = document.querySelector('#diet_needs').value.trim();
  const petAge = document.querySelector('#age').value.trim();

  if (name && petSpecies && petBreed && petAllergies && petDiet && petAge) {
    const response = await fetch(`/api/pet`, {
      method: 'POST',
      body: JSON.stringify({ name, petSpecies, petBreed, petSize, petAllergies, petDiet, petAge }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
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

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
.querySelector('#newPetBtn')
.addEventListener('click', toggleForm);

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
