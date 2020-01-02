const url = 'https://api.football-data.org/v2/competitions/2021/standings'


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
    // console.log(data.standings[0].table);
    document.getElementById("body-content").innerHTML = tableData;  
    document.getElementById("tes").innerHTML = listClub;  
    
    
})
.catch(error);
}


function getTeam() {
    return new Promise(function(resolve,reject) {
    
      //ambili nilai query parameter(id)
      var urlParams = new URLSearchParams(window.location.search);
      var idParam = urlParams.get('id');

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
        console.log(data);
        document.getElementById('body-content').innerHTML = teamHTML;
        resolve(data);
      });
    });
}