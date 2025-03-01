window.onload = function () {
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        document.body.innerHTML = '<div class="mob-text">Available on PC only</div>';
    }
};

document.addEventListener('mousemove', (event) => {
    const cursorImage = document.getElementById('cursor-image');
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    cursorImage.style.left = `${mouseX}px`;
    cursorImage.style.top = `${mouseY}px`;
});

document.addEventListener("DOMContentLoaded", () => {
    const wordImageMap = {
        "Vision Pro": "visionpro.png",
        "Baby": "baby.png",
        "Coriander": "coriander.png",
        "DJ Controller": "djcontroller.png",
        "Kimbap": "kimbap.png",
        "Pigeon": "pigeon.png",
        "Soap": "soap.png",
        "Xbox": "xbox.png",
        "Coconut": "coconut.png",
        "Library": "library.png",
        "Virus": "virus.png",
        "Beer": "beer.png",
        "Tooth": "tooth.png",
        "Girlfriend": "girlfriend.png",
        "Gum": "gum.png",
        "Cockroach": "cockroach.png",
        "Rainbow": "rainbow.png",
        "Backpack": "backpack.png",  
        "Jellyfish": "jellyfish.png",  
        "Skateboard": "skateboard.png",  
        "Volcano": "volcano.png",  
        "Sushi": "sushi.png",  
        "Yo-yo": "yoyo.png",  
        "Overcooked Rice": "overcookedrice.png",  
    };

    const words = Object.keys(wordImageMap);
    const titleElement = document.querySelector(".title p");
    const footElement = document.querySelector(".foot p");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let img = new Image();
    let currentX = 0;
    let sliceWidth = 1;
    let imageWidth, imageHeight;
    let animationFrameId;

    function adjustCanvasSize() {
        const container = document.querySelector(".container");
        const rect = container.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    function drawInitialImage() {
        img.src = `main.png`;  
        
        img.onload = () => {
            imageWidth = img.width;
            imageHeight = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
        };
    }

    function updateCanvasWithImage(imageFileName) {
        img.src = `img/${imageFileName}`;
        
        img.onload = () => {
            imageWidth = img.width;
            imageHeight = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            currentX = 0;
        };
    }

    function drawImageSlices() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, currentX, 0, sliceWidth, imageHeight, 0, 0, canvas.width, canvas.height);

        currentX += sliceWidth;
        if (currentX >= imageWidth) {
            currentX = 0;
        }
        
        animationFrameId = requestAnimationFrame(drawImageSlices);
    }

    footElement.addEventListener("click", () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        titleElement.textContent = `${randomWord} as hits`;

        const imageFileName = wordImageMap[randomWord];
        updateCanvasWithImage(imageFileName);

        cancelAnimationFrame(animationFrameId);
        drawImageSlices();
    });

    window.addEventListener("load", () => {
        adjustCanvasSize();
        drawInitialImage();
    });
    window.addEventListener("resize", adjustCanvasSize);
});

// 스탬프

document.addEventListener("DOMContentLoaded", () => {
    const triggerImage = document.getElementById("trigger-image");
    let stampImage = null;

    triggerImage.addEventListener("click", () => {
        if (stampImage) {
            stampImage.remove();
            stampImage = null;
        } else {
            stampImage = document.createElement("img");
            stampImage.src = "stamp.png"; 
            stampImage.classList.add("stamp-image");

            stampImage.onload = () => {
                stampImage.style.position = "absolute";
                stampImage.style.top = "50%";
                stampImage.style.left = "50%";
                stampImage.style.transform = "translate(-50%, -50%)";
                stampImage.style.width = "60vw";
                stampImage.style.height = "auto";
                stampImage.style.pointerEvents = "none";
                stampImage.style.display = "block"; 

                document.body.appendChild(stampImage);
            };
        }
    });
});
