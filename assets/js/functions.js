$(document).ready(function () {
    // select style
    $('select').niceSelect();
    // select style

    GetAllCountries();
});


// list
function GetAllCountries() {
    fetch('https://restcountries.com/v3.1/all').then(function (response) {
        return response.json();
    }).then(function (data) {
        let viewData = '';
        for (let index = 0; index < data.length - 230; index++) {
            const element = data[index];
            let capitalName = '';

            if (element.capital === undefined) {
                capitalName = 'none';
            } else {
                capitalName = element.capital[0];
            }

            viewData += `<li>
            <a href="detail.html?code=${element.cca2}">
                <img src="${element.flags.png}" alt="">
                <span class="textArea">
                    <h3>${element.name.common}</h3>
                    <p>
                        <b>Population:</b> <span>${element.population}</span>
                    </p>
                    <p>
                        <b>Region:</b> <span>${element.region}</span>
                    </p>
                    <p> 
                        <b>Capital:</b> <span>${capitalName}</span>
                    </p>
                </span>
            </a>
        </li>`;
            $("#countryList").html(viewData);
            $('.loading,.notList').hide();
        }
    }).catch(function (e) {
        console.log("Hata" + e);
    });
}


// filter search 
function SearchByCountryName() {
    var value = document.getElementById("search").value;
    if (!value) {
        GetAllCountries();
        $('.notList').hide();
    }

    fetch('https://restcountries.com/v2/name/' + value).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.status == 404) {
            $("#countryList").html('');
            $('.notList').show();
        }
        let viewData = '';
        for (let index = 0; index < data.length; index++) {
            $("#countryList").html('');
            const element = data[index];
            let capitalName = '';

            if (element.capital === undefined) {
                capitalName = 'none';
            } else {
                capitalName = element.capital[0];
            }

            viewData += `<li>
            <a href="detail.html?code=${element.alpha2Code}">
                <img src="${element.flags.png}" alt="">
                <span class="textArea">
                    <h3>${element.name}</h3>
                    <p>
                        <b>Population:</b> <span>${element.population}</span>
                    </p>
                    <p>
                        <b>Region:</b> <span>${element.region}</span>
                    </p>
                    <p> 
                        <b>Capital:</b> <span>${capitalName}</span>
                    </p>
                </span>
            </a>
        </li>`;
            $("#countryList").html(viewData);
            $('.notList').hide();

        }

    }).catch(function (e) {
        console.log("Hata" + e);
    });

}


// filter select
function SearchByRegionalFilter(filterData) {
    if (!filterData)
        return;
    fetch('https://restcountries.com/v2/regionalbloc/' + filterData).then(function (response) {
        return response.json();
    }).then(function (data) {
        let viewData = '';
        for (let index = 0; index < data.length; index++) {
            $("#countryList").html('');
            const element = data[index];
            let capitalName = '';

            if (element.capital === undefined) {
                capitalName = 'none';
            } else {
                capitalName = element.capital[0];
            }

            viewData += `<li>
            <a href="detail.html?code=${element.alpha2Code}">
                <img src="${element.flags.png}" alt="">
                <span class="textArea">
                    <h3>${element.name}</h3>
                    <p>
                        <b>Population:</b> <span>${element.population}</span>
                    </p>
                    <p>
                        <b>Region:</b> <span>${element.region}</span>
                    </p>
                    <p> 
                        <b>Capital:</b> <span>${capitalName}</span>
                    </p>
                </span>
            </a>
        </li>`;
            $("#countryList").html(viewData);
            $('.notList').hide();
        }

    }).catch(function (e) {
        console.log("Hata" + e);
    });
}


// detail
function getDetailByCountryCode(countryCode) {
    fetch('https://restcountries.com/v3.1/alpha/' + countryCode).then(function (response) {
        return response.json();
    }).then(function (data) {
        let viewData = '';
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let capitalName = '';

            if (element.capital === undefined) {
                capitalName = 'none';
            } else {
                capitalName = element.capital[0];
            }

            viewData += `<div class="left">
                <img src="${element.flags.png}" alt="">
             </div>
            <div class="right">
                <h3>${element.name.common}</h3>
                <div class="textArea">
                    <div class="colm">
                        <p>
                            <b>Native Name:</b>
                            <span>${element.name.common}</span>
                        </p>

                        <p>
                            <b>Population:</b>
                            <span>${element.population}</span>
                        </p>

                        <p>
                            <b>Region:</b>
                            <span>${element.region}</span>
                        </p>

                        <p>
                            <b>Sub Region:</b>
                            <span>${element.subregion}</span>
                        </p>

                        <p>
                            <b>Capital</b>
                            <span>${element.capital}</span>
                        </p>
                        
                    </div> 
                    <div class="colm">
                        <p>
                            <b>Top Level Domain:</b>
                            <span>${element.tld}</span>
                        </p>

                        <p>
                            <b>Currencies:</b>
                            <span>${element.currencies[Object.keys(data[0].currencies)[0]].name}</span>
                        </p>

                        <p>
                            <b>Languages:</b>
                            
                            <span>${element.languages[Object.keys(data[0].languages)[0]]}</span>
                        </p>
                    </div>
                </div>
 

            </div>`;

            viewData += "<div class='btns'><span>Border Countries:</span><div class='btnsArea'>";
            for (let i = 0; i < element.borders.length; i++) {
                let border = element.borders[i];

                viewData += 
                    "<div class='btn'>" +
                    "<a href='detail.html?code=" + border + "'><small>" + border + "</small></a>" +
                    "</div>"
            }
            viewData += "</div></div>"


            $("#detailContainer").html(viewData);
        }
    }).catch(function (e) {
        console.log("Hata" + e);
    });
}