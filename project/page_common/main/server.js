const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; // 서버 포트 설정
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, child } = require('firebase/database');
app.use(bodyParser.json());
//firebase realtime
const firebaseConfig = {
  apiKey: "AIzaSyB0Sq7soQOiM2K4QSYahqs4jQyvFQ-BxUM",
  authDomain: "kyunghee-web.firebaseapp.com",
  databaseURL: "https://kyunghee-web-default-rtdb.firebaseio.com",
  projectId: "kyunghee-web",
  storageBucket: "kyunghee-web.firebasestorage.app",
  messagingSenderId: "553380540916",
  appId: "1:553380540916:web:01a1e7643203434b8709a1",
  measurementId: "G-DGP06HYBEY"
};
const DB = initializeApp(firebaseConfig);
const db = getDatabase(DB);
app.use('/make', express.static(path.join(__dirname, 'make')))
app.use('/gallery', express.static(path.join(__dirname, 'select_booth', 'menu', 'gallery')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html')); // 현재 디렉토리에서 menu.html 제공
});
app.get('/booth', (req, res) => {
    res.sendFile(path.join(__dirname, 'select_booth', 'booth.html')); // 현재 디렉토리에서 menu.html 제공
});
app.get('/buy_/:num', (req, res) => {
    const num = req.params.num;
    res.sendFile(path.join(__dirname, 'select_booth', 'menu', `buy_${num}.html`));
});
app.get('/menu/:num', (req, res) => {
    const num = req.params.num;
    res.sendFile(path.join(__dirname, 'select_booth', 'menu', `menu${num}.html`))
});
app.get('/floor', (req, res) => {
    res.sendFile(path.join(__dirname, 'select_floor', 'select_floor.html')); // 현재 디렉토리에서 menu.html 제공
});
app.get('/map', (req, res) => {
    res.sendFile(path.join(__dirname, 'map', 'maps.html')); // 현재 디렉토리에서 menu.html 제공
});
app.get('/schedule', (req, res) => {
    res.sendFile(path.join(__dirname, 'schedule', 'party_schedule.html')); // 현재 디렉토리에서 menu.html 제공
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login_page', 'login.html')); // 현재 디렉토리에서 menu.html 제공
});
// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
app.post('/add-to-cart', async (req, res) => {
    const { totalPrice } = req.body;

    try {
        // Realtime Database에 총 가격 저장
        const newItemRef = ref(db, 'carts/' + Date.now()); // 고유 ID로 저장
        await set(newItemRef, { totalPrice });
        console.log(`총 가격: ${totalPrice}원 저장됨`);
        res.json({ message: '장바구니에 추가되었습니다.', totalPrice });
    } catch (error) {
        console.error("Error adding document: ", error);
        res.status(500).send("Error adding document");
    }
});
app.get('/cart', async (req, res) => {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, 'carts'));
        
        if (snapshot.exists()) {
            const items = snapshot.val();
            const total = Object.values(items).reduce((acc, item) => acc + item.totalPrice, 0);
            res.json({ items, total });
        } else {
            res.json({ items: {}, total: 0 });
        }
    } catch (error) {
        console.error("Error getting documents: ", error);
        res.status(500).send("Error getting documents");
    }
});
