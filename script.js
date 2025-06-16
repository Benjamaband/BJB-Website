let fil_class = "all";
document.getElementById("filter-class").addEventListener("change", (e) => {
    fil_class = e.target.value;
    fetchAndRender();
});

let fil_section = "all";
document.getElementById("filter-section").addEventListener("change", (e) => {
    fil_section = e.target.value;
    fetchAndRender();
});

function render(data){
    const total_stu = data.length;
    document.getElementById("total-students").innerHTML = total_stu;

    const tbody = document.getElementById("att-table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = '';

    for(let i = 0; i <= total_stu-1; i++){
        if(fil_class !== "all" && data[i][1].charAt(2) !== fil_class) continue;
        if(fil_section !== "all" && data[i][2].toLowerCase() !== fil_section) continue;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data[i][0]}</td>
            <td>${data[i][1]}</td>
            <td>${data[i][2]}</td>
        `;
        tbody.appendChild(row);
    }
}

function fetchAndRender(){
    fetch('https://script.google.com/macros/s/AKfycbwAXi1QflaNoNS_903BpmZtIrn68Bg6NO9qtCEJ2SuqPgQbl404COZaGs5h6dtxc7KU/exec')
        .then(res => res.json())
        .then(data => {
            if (!data || data.length === 0) console.log("ERROR: Data access denied.");
            render(data.slice(2));
        });
}

fetchAndRender();