
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 4, // Default for large screens
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            // autoplay: {
            //     delay: 3000,
            //     disableOnInteraction: false,
            // },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1, // 1 slide for mobile
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2, // 2 slides for tablets
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4, // 4 slides for desktops
                    spaceBetween: 30,
                }
            }
        });
        
