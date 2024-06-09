export function initializeCanvas(canvas) {
    console.log('Initializing canvas...');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Default image url
    img.src = 'https://dl6pgk4f88hky.cloudfront.net/2021/06/untitled_design_21_.png';
    console.log('Image source set:', img.src);

    // Add an event listener that runs when the image has fully loaded
    img.onload = () => {
        console.log('Image loaded successfully.');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        console.log("Image drawn on canvas.");
    };

    img.onerror = (err) => {
        console.error('Error loading the image: ', err);
      };
} 