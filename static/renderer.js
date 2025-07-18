const accountList = document.getElementById('account-list');
const webviewContainer = document.getElementById('webview-container');
const addAccountBtn = document.getElementById('add-account-btn');


let accounts = [];
let activeAccountId = null;


const sidebar = document.querySelector('.sidebar');
const storageKey = 'profile';
let load = JSON.parse(localStorage.getItem(storageKey)) || false;

function updateDisplay(active) {
    sidebar.style.display = active ? "flex" : "none";
}
updateDisplay(load);
function toggleProfile() {
    const now = JSON.parse(localStorage.getItem(storageKey)) || false;
    const news = !now;
    console.log("Status lama:", now, "-> Status baru:", news);
    localStorage.setItem(storageKey, JSON.stringify(news));
    updateDisplay(news);
}

function privacy_chats(){
   const private = (localStorage.getItem('privacy') == "chats") ? "" : "chats"
    localStorage.setItem('privacy',private)
    window.location.reload()
}
function privacy_all(){
   const private = (localStorage.getItem('privacy') == "all") ? "" : "all"
    localStorage.setItem('privacy',private)
    window.location.reload()

}


function actionTogle() {
    const action = document.querySelector('#actionbtn')
    if (action.style.display == "none") {
        action.style.display = 'flex'
    } else {
        action.style.display = 'none'
    }
}

function minimize() {
    window.api.minimize()
}
function maximize() {
    window.api.maximize()
}

function closeWindow() {
    window.api.close();
}
function developermode() {
    alert("ctl + shift + i\nKetik sendiri bisa kan?")
    window.api.toggleDevTools();
}

function about() {
    alert('Develop by: Yohanes Oktanio\nGithub : yohanesokta')
}


function renderUI() {

    const mainButton = document.querySelectorAll('#btnMain')
    const privacy = localStorage.getItem('privacy')
    accountList.innerHTML = '';
    webviewContainer.innerHTML = '';


    if (accounts.length === 0) {
        webviewContainer.innerHTML = '<div style="text-align:center; padding: 40px; font-size: 18px;">Tidak ada akun. Klik tombol + untuk menambahkan.</div>';
        return;
    }


    accounts.forEach(account => {
        const accountId = account.id;


        const accountTab = document.createElement('div');
        accountTab.className = 'account-tab';
        accountTab.innerText = accounts.findIndex(a => a.id === accountId) + 1;
        accountTab.setAttribute('data-id', accountId);
        accountTab.onclick = () => switchAccount(accountId);


        const deleteBtn = document.createElement('div');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.setAttribute('data-id', accountId);
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteAccount(accountId);
        };

        accountTab.appendChild(deleteBtn);
        accountList.appendChild(accountTab);


        const webview = document.createElement('webview');
        webview.setAttribute('data-id', accountId);
        webview.setAttribute('partition', `persist:whatsapp-account-${accountId}`);
        webview.setAttribute('src', 'https://web.whatsapp.com')
        webview.setAttribute('useragent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36');
        if (privacy == "all"){
            document.getElementById('privacy_all').style.color = 'green'

          webview.setAttribute('preload', 'webview_preloader.all.js');
        } else if (privacy == "chats") {
            document.getElementById('privacy_chats').style.color = 'green'

          webview.setAttribute('preload', 'webview_preloader.chats.js');

        }
        webview.classList.add('hidden');
        webviewContainer.appendChild(webview);

    });


    if (activeAccountId === null || !accounts.find(acc => acc.id === activeAccountId)) {
        activeAccountId = accounts.length > 0 ? accounts[0].id : null;
    }

    if (activeAccountId !== null) {
        switchAccount(activeAccountId);
    }
}






function switchAccount(accountId) {
    activeAccountId = accountId;

    document.querySelectorAll('.account-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('webview').forEach(wv => wv.classList.add('hidden'));

    const activeTab = document.querySelector(`.account-tab[data-id='${accountId}']`);
    const activeWebview = document.querySelector(`webview[data-id='${accountId}']`);

    if (activeTab) activeTab.classList.add('active');
    if (activeWebview) activeWebview.classList.remove('hidden');
}

function addAccount() {

    const newId = accounts.length > 0 ? Math.max(...accounts.map(acc => acc.id)) + 1 : 0;
    accounts.push({ id: newId });
    saveAccounts();
    renderUI();
    switchAccount(newId);
}

function deleteAccount(accountIdToDelete) {
    const accountIndex = accounts.findIndex(a => a.id === accountIdToDelete) + 1;

    if (confirm(`Anda yakin ingin menghapus Akun ${accountIndex}? Sesi login akan hilang.`)) {

        accounts = accounts.filter(account => account.id !== accountIdToDelete);
        saveAccounts();


        if (activeAccountId === accountIdToDelete) {
            activeAccountId = null;
        }

        renderUI();




        console.log(`Partisi untuk akun ID ${accountIdToDelete} telah ditinggalkan.`);
    }
}






function saveAccounts() {
    localStorage.setItem('whatsapp-accounts', JSON.stringify(accounts));
}

function loadAccounts() {
    const savedAccounts = localStorage.getItem('whatsapp-accounts');
    if (savedAccounts) {
        accounts = JSON.parse(savedAccounts);
    }


    if (accounts.length === 0) {
        addAccount();
    } else {
        renderUI();
    }
}


addAccountBtn.addEventListener('click', addAccount);


loadAccounts();