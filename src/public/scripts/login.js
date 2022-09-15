
const inputEmail = document.getElementById('email')
const inputPassword = document.getElementById('password')
const button = document.getElementById('btnSubmit')


button.addEventListener('click', (e) => {
  e.preventDefault()
	let email = inputEmail.value
	let password= inputPassword.value

	fetch('/api/login', {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password
		}),
		
	})

	

	location.href = 'http://localhost:8080/api/current'

})
