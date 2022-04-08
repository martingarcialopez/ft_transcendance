const app = new Vue({
 el: '#app',
 data: {
  title: 'Nestjs Websockets Chat',
  name: '',
  content: '',
  messages: [],
  socket: null
 },
 methods: {
  sendMessage() {
   if(this.validateInput()) {
    const message = {
    name: this.name,
	content: this.content
   }
   this.socket.emit('msgToServer', message)
   this.content = ''
  }
 },
 receivedMessage(message) {
  this.messages.push(message)
 },
 validateInput() {
  return this.name.length > 0 && this.content.length > 0
 }
 },
	/*will be exe when front is created*/
 created() {
  this.socket = io('http://localhost:3000')
 /*add an event listener for event msgToClient*/
	 this.socket.on('msgToClient', (message) => {
		 console.log(message);
   this.receivedMessage(message)
  })
 }
})
