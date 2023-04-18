const socket = require('socket.io')
let users = []

const EditData = (data, id, call) => {
    const newData = data.map(item => 
        item.id === id ? {...item, call} : item
    )
    return newData;
}

const SocketServer = (socket) => {
    
    // Connect - Disconnect
    socket.on('joinUser', id => {
        console.log({id, socketId: socket.id})
        users.push({id, socketId: socket.id})
        //console.log({users})
        //users.push({user, socketId: socket.id, followers: user.followers})
        //console.log(users)
    })

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
        //console.log({users})
    })


    // Likes
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        //console.log(newPost)
        const clients = users.filter(user => ids.includes(user.id))
        if(clients.length > 0)
        {
            clients.forEach(client => {
                //console.log("like in server")
                socket.to(`${client.socketId}`).emit('likeToClient',newPost)
            })
        }
    })

    // Unlikes
    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        ///console.log(newPost)
        const clients = users.filter(user => ids.includes(user.id))
        if(clients.length > 0)
        {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unLikeToClient',newPost)
            })
        }
    })

    //Comments
    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        //console.log(newPost)
        const clients = users.filter(user => ids.includes(user.id))
        if(clients.length > 0)
        {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient',newPost)
            })
        }
    })

    //Comments
    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        //console.log(newPost)
        const clients = users.filter(user => ids.includes(user.id))
        if(clients.length > 0)
        {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient',newPost)
            })
        }
    })

    //follow
    socket.on('follow', newUser => {
       // console.log(newUser)
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('followToClient',newUser)
    })   

    //unfollow
    socket.on('unFollow', newUser => {
        // console.log(newUser)
         const user = users.find(user => user.id === newUser._id)
         user && socket.to(`${user.socketId}`).emit('unFollowToClient',newUser)
     }) 
}

module.exports = SocketServer