const inputEmail = document.getElementById('email')
const inputName = document.getElementById('name')
const inputLastName = document.getElementById('last_name')
const inputAge = document.getElementById('age')
const inputNickname = document.getElementById('nickname')
const inputAvatar = document.getElementById('avatar')
const inputPassword = document.getElementById('password')
const button = document.getElementById('btnSubmit')


button.addEventListener('click', (e) => {
  e.preventDefault()
	let email = inputEmail.value
  let name = inputName.value
  let last_name = inputLastName.value
  let age = inputAge.value
  let nickname = inputNickname.value
  let avatar = inputAvatar.value
	let password= inputPassword.value

	fetch('/api/register', {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
  		name,
  		last_name,
  		age,
 		 	nickname,
 			avatar,
			password
		}),
		
	})

})
