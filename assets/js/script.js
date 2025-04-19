// Acá está todo el JavaScript para que la página funcione
document.addEventListener('DOMContentLoaded', function() {
    // Esto crea el popup de agradecimiento, pero no lo muestra todavía
    const popup = document.createElement('div');
    popup.className = 'thank-you-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <i class="fas fa-check-circle"></i>
            <h2>¡GRACIAS!</h2>
            <p>Tu formulario ha sido enviado correctamente.</p>
            <p>Serás redirigido a la página principal en breve.</p>
        </div>
    `;

    // Esto crea el popup de error, por si algo sale mal
    const errorPopup = document.createElement('div');
    errorPopup.className = 'error-popup';
    errorPopup.innerHTML = `
        <div class="popup-content">
            <h2>Error</h2>
            <p>Por favor completa todos los campos.</p>
        </div>
    `;

    // Acá manejamos lo que pasa cuando mandan el formulario
    const form = document.getElementById('service-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validaciones para que los datos estén bien
            const requiredFields = ['nombre', 'dni', 'telefono', 'email', 'direccion', 'ciudad', 'provincia'];
            let isValid = true;

            // Validación avanzada para cada campo con texto en rojo para errores
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                const label = input.previousElementSibling; // Obtener el label asociado
                const value = input.value.trim();

                if (!value) {
                    isValid = false;
                    input.style.borderColor = '#ff4d4d'; // Resaltar el campo con borde rojo
                    if (label) label.style.color = '#ff4d4d'; // Cambiar el color del texto del label a rojo
                } else {
                    // Validaciones específicas por campo
                    if (field === 'nombre') {
                        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
                        if (!nameRegex.test(value)) {
                            isValid = false;
                            input.style.borderColor = '#ff4d4d';
                            if (label) label.style.color = '#ff4d4d';
                        } else {
                            input.style.borderColor = 'transparent';
                            if (label) label.style.color = 'white'; // Restaurar el color del texto del label
                        }
                    } else if (field === 'dni') {
                        const dniRegex = /^\d{8}$/; // Solo números y exactamente 8 dígitos
                        if (!dniRegex.test(value)) {
                            isValid = false;
                            input.style.borderColor = '#ff4d4d';
                            if (label) label.style.color = '#ff4d4d';
                        } else {
                            input.style.borderColor = 'transparent';
                            if (label) label.style.color = 'white';
                        }
                    } else if (field === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            isValid = false;
                            input.style.borderColor = '#ff4d4d';
                            if (label) label.style.color = '#ff4d4d';
                        } else {
                            input.style.borderColor = 'transparent';
                            if (label) label.style.color = 'white';
                        }
                    } else if (field === 'telefono') {
                        const phoneRegex = /^[0-9]+$/;
                        if (!phoneRegex.test(value)) {
                            isValid = false;
                            input.style.borderColor = '#ff4d4d';
                            if (label) label.style.color = '#ff4d4d';
                        } else {
                            input.style.borderColor = 'transparent';
                            if (label) label.style.color = 'white';
                        }
                    } else {
                        input.style.borderColor = 'transparent';
                        if (label) label.style.color = 'white';
                    }
                }
            });
            
            if (isValid) {
                // Mostrar el popup de agradecimiento
                document.body.appendChild(popup);
                // Agregar clase activa para mostrar el popup
                setTimeout(() => {
                    popup.classList.add('active');
                }, 100);
                
                // Resetear formulario
                form.reset();
                
                // Después de 3 segundos, ocultar popup y redirigir
                setTimeout(() => {
                    popup.classList.remove('active');
                    // Pequeño retraso para que termine la animación
                    setTimeout(() => {
                        window.location.href = 'main-page.html';
                    }, 300);
                }, 3000);
            } else {
                // Mostrar el popup de error
                document.body.appendChild(errorPopup);
                // Agregar clase activa para mostrar el popup
                setTimeout(() => {
                    errorPopup.classList.add('active');
                }, 100);

                // Después de 3 segundos, ocultar popup de error
                setTimeout(() => {
                    errorPopup.classList.remove('active');
                    // Pequeño retraso para que termine la animación
                    setTimeout(() => {
                        errorPopup.remove();
                    }, 300);
                }, 3000);
            }
        });
    }
    
    // Esto es para que el dropdown de equipo funcione bien
    const equipoSelect = document.getElementById('equipo');
    if (equipoSelect) {
        equipoSelect.addEventListener('change', function() {
            const marcaInput = document.getElementById('marca');
            const modeloInput = document.getElementById('modelo');
            
            if (this.value) {
                marcaInput.disabled = false;
                modeloInput.disabled = false;
            } else {
                marcaInput.disabled = true;
                modeloInput.disabled = true;
                marcaInput.value = '';
                modeloInput.value = '';
            }
        });
    }
});