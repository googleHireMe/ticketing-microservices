import nats, { Message } from 'node-nats-streaming';

const stan = nats.connect('ticketing', '123', {
	url: 'http://localhost:4222',
});

stan.on('connect', () => {
	console.log('Listner connected to NATS');

	const subscription = stan.subscribe('ticket:created');

	subscription.on('message', (msg: Message) => {
		console.log('Message recieved');
	});
})