import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
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
const currentmoney = document.getElementById('currentmoney');
const cart = document.getElementById('cart')
const totalprice = document.getElementById('cart-total')
onAuthStateChanged(auth, (user) => {
    if (user) {
        getcurrenttotal(user.uid, totalprice);
        getcurrentmoney(user.uid, currentmoney);
    } else {
        alert("구매는 로그인 이후 가능합니다.")
        window.location.href="login.html"
    }
});


function getcurrentmoney(userId, currentmoney) {
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
function getcurrenttotal(userId, totalprice) {
    const userRef = ref(database, 'users/' + userId + '/totalprice');
    get(child(userRef, 'carttotal')).then((snapshot) => {
        if (snapshot.exists()) {
            const cartItems = snapshot.val();
            totalprice.textContent = `${cartItems}원` 
            cart.addEventListener ('click', () => {
                window.location.href="cart.html"
            });
        } else {
            console.log("사용자 데이터 없음");
        }
    }).catch((error) => {
        console.error("데이터 로드 실패:", error);
    });
}
