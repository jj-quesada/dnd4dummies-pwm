function loadTemplate(fileName, id, num = 1) {
    fetch(fileName).then((res) => {
        return res.text();

    }).then((text) => {
        for (let i = 0; i < num; i++) {
            document.querySelector(id).innerHTML += text;
        }

    })
}

function fetchHeadAndTail() {
    loadTemplate('/src/templates/header.html', ".header");
    loadTemplate('/src/templates/footer.html', ".footer");

}
