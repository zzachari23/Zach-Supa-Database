async function getTeams(){
    console.log('Creating Customer')
    var host = window.location.origin;
    var test = await fetch(`${host}/teams`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((res) => res)
        .then(async res => {
            console.log(res)
            
            const element = document.getElementById('errorBox')
            if(element) {
                element.remove();
            }

            console.log('Status:', res.status)
            if (res.status == 200 || res.status == 304) {
                return res.json()
            }
            throw Error(JSON.stringify(await res.json()));
        })
        .then((res) => {
            console.log(res)
            const element = document.getElementById("teamInfo");
            if (element) {
                element.remove();
            }

            var table = document.createElement('table');
            table.setAttribute('id', 'teamInfo')

            var tableRow = document.createElement('tr');

            var tableHeading1 = document.createElement('th');
            tableHeading1.innerHTML = "Team Name"
            tableRow.appendChild(tableHeading1)

            var tableHeading2 = document.createElement('th');
            tableHeading2.innerHTML = "Last Name"
            tableRow.appendChild(tableHeading2)

        

            table.appendChild(tableRow)
            // var cutoff = document.getElementById('cutoff');
            // cutoff.insertAdjacentElement("beforebegin", table)
            document.body.appendChild(table)
            for (i = 0; i < res.length; i++) {
                var customerRow = document.createElement('tr');
                var customerFirstName = document.createElement('td');
                var customerLastName = document.createElement('td');
         

                customerFirstName.innerHTML = `${i+1}`+ ". " + res[i].team_name;
                customerLastName.innerHTML = res[i].player_name;
             
                customerRow.appendChild(customerFirstName);
                customerRow.appendChild(customerLastName);
             

                table.appendChild(customerRow);
            }

        })
        .catch((error) => {
            console.log('Error:', JSON.parse(error.message))
            var errorDiv = document.createElement('div')
            errorDiv.setAttribute('class', 'errorBox');
            errorDiv.setAttribute('id', 'errorBox')

            var h1 = document.createElement('h1');
            h1.innerHTML = `Error Ocurred:`

            var p = document.createElement('p');
            p.innerHTML = `${JSON.parse(error.message).message}`

            errorDiv.appendChild(h1);
            errorDiv.appendChild(p);
            document.body.appendChild(errorDiv)
        })
};


async function addCustomer() {
    console.log('Creating Team')
    var host = window.location.origin;

    var test = await fetch(`${host}/team`, {
        method: 'POST',
        body: JSON.stringify({
            "firstName": `${document.getElementById('firstName').value}`,
            "lastName": `${document.getElementById('lastName').value}`
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    await getTeams();
};


/*
async function updateTeamName() {
    const teamId = document.getElementById('lastName').value;
    const newName = document.getElementById('firstName').value;

    try {
      const response = await fetch(`${host}/team/${teamId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_name: newName }),
      });

      await getTeams();

      
  }
*/








window.onload = getTeams;