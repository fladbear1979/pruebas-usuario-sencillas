document.getElementById('comentarioForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const comentario = document.getElementById('comentario').value;

    fetch('/api/comentarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comentario })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('comentario').value = '';
    })
    .catch(err => console.error(err));
});