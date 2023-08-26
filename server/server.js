const io=require('socket.io')(3000,{
    cors:{
        origin:['https://3001-shiny-credit-78673207.eu-ws2.runcode.io',
                'https://3000-shiny-credit-78673207.eu-ws2.runcode.io'],
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
