
const urlWorks = 'http://localhost:5678/api/works';
const urlCategories = 'http://localhost:5678/api/categories';
const urlUsersLogin = 'http://localhost:5678/api/users/login';




// Affichage de tous les projets dans la galerie //
function displayWorks(data) {
    document.querySelector(".gallery").innerHTML = "";
    for (const work of data) {
        const worksGallery = document.querySelector(".gallery");
        const workElement = document.createElement("figure");
        workElement.dataset.id = work.categoryId;
        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;
        workImage.alt = work.title;
        const workDetail = document.createElement("figcaption")
        workDetail.innerText = work.title;
        // rattachement des balises aux DOM
        worksGallery.appendChild(workElement);
        workElement.appendChild(workImage);
        workElement.appendChild(workDetail);
    }
}
// Appel de l'API http://localhost:5678/api/works
fetch(urlWorks)
.then((response) => response.json())
.then((data) => displayWorks(data))
.catch((error) => {console.log(`Une erreur est survenue : ${error.message}`)})




// création des buttons de filtres des projets
function createFiltersButtons(datas) {
    const containerFilterWorks = document.querySelector("#portfolio .categories");
    const categoryButtonSelected = document.createElement("button");
    categoryButtonSelected.className = `filter-btn category-btn-selected`;
    categoryButtonSelected.textContent = "Tous";
    categoryButtonSelected.dataset.id = 0;
    containerFilterWorks.appendChild(categoryButtonSelected);
    for (const category of datas) {
        const categoryButton = document.createElement("button");
        categoryButton.className = `filter-btn`;
        categoryButton.textContent = category.name;
        categoryButton.dataset.id = category.id
        containerFilterWorks.appendChild(categoryButton);
    };

}



// Ajout des eventListeners sur les boutons


function filtersWorks (works) {
    const filterContainer = document.querySelectorAll(".categories button");
    for (let i = 0; i < filterContainer.length; i++) {
        const filterButton = document.querySelector(`.categories button:nth-child(${i+1})`);
        // ajout d'eventListener pour chacun des boutons
        filterButton.addEventListener("click", () => {
            
            //activer ou désactiver les boutons de filtre
            let filterButtonSelect = document.querySelector(".category-btn-selected");
            filterButtonSelect.classList.remove("category-btn-selected");
            filterButton.classList.add("category-btn-selected");
            
            // création des projets filtrés par catégorie
            let worksFiltered = works.filter((work) => {
                return work.categoryId === i || i === 0;
            });
            //afficher les projets filtrés
            return displayWorks(worksFiltered)
        });
    }     
}

fetch(urlWorks)
.then((resp) => resp.json())
.then((works) => filtersWorks (works))
.catch((error) => {console.log(`Une erreur est survenue : ${error.message}`)})

// ajout homepage edit

const userId = window.localStorage.getItem('userId');
const userToken = window.localStorage.getItem('token');
const loggedIn = userId && userToken ? true : false;


// récupération des projets dans le LS 
/*
if (loggedIn) {
    fetch(urlWorks)
    .then((resp) => resp.json())
    .then((workDatas) => {
        let { workId, workTitle, workImage, workCategoryId, workUserId, workCategory} = workDatas;
        if (workId && workTitle && workImage && workCategoryId && workUserId && workCategory) {
            //enregistrement de userID et token dans le localStorage
            window.localStorage.setItem("id", workId);
            window.localStorage.setItem("title", workTitle);
            window.localStorage.setItem("imageUrl", workImage);
            window.localStorage.setItem("categoryId", workCategoryId);
            window.localStorage.setItem("userId", workUserId);
            window.localStorage.setItem("category", workCategory);
        }
        console.log(window.localStorage.getItem("id"))
    })
}
const workId = window.localStorage.getItem('userId');
const workTitle = window.localStorage.getItem('title');
const workImage = window.localStorage.getItem('imageUrl');
const workCategoryId = window.localStorage.getItem('categoryId');
const workUserId = window.localStorage.getItem('userId');
const workCategory = window.localStorage.getItem('category');
const workGet = workId && workTitle && workImage && workCategoryId && workUserId && workCategory ? true : false;
*/







