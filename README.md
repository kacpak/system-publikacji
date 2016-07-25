# System do zarządzania publikacjami
dla książek, czasopism, CD, DVD i innych publikacji

Stworzony jako projekt na zajęcia z semistrukturanych baz danych

## Uruchamianie aplikacji
* `npm install` zainstaluje wszystkie wymagane zależności projektu  
* `npm start` dokona transpilacji kodu źródłowego i uruchomi projekt w przeglądarce

## Development
* `gulp <build>` dokona transpilacji kodu źródłowego
* `gulp watch` **build** oraz będzie nasłuchiwać na dalsze zmiany w kodzie
* `gulp serve` uruchomi lokalny serwer www dla aplikacji
* `gulp serve:build` **serve**, wcześniej dokonując transpilacji kodu
* `gulp serve:watch` **serve:build** i nasłuchuje na dalsze zmiany w kodzie
* ` --production` korzystając z tej flagi przy budowaniu, cała aplikacja zostanie zminifikowana
* ` --open` korzystając z tej flagi przy uruchamianiu serwera, aplikacja zostanie też automatycznie uruchomiona w przeglądarce
* `gulp clean` usunie wynikowe pliki aplikacji
* `gulp fullClean` usunie wszystkie pliki nie będące bezpośrednim kodem źródłowym aplikacji
