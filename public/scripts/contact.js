document.querySelectorAll('.contact-item').forEach(item => {  
    item.addEventListener('mouseenter', () => {  
        const icon = item.querySelector('i');  
        icon.style.transform = 'scale(1.2)';  
        icon.style.transition = 'transform 0.3s ease';  
    });  

    item.addEventListener('mouseleave', () => {  
        const icon = item.querySelector('i');  
        icon.style.transform = 'scale(1)';  
    });  
});