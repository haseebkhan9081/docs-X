const io=require('socket.io')(3001,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST'],
    }
})

io.on("connection",socket=>{
    let documentId;
    console.log("connected");
    socket.on('send-document',document=>{
   documentId=document.id;
        socket.join(documentId);

        console.log(document);
        console.log(document.content);
        if(!document.content){
        socket.emit('recieve-document','');
    }else{
        socket.emit('recieve-document',document.content);
    }
    
    })
    
    socket.on('send-changes',delta=>{
        socket.broadcast.to(documentId).emit('recieve-changes',delta);
    }) 
})