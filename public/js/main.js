let socket = io.connect(); 
socket.on('products', function(data) { 
  console.log(data);
  render(data);
});

socket.on('messages', function(data) { 
  console.log(data);
  renderMessages(data);
});

function render(data) { 
    let html = `<tr>
          <th>Name</th>
          <th>Price</th>
          <th>Thumbnails</th>
      </tr>`
    
      html += data.map(function(elem, index){ 
      return(`
      <tr>
          <td>${elem.title}</td>
          <td>$ ${elem.price}</td>
          <td><img  src=${elem.thumbnail} alt="not found"></td>
      </tr>`) 
    }).join(" "); 
    document.getElementById('products').innerHTML = html; 
}

function addProduct() { 
    let product = { 
      title: document.getElementById('title').value, 
      price: document.getElementById('price').value,
      thumbnails: document.getElementById('thumbnails').value
    }; 
    socket.emit('new-product', product); 

    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';
    document.getElementById('title').focus();

    return;
}


function renderMessages(data) { 
    let html = data.map(function(elem, index){ 
      return(`<div>
            <strong>${elem.email}</strong>: 
            <em>${elem.message}</em> </div>`) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

function addMessage() { 
    let message = { 
      email: document.getElementById('email').value, 
      message: document.getElementById('message').value
    }; 
    console.log(message);
    socket.emit('new-message', message); 

    document.getElementById('message').value = '';

    return;
}