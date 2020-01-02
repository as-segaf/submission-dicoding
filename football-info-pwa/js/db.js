var dbPromise = idb.open("football-app", 1, function(upgradeDb) {
    var teamObjecStore = upgradeDb.createObjectStore("teams", {keyPath:"id"});
    teamObjecStore.createIndex("name", "name", {unique:false});
})

function saveTeam(team) {
    dbPromise
     .then(function(db) {
         var tx = db.transaction("teams", "readwrite");
         var store = tx.objectStore("teams");
         console.log(team);
         store.add(team);
         return tx.complete;
     })
     .then(function() {
         console.log("team berhasil di simpan");
     });
}