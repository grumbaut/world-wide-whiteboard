// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, {draw} from './whiteboard'

// Example: Draw a single stroke.
// draw([0, 0], [250, 250], 'red', true)

var socket = io(window.location.origin);

socket.on('connect', function() {
  console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', (start, end, color) => {
  socket.emit('doodle', {start, end, color});
});

socket.on('drawData', (event) => {
  const { start, end, color} = event;
  console.log(event);
  draw(start, end, color);
});

socket.on('state', (state)=> {
  state.forEach(event => {
    const { start, end, color } = event;
    draw(start, end, color, false);
  });
});

