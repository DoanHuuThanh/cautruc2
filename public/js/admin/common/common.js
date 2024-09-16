export const toggleModal = (modalId, action) => {
  const modal = document.getElementById(modalId);

  if (modal && action === 'open') {
    modal.classList.remove('hidden');
  } else if (action === 'close') {
    modal.classList.add('hidden');
  }
};
