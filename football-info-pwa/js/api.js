const url = 'https://api.football-data.org/v2/competitions/2021/standings';

// blok code yang akan dipanggil jika fetch berhasil

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // method reject akan akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // mengubah suatu objek menjadi promise agar bisa di then-kan
        return Promise.resolve(response);
    }
}

// parsing data json menjadi array javascript
function json(response) {
    return response.json();
}

// blok catch error
function error(error) {
    // parameter berasal dari promise.reject
    console.log('Error : ' + error);
}


function getStandings() {
    if ("caches" in window) {
        caches.match(url).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    var tableData = `
                        <div class='list'>
                            <table class='highlight responsive-table'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Klub</th>
                                        <th>Poin</th>
                                    </tr>
                                </thead>
                                <tbody id='tes'>

                                </tbody>
                            </table>
                        </div>`;


                    var listClub = '';
                    data.standings[0].table.forEach(function(standings) {
                        listClub += `
                        <tr style="cursor:pointer" onclick="location.href='./team.html?id=${standings.team.id}'">
                            <td>${standings.position}</td>
                            <td>${standings.team.name}</td>
                            <td>${standings.points}</td>
                        </tr>
                        </a>
                        `;

                    });
                    // sisipkan 
                    document.getElementById("body-content").innerHTML = tableData;  
                    document.getElementById("tes").innerHTML = listClub;
                })
            }
        })
    }
    
    fetch(url, {
        method: 'GET',
        headers: {
            'X-Auth-Token' : '5384ecbdad5449188d971b6cc568f33a'
        }
    })
    .then(status)
    .then(json)
    .then(function(data) {
        var tableData = `
            <div class='list'>
                <table class='highlight responsive-table'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Klub</th>
                            <th>Poin</th>
                        </tr>
                    </thead>
                    <tbody id='tes'>

                    </tbody>
                </table>
            </div>`;


        var listClub = '';
        data.standings[0].table.forEach(function(standings) {
            listClub += `
            <tr style="cursor:pointer" onclick="location.href='./team.html?id=${standings.team.id}'">
                <td>${standings.position}</td>
                <td>${standings.team.name}</td>
                <td>${standings.points}</td>
            </tr>
            </a>
            `;

        });
        // sisipkan 
        console.log(data.standings[0].table);
        document.getElementById("body-content").innerHTML = tableData;  
        document.getElementById("tes").innerHTML = listClub;  


    })
    .catch(error);
}


function getTeamById() {
    return new Promise(function(resolve,reject) {
    
      //ambili nilai query parameter(id)
      var urlParams = new URLSearchParams(window.location.search);
      var idParam = urlParams.get('id');

      if ("caches" in window) {
          caches.match('https://api.football-data.org/v2/teams/' + idParam).then(function(response) {
              if (response) {
                  response.json().then(function(data) {
                    var teamHTML = `
                      <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${data.crestUrl}" />
                        </div>
                        <div class="card-content">
                          <span class="card-title">${data.name}</span>
                          <p>Stadium : ${data.venue}</p>
                          <p>Address : ${data.address}</p>
                          <p>Website : <a href='${data.website}'>${data.website}</a></p>
                        </div>
                      </div>
                    `;
                    document.getElementById('body-content').innerHTML = teamHTML;
                    resolve(data);
                  })
              }
          })
      }

      fetch('https://api.football-data.org/v2/teams/' + idParam, {
        method: 'GET',
        headers:{
            'X-Auth-Token' : '5384ecbdad5449188d971b6cc568f33a'
        }
      })
      .then(status)
      .then(json)
      .then(function(data) {
        var teamHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <p>Stadium : ${data.venue}</p>
              <p>Address : ${data.address}</p>
              <p>Website : <a href='${data.website}'>${data.website}</a></p>
            </div>
          </div>
        `;
        document.getElementById('body-content').innerHTML = teamHTML;
        resolve(data);
        console.log(data);
      });
    });
}

function getSavedTeams() {
    getAll().then(function(teams) {
        console.log(teams);
        var tableData = `
        <div class='list'>
            <table class='highlight responsive-table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Klub</th>
                        <th>Pilihan</th>
                    </tr>
                </thead>
                <tbody id='tes'>
                
                </tbody>
            </table>
        </div>`;
    
    
        var listClub = '';
        var i = 1;
        teams.forEach(function(team) {
            listClub += `
            <tr style="cursor:pointer" onclick="location.href='./db.html?id=${team.id}'">
                <td>${i++}</td>
                <td>${team.name}</td>
            </tr>
            `;

        });
        // sisipkan 
        // console.log(data.standings[0].table);
        document.getElementById("body-content").innerHTML = tableData;  
        document.getElementById("tes").innerHTML = listClub;
    });
}

function getSavedTeamById() {
    return new Promise(function(resolve, reject) {

        var urlParams= new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        getById(Number(idParam)).then(function(team) {
            dbHTML = '';
            var dbHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${team.crestUrl}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${team.name}</span>
                  <p>Stadium : ${team.venue}</p>
                  <p>Address : ${team.address}</p>
                  <p>Website : <a href='${team.website}'>${team.website}</a></p>
                </div>
              </div>
            `;
            document.getElementById('body-content').innerHTML = dbHTML;
            console.log(team);
            resolve(team.id);
        });

    });
}