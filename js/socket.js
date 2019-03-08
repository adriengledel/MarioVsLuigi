(function(window, io){
    window.addEventListener('DOMContentLoaded', function(){
        console.log('socket connecté client');
        /* var socket  = io('http://localhost:8080/');
        $('form').on('submit', function(e){
            e.preventDefault();
            var id = document.getElementById(nb).id;
           
            socket.emit('identifiant', {id:id});
        });
            
       
            emit = function(){
                socket.emit('unEvenement', {
            
                id:document.getElementById(nb).id,
                positionX:document.getElementById(nb).style.left
                


            });
        }
        
        socket.on('creation', function(data){
            console.log(data.data.id);
            var newPlayer = Object.create(playerClone);
            newPlayer.create(data.data.id);

            console.log("ok créé");
        });
        socket.on('position', function(data){
            console.log(data);
            document.getElementById(data.data.id).style.left = data.data.positionX;
            
        }); */

    });

})(window, io);