if (!loggedIn) {
    // Appel de l'API http://localhost:5678/api/categories
    fetch(urlCategories)
    .then((response) => response.json())
    .then((datas) => createFiltersButtons(datas))
    .catch((error) => {console.log(`Une erreur est survenue : ${error.message}`)})

}
// création Homepage Edit
if (loggedIn){
    
    //modif texte lien nav "login" en "logout"
    const navLogin = document.querySelector("nav li:nth-child(3) a");
    document.querySelector("nav li:nth-child(3) a").innerText = "logout";

    // création du mode édition dans le header
    const body = document.querySelector("body");
    const header = body.querySelector("header");
    const headerEdition = document.createElement("section");
    headerEdition.className = "modeEdition";
    headerEdition.innerHTML = 
        `<ul class="listModeEdition">
            <li><i class="fa-regular fa-pen-to-square"></i></li>
            <li>Mode édition</li>
            <li><a class="publicationChange">publier les changements</a></li>
        </ul>`;
    body.appendChild(headerEdition);
    body.insertBefore(headerEdition, header);

    // ajout bouton modif intro
    const introductionImage = document.querySelector(".introductionImage");
    const introductionIconEdit = document.createElement("i");
    introductionIconEdit.className = "fa-regular fa-pen-to-square";
    const introductionBtnEdit = document.createElement("a");
    introductionBtnEdit.innerText = "modifier";
    introductionImage.appendChild(introductionIconEdit);
    introductionImage.appendChild(introductionBtnEdit);

    // ajout bouton modif portfolio
    const portfolioSection = document.querySelector("#portfolio");
    const portfolioDivEdit = document.createElement("div");
    portfolioDivEdit.className = "edition-gallery";
    const portfolioIconEdit = document.createElement("i");
    portfolioIconEdit.className = "fa-regular fa-pen-to-square";
    const portfolioBtnEdit = document.createElement("a");
    portfolioBtnEdit.innerText = "modifier";
    portfolioSection.appendChild(portfolioDivEdit);
    portfolioDivEdit.appendChild(portfolioIconEdit);
    portfolioDivEdit.appendChild(portfolioBtnEdit);
    const portfolioCategories = document.querySelector(".categories")
    portfolioSection.insertBefore(portfolioDivEdit, portfolioCategories);
    
    //ajout de l'event listener au bouton modif Portfolio
    portfolioBtnEdit.addEventListener("click", () => {
        createModal(worksModal)
    })
    
    navLogin.addEventListener("click", (event) => {
    
        if (loggedIn) {
            event.preventDefault();
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("token");
            window.location.href = "./index.html";
        }
    });
}

function createModal (worksModal) {
    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const sectionModal = document.createElement("section");
    sectionModal.setAttribute("id", "modal");
    sectionModal.innerHTML = "";
    const closeModal = document.createElement("i");
    closeModal.className = "fa-solid fa-xmark";
    const contentModal = document.createElement("div");
    contentModal.className = "modal-content";
    const titleContentModal = document.createElement("h2");
    titleContentModal.innerText = "Galerie photo";
    const galleryContentModal = document.createElement("div");
    galleryContentModal.className = "modal-gallery";

    const buttonAddWork = document.createElement("button");
    buttonAddWork.setAttribute("type", "button");
    buttonAddWork.className = "btn-add-work";
    buttonAddWork.innerText = "Ajouter une photo";
    const buttonCancelGallery = document.createElement("button");
    buttonCancelGallery.setAttribute("type", "button");
    buttonCancelGallery.className = "btn-cancel-gallery";

    body.insertBefore(sectionModal, header);
    sectionModal.appendChild(contentModal);
    contentModal.appendChild(closeModal);
    contentModal.appendChild(titleContentModal);
    contentModal.appendChild(galleryContentModal);
    contentModal.appendChild(buttonAddWork);
    contentModal.appendChild(buttonCancelGallery);


    for (let index = 0; index < worksModal.length; index++) {
        const modalWorksGallery = document.querySelector(".modal-gallery");
        const modalWorkElement = document.createElement("figure");
        const modalWorkImage = document.createElement("img");
        modalWorkImage.src = worksModal.imageUrl;
        const modalWorkImageIcon = document.createElement("i");
        modalWorkImageIcon.className = "fa-solid fa-trash-can";
        const editWorkElement = document.createElement("p");
        editWorkElement.innerText = "éditer";
        // rattachement des balises aux DOM
        modalWorksGallery.appendChild(modalWorkElement);
        modalWorkElement.appendChild(modalWorkImage);
        modalWorkElement.appendChild(editWorkElement);
        modalWorkElement.appendChild(modalWorkImageIcon);

    }
    // au click de l'icone "x", fermer la fenetre sectionModal
    closeModal.addEventListener("click", ()=> {
        sectionModal.style.display = "none";
    })
    window.addEventListener("click", (event)=> {
        if (event.target == sectionModal) {
            sectionModal.style.display = "none";
        }
    })
}
fetch(urlWorks)
        .then((r) => r.json())
        .then((worksModal) => createModal(worksModal))
        .catch((error) => {console.log(`Une erreur de la fonction createModal est survenue : ${error.message}`)})

        
//enregistrer le token dans le LS 
if (loggedIn === null){
    fetch(urlUsersLogin)
    .then((response) => response.json())
    .then((userData) => {
        let { userId, token } = userData;
        if (userId && token) {
            //enregistrement de userID et token dans le localStorage
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("userId", userId);
        }
    })
}

