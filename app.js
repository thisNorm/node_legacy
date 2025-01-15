const express = require('express');  
const ejs = require('ejs');  
const bodyParser = require('body-parser');  
const mysql = require('mysql2');  
const path = require('path');  
const router = express.Router();  
require('dotenv').config();  

const app = express();  
const port = 3000;  

// 미들웨어 설정  
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  

// EJS 설정  
app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views'));  

// 정적 파일 제공 설정 (한 번만 설정)  
app.use(express.static(path.join(__dirname, 'public')));  

// MySQL Pool 설정  
const connectionPool = mysql.createPool({  
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,  
    password: process.env.DB_PW,  
    port: process.env.DB_PORT,  
    database: process.env.DB_NAME,  
    connectionLimit: 10,  
    insecureAuth: true,  
});  

// MySQL 연결 확인  
connectionPool.getConnection((err, conn) => {  
    if (err) {  
        console.error('MySQL 연결 실패: ', err);  
        return;  
    }  
    console.log('MySQL 연결 성공');  
    conn.release();  
});  

// 현재 페이지 미들웨어  
app.use((req, res, next) => {  
    res.locals.currentPage = req.path.substring(1) || 'home';  
    next();  
});  

// 메인 페이지 라우트  
app.get('/', (req, res) => {  
    res.render('index', {  
        title: '홈',  
        pageDescription: '환영합니다!'  
    });  
});  

// 섹션 라우트들  
app.get('/sections/profile', (req, res) => {  
    try {  
        res.render('profile', {  
            title: '프로필',  
            pageDescription: '프로필 정보입니다.',  
            layout: false  
        });  
    } catch (error) {  
        console.error('Profile rendering error:', error);  
        res.status(500).send('프로필 섹션을 불러오는 중 오류가 발생했습니다.');  
    }  
});  

app.get('/sections/blog', (req, res) => {  
    try {  
        const blogData = {  
            blogs: [  
                {  
                    type: '네이버 블로그',  
                    image: '/images/naver.png',  
                    description: '개발 일지와 기술 블로그',  
                    url: '[네이버블로그주소]'  
                },  
                {  
                    type: '티스토리',  
                    image: '/images/tistory.png',  
                    description: '기술 문서 및 프로젝트 기록',  
                    url: '[티스토리주소]'  
                },  
                {  
                    type: 'Notion',  
                    image: '/images/notion.png',  
                    description: '학습 기록 및 지식 베이스',  
                    url: '[Notion주소]'  
                }  
            ]  
        };  

        res.render('blog', {  // blog.ejs가 views 폴더 직접 아래에 있으므로 경로 수정  
            title: '블로그',  
            pageDescription: '블로그 플랫폼 목록입니다.',  
            blogs: blogData.blogs,  
            layout: false  
        });  
    } catch (error) {  
        console.error('Blog rendering error:', error);  
        res.status(500).send('블로그 섹션을 불러오는 중 오류가 발생했습니다.');  
    }  
});  

app.get('/sections/stack', (req, res) => {  
    try {  
        res.render('stack', {  
            title: '기술 스택',  
            pageDescription: '사용 가능한 기술 스택입니다.',  
            layout: false  
        });  
    } catch (error) {  
        console.error('Stack rendering error:', error);  
        res.status(500).send('스택 섹션을 불러오는 중 오류가 발생했습니다.');  
    }  
});  

// contact 정보 객체 정의  
const contactInfo = {  
    naver: {  
        email: "hbm7802@naver.com",  
        link: "mailto:hbm7802@naver.com"  
    },  
    google: {  
        email: "kisook2557@gmail.com",  
        link: "mailto:kisook2557@gmail.com"  
    },  
    phone: {  
        number: "010-2264-2557",  
        link: "tel:010-2264-2557"  
    },  
    kakao: {  
        id: "hbm2557",  
        link: "https://open.kakao.com/o/[your-kakao-open-chat-id]" // 카카오톡 오픈채팅 링크로 수정 필요  
    },  
    address: {  
        text: "인천광역시 남구 학익동 하나2차",  
        link: "https://map.naver.com/p/search/%EC%9D%B8%EC%B2%9C%20%EB%82%A8%EA%B5%AC%20%ED%95%99%EC%9D%B5%EB%8F%99%20%ED%95%98%EB%82%982%EC%B0%A8/place/16598606?c=15.00,0,0,0,dh&placePath=%3Fentry%253Dbmp"  
    },  
    github: {  
        username: "thisNorm",  
        link: "https://github.com/thisNorm"  
    }  
}; 

// 메인 페이지 라우트 수정  
app.get('/', (req, res) => {  
    res.render('index', {  
        title: '홈',  
        pageDescription: '환영합니다!',  
        contactInfo: contactInfo  // contactInfo 추가  
    });  
});  

// contact 섹션 라우트 추가  
app.get('/sections/contact', (req, res) => {  
    try {  
        res.render('contact', {  
            title: '연락처',  
            pageDescription: '연락처 정보입니다.',  
            contactInfo: contactInfo,  
            layout: false  
        });  
    } catch (error) {  
        console.error('Contact rendering error:', error);  
        res.status(500).send('연락처 섹션을 불러오는 중 오류가 발생했습니다.');  
    }  
}); 

// 모달 라우트  
app.get('/partials/modals/:modalType', (req, res) => {  
    try {  
        const modalType = req.params.modalType;  
        res.render(`partials/modals/${modalType}`, { layout: false });  
    } catch (error) {  
        console.error('Modal rendering error:', error);  
        res.status(500).send('모달을 불러오는 중 오류가 발생했습니다.');  
    }  
});  

// 404 에러 핸들러  
app.use((req, res, next) => {  
    res.status(404).render('404', {  
        title: '페이지를 찾을 수 없습니다',  
        currentPage: '404'  
    });  
});  

// 500 에러 핸들러  
app.use((err, req, res, next) => {  
    console.error('Server Error:', err.stack);  
    res.status(500).render('500', {  
        title: '서버 오류',  
        currentPage: '500'  
    });  
});  

// 서버 시작  
app.listen(port, () => {  
    console.log(`Server running on http://localhost:${port}`);  
});