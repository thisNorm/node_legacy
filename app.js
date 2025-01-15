const express = require('express');  
const ejs = require('ejs');  
const bodyParser = require('body-parser');  
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();  

const app = express();  
const port = 3000;  

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  

// EJS 설정  
app.set('view engine', 'ejs');  
app.set('views', './views');  

// 정적 파일(public 폴더) 서빙  
app.use(express.static('public'));  


// body-parser  
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  

// MySQL Pool  
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
        return console.error('MySQL 연결 실패: ', err);  
    }  
    console.log('MySQL 연결 성공');  
    conn.release();  
});  

// 미들웨어로 모든 요청에 currentPage 변수 추가  
app.use((req, res, next) => {  
    res.locals.currentPage = req.path.substring(1) || 'home';  
    next();  
});  

// 메인 페이지  
app.get('/', function(req, res) {  
    res.render('index', {  
        title: '홈',  
        pageDescription: '환영합니다!'  
    });  
});  

// 섹션별 라우트 추가  
app.get('/sections/profile', function(req, res) {  
    res.render('profile', {  
        title: '프로필',  
        pageDescription: '프로필 정보입니다.',  
        layout: false  // 레이아웃 없이 섹션 내용만 반환  
    });  
});  

app.get('/sections/blog', function(req, res) {  
    const posts = [  
        { title: '첫 번째 포스트', content: '내용...' },  
        { title: '두 번째 포스트', content: '내용...' }  
    ];  
    
    res.render('blog', {  
        title: '블로그',  
        pageDescription: '블로그 게시글 목록입니다.',  
        posts: posts,  
        layout: false  
    });  
});  

app.get('/sections/visit', function(req, res) {  
    res.render('visit', {  
        title: '찾아오시는 길',  
        pageDescription: '위치 안내입니다.',  
        address: '주소 정보...',  
        mapInfo: {  
            latitude: 37.123456,  
            longitude: 127.123456  
        },  
        layout: false  
    });  
});  

app.get('/sections/contact', function(req, res) {  
    res.render('contact', {  
        title: '문의하기',  
        pageDescription: '문의 방법 안내',  
        contactInfo: {  
            email: 'example@email.com',  
            phone: '02-1234-5678',  
            kakao: 'kakao_id',  
            address: '서울시 ...'  
        },  
        layout: false  
    });  
});   

// 404 에러 처리  
app.use((req, res, next) => {  
    res.status(404).render('404', {  
        title: '페이지를 찾을 수 없습니다',  
        currentPage: '404'  
    });  
});  

// 500 에러 처리  
app.use((err, req, res, next) => {  
    console.error(err.stack);  
    res.status(500).render('500', {  
        title: '서버 오류',  
        currentPage: '500'  
    });  
});  


// 서버 구동  
app.listen(port, () => {  
    console.log(`Server running on http://localhost:${port}`);  
});