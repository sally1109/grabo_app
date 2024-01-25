Gruppenmitglieder:

- Selina Budimir 34267 & Manuel Schneider 34266 & Mandy Buda 34293



StudiFinder

- App ist unvollständig auf Vercel deployed. Da wir ein Backend haben, wird nichts angezeigt. 
  Wir haben versucht auf Azure die App mit Backend zu deployen. Das hat jedoch auch nicht funktioniert

  Link zu Vercel: https://studifinder.vercel.app/#/

Beschreibung: 
- StudiFinder App fürs Smartphone -> (bitte Entwicklerumgebung auf IPhone 12 Pro (390px x 844px) stellen)
- User kann nach unterschiedlichen Studiengängen suchen, diese filtern und unter Favoriten abspeichern 
- User kann seinen Wohnort angeben um so die Filterfunktion schon vorzukonfigurieren



Architektur & Komponenten:
- REST Backend mit Daten in data.json und favorites.json
- Navigationsleiste mit 3 Komponenten: 1. Home 2. Favoriten 3. Settings


1. Home-Komponente mit 3 Komponenten (ListCourse, DetailsCourse, Searchbar)
  
    Home-Komponente: 
    - Erhält von data.json das Heimats-Bundesland und setzt es als Standart Bundesland im Filter 
    - Der User wird dazu aufgefordert in der SearchBar nach einem Studiengang zu suchen
    - Filtert die Studiengänge und zeigt sie über die ListCourse-Komponente an
    - Wenn kein Studiengang gefunden wird, zeigt es dies dem User als Text an
    - Fügt favorites.json die vom User favorisierten Studiengänge an
 
    SearchBar-Komponente: 
    - Es kann in einem Textfeld ein Suchwort eingegeben werden
    - Es lässt sich ein Dialog Fenster öffnen wo die Filter-Parameter in Drop-down Menüs eingestellt werden können 
    - Liefert an die Home-Komponente das eingegebene Suchwort und die Filter-Parameter

    ListCourse-Komponente: 
    - erhält von der Home-Komponente den Studiengang als Objekt und den Index 
    - Checkt ob der Studiengang als Favorit abgespeichert wurde und es ist möglich ihn als Favorit abzuspeichern
    - erstellt eine Karte die Daten des Studiengangs anzeigt
    - wenn die Karte angeklickt wird, wird der Home-Komponente gesagt das die DetailsCourse-Komponente aktiviert werden soll

    DetailsCourse-Komponente: 
    - erhält von der Home-Komponente den Studiengang als Objekt und zeigt die Details des Studiegangs in einem Pop-Up Fenster an
    


2. Favorites-Komponente mit der Komponente ListFavorites und Benutzung der DetailsCourse-Komponente
        
    ListFavorites-Komponente: 
    - erhält von der Favorites-Komponente die Favorisierten Studiengänge als Objekt 
    - erstellt eine Karte die Daten des Studiengangs anzeigt
    - der User kann den Studiengang entfavorisieren 
    - wenn die Karte angeklickt wird, wird der Favorites-Komponente gesagt das die DetailsCourse-Komponente aktiviert werden soll


3. Setting-Komponente mit einer Komponente (PersonalData):

    PersonalData-Komponente: 
    - Name, Bundesland und NC können im Formular eingegeben werden -> Daten werden in Backendfile data.json geschrieben




Notwendige Schritte um Vue-Anwendung zu starten:

- Neues Terminal
    1. cd Backend 
    2. npm i
    3. npm install express
    4. npm install cors
    Server starten: node server.js

- Neues Terminal
    1. cd Frontend
    2. cd studiengang_app
    3. npm i
    Frontend starten: npm run dev

Falls irgendwas nicht funktioniert, diese Librarys haben wir noch im Frontend installiert:
    Axios:      npm i axios 
    Router.js   install vue-router@4
    Vuetify:    npm add vuetify@^3.0.1
                npm i @mdi/font -D

Hilfsmittel:
    Bei Problemen, die wir selber nicht lösen konnten: ChatGPT
