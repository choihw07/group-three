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

    // Firebase 앱 초기화
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);

    // 이메일 유효성 검사 함수
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // 회원가입 함수
    window.signUp = function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;

        // 이메일 유효성 검사
        if (!validateEmail(email)) {
            alert("유효한 이메일을 쓰세요.");
            return; // 유효하지 않은 경우 함수 종료
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // 회원가입 성공
                const user = userCredential.user;
                console.log("회원가입 성공:", user);
                alert("회원가입이 완료되었습니다.");

                // 사용자 정보를 Realtime Database에 저장
                saveUserData(user.uid, username, email);
                return signInWithEmailAndPassword(auth, email, password);
            })
            .then((userCredential) => {
                // 로그인 성공
                console.log("로그인 성공:", userCredential.user);
                alert("로그인이 완료되었습니다.");
                // 로그인 후 로그인 페이지로 리다이렉트
                window.location.href = "/login";
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
    };

    // 사용자 정보를 Realtime Database에 저장
    function saveUserData(userId, username, email) {
        set(ref(database, 'users/' + userId), {
            username: username,
            email: email,
            createdAt: new Date().toISOString(),
            carttotal: 0,
            money: 0,
            cartlist: name
        })
        .then(() => {
            console.log("사용자 정보 저장 성공");
        })
        .catch((error) => {
            console.error("사용자 정보 저장 실패:", error);
        });
    }

    // 로그인 함수
    window.login = function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // 로그인 성공
                const user = userCredential.user;
                console.log("로그인 성공:", user);
                alert("로그인이 완료되었습니다.");
                // 로그인 후 장바구니 금액 로드
                displayName();
                window.location.href="/"
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
    };
    // 로그아웃 함수
    window.logout = function() {
        signOut(auth).then(() => {
            console.log("로그아웃 성공");
            alert("로그아웃되었습니다.");
            location.reload(); // 페이지 새로 고침
        }).catch((error) => {
            console.error("로그아웃 실패:", error);
        });
    };
    function displayName() {
        const userId = auth.currentUser.uid; // 현재 로그인한 사용자 ID
        const userRef = ref(database, 'users/' + userId);
        get(child(userRef, 'username')).then((snapshot) => {
            if (snapshot.exists()) {
                const username = snapshot.val();
                const userInfoDiv = document.getElementById('user-info');
                userInfoDiv.textContent = `${username}님`; // 사용자 이름 표시
                userInfoDiv.classList.remove('hidden'); // 요소를 보이도록 설정
            } else {
                console.log("사용자 데이터 없음");
            }
        }).catch((error) => {
            console.error("데이터 로드 실패:", error);
        });

    }
