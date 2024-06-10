export function initializeCanvas(canvas) {
    console.log('Initializing canvas...');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    // Default image url
    img.src = 'https://dl6pgk4f88hky.cloudfront.net/2021/06/untitled_design_21_.png';
    console.log('Image source set:', img.src);

    // Initial state
    let scale = 1;
    let originX = 0;
    let originY = 0;
    let startX, startY;
    let rotateAngle = 0; // Initial rotate angle
    let isPanning = false;
    let isRotating = false;

    function drawImage() {
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(originX + img.width * scale / 2, originY + img.height * scale / 2);
        ctx.rotate(rotateAngle);
        ctx.scale(scale, scale);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();
    }

    document.getElementById('uploadFile').addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            // Add an event listener that runs when the file has been read
            reader.onload = (e) => {
                // Add an event listener that runs when the image has fully loaded
                img.onload = () => {
                    console.log('Image loaded successfully.');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    startX = 0;
                    startY = 0;
                    scale = 1;
                    originX = 0;
                    originY = 0;

                    drawImage();
                    console.log("Image drawn on canvas.");
                };
                img.src = e.target.result; // Set the image source to the uploaded image
            };
            // Read the uploaded file as a data URL
            reader.readAsDataURL(file);
        }
    });

    // Add an event listener that runs when the image has fully loaded
    img.onload = () => {
        console.log('Image loaded successfully.');
        canvas.width = img.width;
        canvas.height = img.height;

        drawImage();
        console.log("Image drawn on canvas.");
    };
    canvas.focus();

    // Reset Image listener
    canvas.addEventListener('keydown', (event) => {
        console.log('Key pressed:', event.keyCode)
        if (event.key === ' ') {
            scale = 1;
            originX = 0;
            originY = 0;
            rotateAngle = 0;
            drawImage(); // Call the drawImage function after resetting the image properties
        }
    });

    // Add an event listener for panning
    canvas.addEventListener('mousedown', (event) => { 
        if (event.button === 0 && !isRotating)
            {
                isPanning = true;
                startX = event.clientX - originX;
                startY = event.clientY - originY;
            }
    });

    // Check if the mouse moves while panning
    canvas.addEventListener('mousemove', (event) => {
        if (isPanning) {
            console.log('ClientX:', event.clientX, 'ClientY:', event.clientY, 'StartX:', startX, 'StartY:', startY, 'OriginX:', originX, 'OriginY:', originY);
            originX = event.clientX - startX;
            originY = event.clientY - startY;

            drawImage();
        }
    });

    // Stop panning when the mouse is out
    canvas.addEventListener('mouseout', () => {
        isPanning = false;
        isRotating = false;
    });

    // Add an event listener for zooming
    canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
        const zoom = event.deltaY < 0 ? 1.1 : 0.9;
        const mouseX = event.clientX - canvas.offsetLeft;
        const mouseY = event.clientY - canvas.offsetTop;

        scale *= zoom;
        originX = mouseX - (mouseX - originX) * zoom;
        originY = mouseY - (mouseY - originY) * zoom;
        drawImage();
    });

    // Toggle rotatinging on when the middle mouse button is pressed
    canvas.addEventListener('mousedown', (event) => {
        if (event.button === 2) {
            isRotating = true;
        }
    });

    // Toggle rotatinging and panning off
    canvas.addEventListener('mouseup', () => {
        isRotating = false;
        isPanning = false;
    });

    // Event listener for rotatinging
    canvas.addEventListener('mousemove', (event) => {
        if (!isPanning && isRotating) {
            const mouseX = event.clientX - canvas.offsetLeft;
            const mouseY = event.clientY - canvas.offsetTop;
            const dx = mouseX - canvas.width / 2;
            const dy = mouseY - canvas.height / 2;
            rotateAngle = Math.atan2(dy, dx);
            drawImage();
        }
    });

    img.onerror = (err) => {
        console.error('Error loading the image: ', err);
      };
} 