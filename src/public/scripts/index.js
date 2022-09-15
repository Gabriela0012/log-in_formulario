const socket = io({
    autoConnect: false
});

function chatSocket() {
    if (chatBox.value.trim().length > 0) {
        socket.emit('message', { email: email, message: chatBox.value })
        chatBox.value = ''
    }
}

const header = document.getElementById('header')
// Swal.fire({
//     title: 'Usuario',
//     input: 'password',
//     text: 'Ingrese su usuario para continuar',
//     inputValidator: (value => {
//         return !value && 'Porfavor ingrese un usuario para continuar'
//     }),
//     allowOutsideClick: false,
//     allowEscapeKey: false
// }).then(result => {
//     email = result.value
//     socket.connect()
//     header.innerText = email
// })
Swal.fire({
  title: 'Formulario de acceso',
  html: `<input type="text" id="login" class="swal2-input" placeholder="Nombre de Usuario">
  <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
  confirmButtonText: 'Sign in',
  focusConfirm: false,
  preConfirm: () => {
    const login = Swal.getPopup().querySelector('#login').value
    const password = Swal.getPopup().querySelector('#password').value
    if (!login || !password) {
      Swal.showValidationMessage(`Please enter login and password`)
    }
    return { login: login, password: password }
  }
}).then((result) => {
  email = result.value.login
    socket.connect()
    header.innerText = email
})

    

// enviar un nuevo mensaje
const chatBox = document.getElementById('chatBox')
chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {
        chatSocket()
    }
})

const sendButton = document.getElementById('send')

sendButton.addEventListener('click', () => {
    
    chatSocket()
})

//escuchar los mensajes
socket.on('log', (data) => {
    const chats = document.getElementById('chats')
    chats.innerText = ''
    chats.innerHTML = chatsHTML(data)
    chats.scrollTop = chats.scrollHeight
})

// renderiza los productos
socket.on('productList', (data) => {
    let listProducts = document.getElementById('listProducts')
    listProducts.innerText = ''
    listProducts.innerHTML = createProductListHTML(data.products)
})







// agrega un producto al DOM 
const productName = document.getElementById('name')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')
const btn = document.getElementById('btnSubmit')
btn.addEventListener('click', (e) => {
    e.preventDefault()
    let product = {}
    if (productName.value.trim().length > 0 && thumbnail.value.trim().length > 0) {
        product.name = productName.value
        product.price = price.value
        product.thumbnail = thumbnail.value
        socket.emit('addProduct', product)
        productName.value = ''
        price.value = ''
        thumbnail.value = ''
    } else {
        Swal.fire({
            text: "don't let void fields on form!",
            toast: true
        })
    }
})

