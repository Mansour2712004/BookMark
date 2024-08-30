let siteName = document.getElementById('siteName');
let siteURL = document.getElementById('siteURL');
let alertName = document.getElementById('alertName')
let saveBookmark;
if (localStorage.getItem('bookMarkers') != null) {
    saveBookmark = JSON.parse(localStorage.getItem('bookMarkers'));
    displayData()
} else {
    saveBookmark = []
}

function add() {
    let bookMarkers = {
        name: siteName.value,
        url: siteURL.value
    }
    if (!validateForm()) {
        return false
    }
    saveBookmark.push(bookMarkers)
    localStorage.setItem("bookMarkers", JSON.stringify(saveBookmark))
    clear()
    displayData()
}

function displayData() {
    let showData = ''
    for (let i = 0; i < saveBookmark.length; i++) {
        showData += `
        <div class="my-3">
        <tr>
            <td class="text-white"> ${saveBookmark[i].name}</td>
            <td><button class=" btn btn-outline-primary" onclick="visit(${i})">Visit</button></td>
            <td><button class=" btn btn-outline-danger" onclick="deleteBookmark(${i})">Delete</button></td>
        </tr>
        </div> `
    }
    document.getElementById('tableData').innerHTML = showData
}

function clear() {
    siteName.value = ''
    siteURL.value = ''
}

function deleteBookmark(index) {
    if(confirm('Are you sure ?')){
    saveBookmark.splice(index, 1)
    localStorage.setItem("bookMarkers", JSON.stringify(saveBookmark))
    displayData()
    }
}

function visit(index) {
    window.open(saveBookmark[index].url)
}

function validateForm() {

    if (!siteName.value || !siteURL.value) {
        alert('plese fill the form')
        return false
    }

    let expression = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/

    let regex = new RegExp(expression)

    if (!siteURL.value.match(regex)) {

        siteURL.classList.add('is-invalid')
        siteURL.classList.remove('is-valid')
        alertName.classList.remove('d-none')
        return false
    } else {
        siteURL.classList.add('is-valid')
        siteURL.classList.remove('is-invalid')
        alertName.classList.add('d-none')
        return true
    }
}
siteURL.addEventListener('blur', validateForm)