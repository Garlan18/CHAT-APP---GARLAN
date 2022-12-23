const socket = io()

socket.on('countUpdated', (count) => {
    console.log('The count has been updated', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    e.preventDefault()

    const message = e.target.elements.message.value
    
    socket.emit('sendMessage', message)
})