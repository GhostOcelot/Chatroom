class ChatroomClass {
	constructor(room, username) {
		this.room = room
		this.username = username
		this.chats = db.collection("chats")
		this.unsub
	}

	addChat = async message => {
		const now = new Date()
		const chat = {
			message: message,
			username: this.username,
			room: this.room,
			createdAt: firebase.firestore.Timestamp.fromDate(now)
		}
		const chatMessage = await this.chats.add(chat)
		return chatMessage
	}

	getChats = callback => {
		this.unsub = this.chats
			.where("room", "==", this.room)
			.orderBy("createdAt")
			.onSnapshot(snapshot => {
				snapshot.docChanges().forEach(change => {
					if (change.type === "added") {
						callback(change.doc.data())
					}
				})
			})
	}

	changeUser = user => {
		this.username = user
		localStorage.setItem("username", user)
	}

	changeRoom = room => {
		this.room = room
		console.log("The current room is " + this.room)
		if (this.unsub) {
			this.unsub()
		}
	}
}
