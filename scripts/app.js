const chatList = document.querySelector(".chat-list")
const chatForm = document.querySelector(".new-chat")
const nameForm = document.querySelector(".new-name")
const updateMessage = document.querySelector(".update-mssg")

chatForm.addEventListener("submit", e => {
	e.preventDefault()
	const message = e.target.message.value.trim()
	chatroom.addChat(message).catch(error => console.log(error))
	chatForm.reset()
})

nameForm.addEventListener("submit", e => {
	e.preventDefault()
	const newName = nameForm.name.value.trim()
	chatroom.changeUser(newName)
	nameForm.reset()
	updateMessage.textContent = `Your name was updated to ${newName}`
	setTimeout(() => {
		updateMessage.textContent = ""
	}, 3000)
})

const username = localStorage.username ? localStorage.username : "anonymous"

const chatUI = new ChatUI(chatList)
const chatroom = new ChatroomClass("general", username)
chatroom.getChats(data => chatUI.render(data))
