document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "./images/drink.jpg",
        "./images/food.jpg",
        "./images/food2.jpg",
        "./images/drink2.jpg"
    ];

    const videos = [
        { src: "./videos/Day1.mp4", title: "Good Day 1" },
        { src: "./videos/Day2.mp4", title: "Good Day 2" },
        { src: "./videos/Day1.mp4", title: "Good Day 3" },
        { src: "./videos/Day2.mp4", title: "Good Day 4" }
    ];

    const imageCarousel = document.getElementById("imageCarousel");
    const videoList = document.getElementById("videoList");
    const mainVideo = document.getElementById("mainVideo");

    // Render Images
    images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "carousel image";
        imageCarousel.appendChild(img);
    });

    // Render Videos
    videos.forEach(video => {
        const item = document.createElement("div");
        item.classList.add("video-item");
        item.innerHTML = `
            <div class="videoContent">
                <div class="smallContents">
                    <video src="${video.src}" style="width: 100px;"></video>
                    <i class="fa-solid fa-circle-play"></i>
                </div>
                <div class="video-title">${video.title}</div>
            </div>
            <div class="video-time"></div>
        `;
        videoList.appendChild(item);
    });

    // Main Video Autoplay
    mainVideo.src = videos[0].src;
    mainVideo.autoplay = true;
    mainVideo.load();

    // Click to change main video
    videoList.addEventListener("click", (e) => {
        const target = e.target.closest(".video-item");
        if (!target) return;
        const video = target.querySelector("video");
        mainVideo.src = video.src;
        mainVideo.play();
    });

    // Video durations
    const updateDurations = () => {
        document.querySelectorAll(".video-item").forEach(item => {
            const video = item.querySelector("video");
            const timeDisplay = item.querySelector(".video-time");
            video.addEventListener("loadedmetadata", () => {
                const duration = video.duration;
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
                timeDisplay.textContent = `${minutes}:${seconds}`;
            });
        });
    };
    updateDurations();

    // Video Count
    document.querySelector('.videoNumbers .number').textContent = videos.length;

    // Toggle dropdown
    const dropdownToggle = document.querySelector('.dropDownIcon');
    dropdownToggle.addEventListener('click', () => {
        videoList.classList.toggle('closed');
        dropdownToggle.classList.toggle('rotate');
    });

    // Carousel Slide
    const clouserImages = document.querySelectorAll(".clouser-img img");
    let currentStartIndex = 0;
    function showTwoImages() {
        clouserImages.forEach((img, i) => {
            img.style.display = (i === currentStartIndex || i === (currentStartIndex + 1) % clouserImages.length) ? "block" : "none";
        });
        currentStartIndex = (currentStartIndex + 2) % clouserImages.length;
    }
    showTwoImages();
    setInterval(showTwoImages, 2000);
});
//adding new images or vide by doing this : 
//images.push("./images/new.jpg");
//videos.push({ src: "./videos/new.mp4", title: "New Video" });

