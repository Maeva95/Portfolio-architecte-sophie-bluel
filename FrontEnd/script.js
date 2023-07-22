
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

// Appel de l'API http://localhost:5678/api/categories
fetch(urlCategories)
    .then((response) => response.json())
    .then((datas) => createFiltersButtons(datas))
    .catch((error) => {console.log(`Une erreur est survenue : ${error.message}`)})



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

let userId = window.localStorage.getItem('userId');
let userToken = window.localStorage.getItem('token');
let loggedIn = userId && userToken ? true : false;


// vérifier si le token est présent ds le LS




function createModal () {
    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const sectionModal = document.createElement("section");
    sectionModal.setAttribute("id", "modal");
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
    buttonAddWork.className = "btn-add-work"
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

    //affichage des projets dans le modal
    displayWorksModal ()
}
function displayWorksModal (works){
    for (const work of works) {
        const worksGallery = document.querySelector(".modal-gallery");
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
fetch(urlWorks)
.then((resp) => resp.json())
.then((works) => displayWorksModal(works))
.catch((error) => {console.log(`Une erreur de la fonction displayWorksModal est survenue : ${error.message}`)})

if (loggedIn){
    
    const portfolioCategories = document.querySelector(".categories");
    portfolioCategories.classList.remove("categories");
    const navLogin = document.querySelector("nav li:nth-child(3) a");

        //modif texte lien nav "login" en "logout"
        document.querySelector("nav li:nth-child(3) a").innerText = "logout";
        const body = document.querySelector("body");
        const header = document.querySelector("header");
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
    
        /*const iconeEdit = document.createElement("i");*/
        portfolioSection.appendChild(portfolioDivEdit);
        portfolioDivEdit.appendChild(portfolioIconEdit);
        portfolioDivEdit.appendChild(portfolioBtnEdit);
        portfolioSection.insertBefore(portfolioDivEdit, portfolioCategories);
        
    
        portfolioBtnEdit.addEventListener("click", () => {
            createModal ();
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








