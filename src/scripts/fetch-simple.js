function loadTemplate(fileName, id) {
    fetch(fileName).then((res) => {
        return res.text();

    }).then((text) => {
        document.querySelector(id).innerHTML = text;
        //console.log(text)

    })
}

function fetchHeadAndTail() {
    loadTemplate('/src/templates/header.html', ".header");
    loadTemplate('/src/templates/footer.html', ".footer");
}
