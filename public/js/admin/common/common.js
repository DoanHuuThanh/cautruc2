document.addEventListener('DOMContentLoaded', () => {
    const toggleModal = (modalId, action) => {
        const modal = document.getElementById(modalId);
        
        if (action === 'open') {
            modal.classList.remove('hidden');
        } else if (action === 'close') {
            modal.classList.add('hidden');
        }
    };

    document.getElementById('open-modal-new-post-category').addEventListener('click', () => {
        toggleModal('modal-new-post-category', 'open');
    });

    document.getElementById('close-modal-new-post-category').addEventListener('click', () => {
        toggleModal('modal-new-post-category', 'close');
    });
});
