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

const quantityElement = document.getElementById('quantity');
const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const addToCartButton = document.getElementById('addToCart');
const priceElement = document.getElementById('price');

let quantity = 1;
const price = parseInt(priceElement.textContent, 10);

increaseButton.addEventListener('click', () => {
    quantity++;
    updateUI();
});

decreaseButton.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        updateUI();
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        addToCartButton.addEventListener('click', () => {
            addtocart(user.uid);
        });  
    } else {
        alert("구매는 로그인 이후 가능합니다.")
        window.location.href="login.html"
    }
}); 

function updateUI() {
    quantityElement.textContent = quantity;
    addToCartButton.textContent = `${(price * quantity).toLocaleString()}원 담기`;
}

function addtocart(userId) {
    const item = document.getElementById('amuk');
    const menu = amuk.textContent;
    const userRef = ref(database, 'users/' + userId);
    get(child(userRef, 'money')).then((snapshot) => {
        if (snapshot.exists()) {
            const money = snapshot.val();
            const buycheck = money - price*quantity;
            if (buycheck >= 0) {
                // money가 충분할 때만 cart에 추가
                set(ref(database, 'users/' + userId + '/cartlist/' + menu), {
                    name: menu, // item.value로 수정
                    price: price,
                    quantity: quantity
                })
                .then(() => {
                    console.log("New item added to cartlist!");
                    alert(menu + "을/를 장바구니에 담았습니다.");
                    const cartRef = ref(database, 'users/' + userId + "/totalprice")
                    get(child(cartRef, 'carttotal')).then((snapshot) => {
                        if (snapshot.exists()) {
                            const carttotal = snapshot.val();
                            console.log(carttotal)
                            const totalprice = parseInt(carttotal, 10);
                            const currenttotal = totalprice + price*quantity;
                            set(ref(database, 'users/' + userId + '/'), {
                                carttotal: currenttotal
                            })
                        } else {
                            console.log("사용자 데이터 없음");
                        }
                    }).catch((error) => {
                        console.error("데이터 로드 실패:", error);
                    });
                    // window.location.href = "menu1.html";
                })
                .catch((error) => {
                    console.error("Error adding new item:", error);
                });
            } else {
                alert("잔액이 부족합니다.");
            }
        } else {
            console.log("사용자 데이터 없음");
        }
    }).catch((error) => {
        console.error("데이터 로드 실패:", error);
    });
}