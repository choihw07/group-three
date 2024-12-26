import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {getDatabase, ref, get, child} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBzEjwURyiDcmWrM_vdqANVN9WxJQr6d08",
    authDomain: "khsparty.firebaseapp.com",
    databaseURL: "https://khsparty-default-rtdb.firebaseio.com",
    projectId: "khsparty",
    storageBucket: "khsparty.firebasestorage.app",
    messagingSenderId: "658831845381",
    appId: "1:658831845381:web:7176c6d631807e5b5ed46c",
    measurementId: "G-NCE5618PZY"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// 메뉴 버튼 클릭 이벤트
document.getElementById('menuButton').addEventListener('click', () => {
   const menu = document.getElementById('menu');
   menu.classList.toggle('hidden');
});

// 로그인 상태 확인 및 사용자 정보 가져오기
onAuthStateChanged(auth, (user) => {
    const authButton = document.getElementById('auth-button');
    const userInfoDiv = document.getElementById('user-info');
    const currentmoney = document.getElementById('currentmoney');
    if (user) {
        // 사용자가 로그인한 상태
        authButton.textContent = '로그아웃';

        // 사용자 정보 가져오기
        getUserInfo(user.uid, userInfoDiv); 
        getusermoney(user.uid, currentmoney);

        authButton.addEventListener('click', () => {
            // 로그아웃 확인
            const confirmLogout = confirm('정말 로그아웃하시겠습니까?');
            if (confirmLogout) {
                auth.signOut().then(() => {
                    alert('로그아웃되었습니다.');
                    window.location.href = 'login.html'; // 로그인 페이지로 이동
                }).catch((error) => {
                    console.error('로그아웃 실패:', error);
                });
            }
        });
    } else {
        // 사용자가 로그인하지 않은 상태
        authButton.textContent = '로그인';
        authButton.addEventListener('click', () => {
            alert('로그인 페이지로 이동합니다.');
            window.location.href = "login.html"; // 로그인 페이지로 이동
        });
    }
});

// 사용자 정보를 가져오는 함수
function getUserInfo(userId, userInfoDiv) {
    const userRef = ref(database, 'users/' + userId);
    get(child(userRef, 'username')).then((snapshot) => {
        if (snapshot.exists()) {
            const username = snapshot.val();
            userInfoDiv.textContent = `${username}님`;
            userInfoDiv.classList.remove('hidden'); // 사용자 정보 표시
        } else {
            console.log("사용자 데이터 없음");
        }
    }).catch((error) => {
        console.error("데이터 로드 실패:", error);
    });
}

// 페이지 로드 시 버튼 및 사용자 정보 설정
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button[data-url]");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const url = button.getAttribute("data-url");
            if (url) {
                window.location.href = url; // URL로 이동
            }
        });
    });
});
function getusermoney(userId, currentmoney) {
    const userRef = ref(database, 'users/' + userId);
    get(child(userRef, 'money')).then((snapshot) => {
        if (snapshot.exists()) {
            const money = snapshot.val();
            currentmoney.textContent =`잔액: ${money}원`
        } else {
            console.log("사용자 데이터 없음");
        }
    }).catch((error) => {
        console.error("데이터 로드 실패:", error);
    });
}