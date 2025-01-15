// public/scripts/typing.js  
class TypeWriter {  
    constructor(txtElement, words, wait = 3000) {  
        this.txtElement = txtElement;  
        this.words = words;  
        this.txt = '';  
        this.wordIndex = 0;  
        this.wait = parseInt(wait, 10);  
        this.type();  
        this.isDeleting = false;  
    }  

    type() {  
        // 현재 단어 인덱스  
        const current = this.wordIndex % this.words.length;  
        // 현재 단어의 전체 텍스트  
        const fullTxt = this.words[current];  

        // 삭제 중인지 체크  
        if(this.isDeleting) {  
            // 글자 삭제  
            this.txt = fullTxt.substring(0, this.txt.length - 1);  
        } else {  
            // 글자 추가  
            this.txt = fullTxt.substring(0, this.txt.length + 1);  
        }  

        // 텍스트 요소에 삽입  
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;  

        // 타이핑 속도  
        let typeSpeed = 200;  

        if(this.isDeleting) {  
            typeSpeed /= 2;  
        }  

        // 단어가 완성되었는지 체크  
        if(!this.isDeleting && this.txt === fullTxt) {  
            // 단어 완성 후 잠시 멈춤  
            typeSpeed = this.wait;  
            this.isDeleting = true;  
        } else if(this.isDeleting && this.txt === '') {  
            this.isDeleting = false;  
            this.wordIndex++;  
            // 다음 단어 입력 전 잠시 멈춤  
            typeSpeed = 500;  
        }  

        setTimeout(() => this.type(), typeSpeed);  
    }  
}  

// DOM 로드 시 실행  
document.addEventListener('DOMContentLoaded', init);  

function init() {  
    const txtElement = document.querySelector('.typing-text');  
    const words = txtElement.getAttribute('data-typing-text').split(',');  
    const wait = txtElement.getAttribute('data-wait') || 3000;  

    // TypeWriter 인스턴스 생성  
    new TypeWriter(txtElement, words, wait);  
}