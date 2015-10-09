<time>2014-02-20</time>
# White screen of death

### Решение для проблемы совместимости selectivizr и @font-face в IE8

Есть пару решений проблемы white screen of death в IE8 при загрузке шрифтов @font-face

1. Использовать определение @font-face в html в теге \<style\>
2. Подгружать скрипт **selectivizr** с помощью **modernizr.js**

```
$(document).ready(function() {
  Modernizr.load([
    {
      test : Modernizr.borderradius,
      // borderradius взят для примера того свойства,
      // которого нет в старых ie
      nope : ['js/min/selectivizr.min.js']
      // тут указываем путь к selectivizr
    }
  ]);
});
```
