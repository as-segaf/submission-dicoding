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



fetch(url, {
    method: 'GET',
    headers: {
        'X-Auth-Token' : '5384ecbdad5449188d971b6cc568f33a'
    }
})
.then(status)
.then(json)
.then(function(data) {
    var tableHTML = `
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
        <tr>
            <td>${standings.position}</td>
            <td>${standings.team.name}</td>
            <td>${standings.points}</td>
        </tr>
        `;

    });
    // sisipkan 
    console.log(data.standings[0].table);
    document.getElementById("body-content").innerHTML = tableHTML;  
    document.getElementById("tes").innerHTML = listClub;  
    
    
})
.catch(error);