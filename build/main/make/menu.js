function gobuy(number) {
    // 숫자를 이용하여 URL 생성
    const url = `buy_${number}.html`;
    // 해당 URL로 이동
    window.location.href = url;
}