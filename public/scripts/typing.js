class TypeWriter {  
    constructor(txtElement, words, wait = 3000) {  
        this.container = txtElement.parentElement;  
        this.words = words;  
        this.wait = parseInt(wait, 10);  
        this.currentLine = 0;  
        this.currentText = '';  
        this.init();  
    }  

    init() {  
        // 기존 내용 초기화  
        this.container.innerHTML = '';  
        this.currentLine = 0;  
        this.currentText = '';  
        this.lineElements = [];  
        this.createLines();  
        this.type();  
    }  

    createLines() {  
        this.words.forEach(() => {  
            const line = document.createElement('div');  
            line.className = 'typing-text';  
            this.container.appendChild(line);  
            this.lineElements.push(line);  
        });  
    }  

    type() {  
        if (this.currentLine >= this.words.length) return;  

        const currentWord = this.words[this.currentLine];  
        const currentElement = this.lineElements[this.currentLine];  

        if (this.currentText.length < currentWord.length) {  
            // 현재 줄 타이핑 진행  
            this.currentText = currentWord.substring(0, this.currentText.length + 1);  
            currentElement.innerHTML = `<span class="txt">${this.currentText}</span>`;  
            setTimeout(() => this.type(), 100); // 타이핑 속도를 좀 더 빠르게 조정  
        } else {  
            // 현재 줄 완성  
            currentElement.innerHTML = currentWord; // 커서 제거  
            this.currentLine++;  
            this.currentText = '';  
            
            if (this.currentLine < this.words.length) {  
                setTimeout(() => this.type(), 500); // 다음 줄로 넘어가는 딜레이  
            }  
        }  
    }  

    restart() {  
        this.init();  
    }  
}  

// Intersection Observer 설정  
const observer = new IntersectionObserver((entries) => {  
    entries.forEach(entry => {  
        if (entry.isIntersecting) {  
            const txtElement = document.querySelector('.text-content .typing-text');  
            if (txtElement && window.typeWriter) {  
                window.typeWriter.restart();  
            }  
        }  
    });  
}, { threshold: 0.5 });  

// DOM 로드 시 실행  
document.addEventListener('DOMContentLoaded', () => {  
    const txtElement = document.querySelector('.text-content .typing-text');  
    if (!txtElement) return;  

    const words = txtElement.getAttribute('data-typing-text').split(',').map(word => word.trim());  
    const wait = txtElement.getAttribute('data-wait') || 3000;  

    // TypeWriter 인스턴스 생성 및 전역 변수로 저장  
    window.typeWriter = new TypeWriter(txtElement, words, wait);  

    // 홈 섹션 관찰 시작  
    const homeSection = document.querySelector('#home');  
    if (homeSection) {  
        observer.observe(homeSection);  
    }  
});