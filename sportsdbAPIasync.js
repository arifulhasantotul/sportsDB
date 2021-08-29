// search error handle 
const searchErrorMsg = document.getElementById('search_error');
searchErrorMsg.style.display = 'none';

// search button handle 
const searchSportsData = async () => {

    // get input field value 
    const inputFieldId = document.getElementById('input_field');
    // get value 
    const inputValue = inputFieldId.value;
    // clear input field 
    

    if (inputFieldId.value != '') {
        searchErrorMsg.style.display = 'none';
        // sportsDB api 
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputValue}`;
        // fetch url 
        const fetchData = await fetch(url);
        const data = await fetchData.json();
        showSportsData(data.teams);
        
    } else {
        searchErrorMsg.style.display = 'block';
    }
    inputFieldId.value = '';

}


const resultErrorMsg = document.getElementById('result_error');
resultErrorMsg.style.display = 'none';

const showSportsData = teams => {
    // console.log(teams)
    const row = document.getElementById('col_wrapper');
    row.textContent = '';

    if (teams == null) {
        resultErrorMsg.style.display = 'block';
    } else {
        resultErrorMsg.style.display = 'none';

        // forEach function for looping
        teams.forEach(team => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="col">
                    <div class="card h-100 bg-light rounded">
                        <img src="${team.strTeamBadge}" class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${team.strTeam}</h5>
                            <p class="card-text"></p>
                        </div>
                        <div class="card-footer">
                            <button onclick="(searchDataDetails(${team.idTeam}))" class="btn btn-info rounded-pill text-white my-2">See Details</button>
                        </div>
                    </div>
                </div>
            `;
            row.appendChild(div);
        });
    }

}

// team details area

const searchDataDetails =async teamId => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`
    // console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    showDataDetails(data.teams[0]);

}

const showDataDetails = club => {

    console.log(club);

    const clubDetails = document.getElementById('details_card');
    clubDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="mb-3 row g-0">
            <div class="col-md-4">
                <img src="${club.strTeamBadge}" class="img-fluid rounded-start p-4" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${club.strTeam}</h5>
                    <p class="card-text">${club.strAlternate}</p>
                    <h6>League : ${club.strLeague}</h6>
                    <h6>Country : ${club.strCountry}</h6>
                </div>
            </div>
        </div>
    `;
    clubDetails.appendChild(div);
}