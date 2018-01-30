# Projet Web Galerie Video MBDS
> L'application permet d'ajouter/modifier/supprimer/afficher des vidéos sous la forme d'une galerie.  
> Elles sont importés depuis un lien Youtube.

## Installation

Download the repository or clone it.  
  - `npm install`     
  - `npm start`  
  
## Fonctionnalités

### Page d'accueil
La page d'accueil affiche la liste des videos disponible sur la galerie via leur miniature.

#### Affichage des miniatures
En passant la souris sur une miniature un overlay permet de voir son titre ainsi que sa note.  
En cliquant sur une miniature on accède à la page de visualisation de la video.  

#### Chargement dynamique
La pagination se fait de façon dynamique, une fois en bas de la page on charge et affiche les videos  
suivantes tout en conservant les précédentes. (Application one page)

### Barre de navigation
Une barre de navigation est disponible sur la gauche du site, elle permet de retourner à la page d'accueil  
ainsi que d'ajouter des videos.

#### Ajout de video ou de playlist
L'ajout de video ou de playlist se fait via l'url youtube (complète ou shorten).  
Le titre et la description sont automatiquements générés depuis l'API Youtube avec possibilité de modification.

### Page de visualisation des videos
Cette page permet de visualiser, d'éditer, de noter ou du supprimer la video choisit.  
Une liste des miniatures est disponible à gauche pour choisir une autre video.

#### Liste des miniatures
Celle çi à droite de l'écran permet de choisir la video à visualiser sans revenir sur la page d'acceuil.  
Elle possède comme la page d'acceuil un chargement dynamique quand on arrive en bas de celle çi.

#### Modifier la video
Un bouton pour modifier les informations de la video est disponible en haut à droite.  
Il permet d'éditer directement sur la même page le titre et la description.

#### Noter la video
En bas du lecteur de la video, vous avez possibilité de noter la video de 1 à 5 étoiles.  
Le vote n'est possible qu'une seule fois par video.

#### Suppression d'une video
Un bouton en haut à droite permet de supprimer la video que vous êtes entrain de regarder.

### Backend
La partie back end est assuré par Firebase.
