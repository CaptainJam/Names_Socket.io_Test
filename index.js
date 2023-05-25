const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // serve static files from 'public' directory


let sliderValues = {};
let numSliders = 72;
for (let i = 1; i <= numSliders; i++) {
    sliderValues['slider' + i] = 50;
}

io.on('connection', (socket) => {
    console.log('a user connected');

    // Send the current slider values to the client when they connect
    socket.emit('initialSliderValues', sliderValues);

    socket.on('sliderChange', (data) => {
      //  console.log('Slider change:', data);
        // Update the saved slider value
        if (data.name in sliderValues) {
            sliderValues[data.name] = data.value;
            console.log('Updated slider values:', sliderValues); // New line
        }
        // Broadcast the slider change to all other clients
        socket.broadcast.emit('sliderChange', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));
