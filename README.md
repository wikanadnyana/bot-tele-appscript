# Bot Tele App Script

untuk botHandle dan juga botToken bisa digenerate di <code>BotFather</code>

untuk appsScriptUrl generate waktu udh deploy di panel App Scriptnya

### File <code>bot.gs</code> :

flow code nya -> kita update di column 1 all row spreadsheet -> kita ketik command <code>/checkupdates</code> -> maka akan muncul data updates yang sudah di add

### File <code>bot2.gs</code> :

flow code nya -> kita update di column 1 all row spreadsheet -> kita langsung dapat update setiap 1 menit (di _trigger_ tiap semenit) dengan catatan sudah menjalankan perintah <code>/start</code> untuk _mengauthorize_ chat ID

#### <code>_Notes :_</code>

Beberapa hal seperti column, message send (bisa jg send timestamps for better updates system experience) bisa di adjust sesuai kebutuhan.
