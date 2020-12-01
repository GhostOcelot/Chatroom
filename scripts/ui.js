class ChatUI {
	constructor(list) {
		this.list = list
	}
	render = data => {
		const msgPostTime = dateFns.distanceInWordsToNow(data.createdAt.toDate(), {
			addSuffix: true
		})
		const html = `
    <li class="list-group-item">
      <span class="username"> ${data.username}</span>
      <span class="message"> ${data.message}</span>
      <div class="time">${msgPostTime}</div>
    </li>`
		this.list.innerHTML += html
	}
}
