// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase 초기화
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

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// DOMContentLoaded 이벤트를 사용하여 DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 카카오 SDK 초기화
    Kakao.init('bb9bbcd2a029c6254a9089d8fe912a0e'); // 애플리케이션 키

    document.getElementById('kakao-login').onclick = function() {
        Kakao.Auth.login({
            success: function(authObj) {
                console.log(authObj);
                getUserInfo(); // 로그인 성공 후 사용자 정보 요청
            },
            fail: function(err) {
                console.error(err);
            }
        });
    };
});

function getUserInfo() {
    Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
            const username = res.properties.nickname; // 닉네임
            const email = res.kakao_account.email; // 이메일
            const kakaoId = res.id; // 카카오 ID를 비밀번호로 사용

            // 사용자 정보를 Firebase Authentication에 저장하는 함수 호출
            createUser(email, username, kakaoId);
        },
        fail: function(err) {
            console.error(err);
        }
    });
}
function createUser(email, username, kakaoId) {

    createUserWithEmailAndPassword(auth, email, kakaoId)
        .then((userCredential) => {
            // 회원가입 성공
            const user = userCredential.user;
            console.log("회원가입 성공:", user);
            alert("회원가입이 완료되었습니다.");

            // 사용자 정보를 Realtime Database에 저장
            saveUserData(user.uid, username, email);
            window.location.href="login.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use') {
                alert("이미 회원가입된 이메일입니다.");
            } else {
                console.error("회원가입 실패:", errorMessage);
                alert(errorMessage);
            }
            location.reload(); // 오류 발생 시 새로 고침
        });

    }
    function saveUserData(userId, username, email) {
                set(ref(database, 'users/' + userId), {
                    username: username,
                    email: email,
                    createdAt: new Date().toISOString(),
                    cartTotal: 0 // 초기 장바구니 금액
                })
                .then(() => {
                    console.log("사용자 정보 저장 성공");
                })
                .catch((error) => {
                    console.error("사용자 정보 저장 실패:", error);
                });
            }
