async function readCSV() {
    const csvURL = "./static/kontakte.csv";
    try {
        const response = await fetch(csvURL);
        if (!response.ok){
            
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const text = await response.text();
        const rows = text.split('\n').map(row => row.split(';'));
        return rows;
    } catch (error) {
        console.error('Fehler beim Abrufen der Datei: ', error);
        return null;
    }
};


async function createTable(){
    const tableData = await readCSV();
    var table = document.createElement('table');
        var th = document.createElement('tr');
        var tdo = document.createElement('td');
            tdo.innerHTML = 'Name';
            th.appendChild(tdo);
        table.appendChild(th);
    
        var tdo = document.createElement('td');
            tdo.innerHTML = 'Fach';
            th.appendChild(tdo);
        table.appendChild(th);
    
    var tdo = document.createElement('td');
            tdo.innerHTML = 'Klassen';
            th.appendChild(tdo);
        table.appendChild(th);
    
    var tdo = document.createElement('td');
            tdo.innerHTML = 'Email';
            th.appendChild(tdo);
        table.appendChild(th);
    
    var tdo = document.createElement('td');
            tdo.innerHTML = 'Telefonnummer';
            th.appendChild(tdo);
        table.appendChild(th);    
    for(var i = 0; i<tableData.length; i++){
        var tr = document.createElement('tr');
        for(var j=0; j<tableData[i].length; j++){
            var td = document.createElement('td');
            td.innerHTML = tableData[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.querySelector('.table_div').appendChild(table);
};