# Демо
[Ссылка](https://e6894318.ngrok.io/)
[Версия без микрофона](http://165.227.224.91:83/)

# Игра в города
В этой игре человек и компьютер по очереди называют города таким образом, чтобы название следующего города начиналось на последнюю букву предыдущего. Игра продолжается до тех пор, пока у компьютера не закончатся варианты, либо пока у игрока не закончится минута времени. Более подробные правила можно найти в [Википедии](https://ru.wikipedia.org/wiki/%D0%93%D0%BE%D1%80%D0%BE%D0%B4%D0%B0_(%D0%B8%D0%B3%D1%80%D0%B0)).
Первым начинает комьютер с города "Минск".

Игра умеет распозновать голос, т.е. города можно просто наговаривать. Для этого используется [Web Speech API](https://developer.mozilla.org/ru/docs/Web/API/Web_Speech_API).
Все города отмечатся на карте с использованием [API Яндекс.Карт](https://tech.yandex.ru/maps/).