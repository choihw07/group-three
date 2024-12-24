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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function login(email, password) {
   auth.signInWithEmailAndPassword(email, password)
       .then((userCredential) => {
           console.log("로그인 성공:", userCredential.user);
           fetchCartStatus(); // 로그인 후 장바구니 상태 조회
       })
       .catch((error) => {
           console.error("로그인 실패:", error);
       });
   }
function logout() {
   auth.signOut().then(() => {
       console.log("로그아웃 성공");
       document.getElementById('cart-total').textContent = '0원'; // 장바구니 초기화
   }).catch((error) => {
       console.error("로그아웃 실패:", error);
   });
    }
