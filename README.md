# IBDb - Internet Book Database

IBDb er en nettside for bøker ... 

## Bygging og kjøring

For å gjøre prosjektet klart for kjøring må en rekke kommandoer kjøres etter repoet har blitt klonet. Først må man navigere seg til ibdb-project ved å kjøre:
```
cd ibdb-project
```

Deretter må man installere forskjellige pakker for at å kunne åpne nettsiden:
```
npm install
```

Nettsiden kan nå åpnes på to forskjellige måter:

### Alternativ 1

```
npm start
```
Da vil nettsiden åpnes i en localhost i nettleseren din.

### Alternativ 2

```
sudo npm install -g firebase-tools
firebase login
npm run build
```

Da vil du få en egen link i terminalen som kan deles med andre.


