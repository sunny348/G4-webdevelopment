const textBox = document.getElementById('textBox')
let debounceTimeout
textBox.addEventListener('input', (event) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
        console.log('Searched for : ', event.target.value)
    }, 300)
})