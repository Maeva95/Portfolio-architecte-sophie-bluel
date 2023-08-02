
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
    const portfolioSection = document.querySelector("#portfolio");
    const portfolioCategories = document.querySelector(".categories");

    const buttonEditGalleryIntro = document.createElement("div");
    buttonEditGalleryIntro.className = "edition-gallery";
    const iconEditGalleryIntro = document.createElement("i");
    iconEditGalleryIntro.className = "fa-regular fa-pen-to-square";
    const textEditGalleryIntro = document.createElement("a");
    textEditGalleryIntro.innerText = "modifier";
    introductionImage.appendChild(buttonEditGalleryIntro);
    buttonEditGalleryIntro.appendChild(iconEditGalleryIntro);
    buttonEditGalleryIntro.appendChild(textEditGalleryIntro);

    const buttonEditGalleryPortfolio = document.createElement("div");
    buttonEditGalleryPortfolio.className = "edition-gallery";
    const iconEditGalleryPortfolio = document.createElement("i");
    iconEditGalleryPortfolio.className = "fa-regular fa-pen-to-square";
    const textEditGalleryPortfolio = document.createElement("a");
    textEditGalleryPortfolio.innerText = "modifier";
    portfolioSection.appendChild(buttonEditGalleryPortfolio);
    buttonEditGalleryPortfolio.appendChild(iconEditGalleryPortfolio);
    buttonEditGalleryPortfolio.appendChild(textEditGalleryPortfolio);
    portfolioSection.insertBefore(buttonEditGalleryPortfolio, portfolioCategories);

    createModal();
    
    //ajout de l'event listener au bouton modif Portfolio
    buttonEditGalleryPortfolio.addEventListener("click", ()=> {
        toggleModal();
        
    });
    
    navLogin.addEventListener("click", (event) => {
    
        if (loggedIn) {
            event.preventDefault();
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("token");
            window.location.href = "./index.html";
        }
    });


}


function createModal() {
    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const sectionModal = document.createElement("section");
    sectionModal.setAttribute("class", "modal");
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

    const buttonCancelGallery = document.createElement("a");
    buttonCancelGallery.setAttribute("href", "#");
    buttonCancelGallery.className = "btn-cancel-gallery";
    buttonCancelGallery.textContent = "Supprimer la galerie";

    body.insertBefore(sectionModal, header);
    sectionModal.appendChild(contentModal);
    contentModal.appendChild(closeModal);
    contentModal.appendChild(titleContentModal);
    contentModal.appendChild(galleryContentModal);
    contentModal.appendChild(buttonAddWork);
    contentModal.appendChild(buttonCancelGallery);

    getWorksModal();
    // au click de l'icone "x", fermer la fenetre sectionModal
    closeModal.addEventListener("click", ()=> {
            sectionModal.classList.toggle("active");
    });
    // au click en dehors de la modale, fermer la fenetre sectionModal
    window.addEventListener("click", (event)=> {
        if (event.target == sectionModal) {
            sectionModal.classList.toggle("active");
        }
    });
    
}


async function getWorksModal() {
    try {
        const data = await fetchDatas();
        for (work of data) {
            const modalWorksGallery = document.querySelector(".modal-gallery");
            const modalWorkElement = document.createElement("figure");
            const modalWorkImage = document.createElement("img");
            modalWorkImage.src = work.imageUrl;
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
        
    console.table(data)
    } catch (error) {
        console.log(`Une erreur de la fonction "getWorksModal" s'est produite`)
    }
    
}

function toggleModal() {
    const sectionModal = document.querySelector(".modal");
    sectionModal.classList.toggle("active");
}

async function fetchDatas() {
    try {
        const response = await fetch(urlWorks);
        if (!response.ok) {
            throw new Error("Erreur de récupération des données API")
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



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

