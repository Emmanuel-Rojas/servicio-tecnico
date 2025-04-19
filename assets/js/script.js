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
            <p>Por favor completa correctamente todos los campos.</p>
        </div>
    `;

    // Acá manejamos lo que pasa cuando mandan el formulario
    const form = document.getElementById('service-form');
    if (form) {
        // Manejar el envío del formulario completamente con JavaScript
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validaciones personalizadas
            const nombre = form.querySelector('input[name="nombre"]');
            const dni = form.querySelector('input[name="dni"]');
            const requiredFields = form.querySelectorAll('[required]');

            // Limpiar errores previos
            requiredFields.forEach(field => {
                field.classList.remove('error-field');
                const label = field.closest('label');
                if (label) {
                    label.classList.remove('error-label');
                }
            });

            // Verificar campos requeridos
            let allFieldsValid = true;
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allFieldsValid = false;
                    field.classList.add('error-field');
                    const label = field.closest('label');
                    if (label) {
                        label.classList.add('error-label');
                    }
                }
            });

            // Validar que el nombre solo contenga letras
            const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!nombreRegex.test(nombre.value)) {
                allFieldsValid = false;
                nombre.classList.add('error-field');
                const label = nombre.closest('label');
                if (label) {
                    label.classList.add('error-label');
                }
            }

            // Validar que el DNI tenga exactamente 8 números
            const dniRegex = /^\d{8}$/;
            if (!dniRegex.test(dni.value)) {
                allFieldsValid = false;
                dni.classList.add('error-field');
                const label = dni.closest('label');
                if (label) {
                    label.classList.add('error-label');
                }
            }

            if (!allFieldsValid) {
                // Mostrar el popup de error si hay campos inválidos
                if (!document.body.contains(errorPopup)) {
                    document.body.appendChild(errorPopup);
                }
                setTimeout(() => {
                    errorPopup.classList.add('active');
                }, 100);

                // Después de 3 segundos, ocultar popup de error
                setTimeout(() => {
                    errorPopup.classList.remove('active');
                    setTimeout(() => {
                        errorPopup.remove();
                    }, 300);
                }, 3000);
                return;
            }

            // Si todo está bien, proceder con el envío
            const formData = new FormData(form);

            fetch('https://formspree.io/f/mblgnrnp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Mostrar el popup de agradecimiento
                    if (!document.body.contains(popup)) {
                        document.body.appendChild(popup);
                    }
                    setTimeout(() => {
                        popup.classList.add('active');
                    }, 100);

                    // Resetear formulario
                    form.reset();

                    // Después de 3 segundos, ocultar popup y redirigir
                    setTimeout(() => {
                        popup.classList.remove('active');
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 300);
                    }, 3000);
                } else {
                    // Mostrar el popup de error si algo falla
                    if (!document.body.contains(errorPopup)) {
                        document.body.appendChild(errorPopup);
                    }
                    setTimeout(() => {
                        errorPopup.classList.add('active');
                    }, 100);

                    // Después de 3 segundos, ocultar popup de error
                    setTimeout(() => {
                        errorPopup.classList.remove('active');
                        setTimeout(() => {
                            errorPopup.remove();
                        }, 300);
                    }, 3000);
                }
            })
            .catch(() => {
                // Mostrar el popup de error si hay un problema con la solicitud
                if (!document.body.contains(errorPopup)) {
                    document.body.appendChild(errorPopup);
                }
                setTimeout(() => {
                    errorPopup.classList.add('active');
                }, 100);

                // Después de 3 segundos, ocultar popup de error
                setTimeout(() => {
                    errorPopup.classList.remove('active');
                    setTimeout(() => {
                        errorPopup.remove();
                    }, 300);
                }, 3000);
            });
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