const rooms = ['general', 'tech', 'finance', 'crypto', 'data'];
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const User = require('./models/User');
const Message = require('./models/Message');
const Topic = require('./models/Topic'); // 引入 Topic 模型
const cors = require('cors');
const bodyParser = require('body-parser');


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cors());
// 增加主體大小限制
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(bodyParser.json({ limit: '200mb' }));

// 解決 CORS 問題
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // 允許的前端網址
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
require('./connection'); // 與 MongoDB 連結

const server = require('http').createServer(app);
const PORT = 5001;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } },
  ]);
  return roomMessages;
}

function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

// socket connection

io.on('connection', (socket) => {
  socket.on('new-user', async () => {
    const members = await User.find();
    io.emit('new-user', members);
  });

  socket.on('join-room', async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages);
  });

  socket.on('message-room', async (room, content, sender, time, date) => {
    const newMessage = await Message.create({ content, from: sender, time, date, to: room });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit('room-messages', roomMessages);
    socket.broadcast.emit('notifications', room);
  });

  app.delete('/logout', async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = 'offline';
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit('new-user', members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send();
    }
  });
});

// 修改 GET /rooms 路由處理程序
app.get('/rooms', async (req, res) => {
  try {
    const topics = await Topic.find({}, 'topicName');
    const roomNames = topics.map((topic) => topic.topicName);
    res.json(roomNames);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving room names');
  }
});

server.listen(PORT, () => {
  console.log('listening to port', PORT);
});
