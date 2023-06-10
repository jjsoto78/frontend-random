const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')


openModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const modal =document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

overlay.addEventListener('click', ()=>{
    const modals =  document.querySelectorAll('.modal.active')
    closeModal(modals[0]) // theres only one modal
})


function openModal(modal){
    if(modal == null) return
    modal.classList.add('active') // the css class crated earlier   
    overlay.classList.add('active') // the css class crated earlier   
}

function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active') // the css class crated earlier   
    overlay.classList.remove('active') // the css class crated earlier   
}