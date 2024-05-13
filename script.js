let likeCounts = {
    product1: 0,
    product2: 0,
    product3: 0,
    product4: 0,
    product5: 0,
    product6: 0
};

function toggleLike(productId) {
    likeCounts[productId]++;
    document.getElementById('like-count-' + productId).innerText = likeCounts[productId];
}