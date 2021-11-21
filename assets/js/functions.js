$(document).ready(function () {
    $('select').niceSelect();
    GetAllCountries();
});



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
        console.log("Booo" + e);
    });

}



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
        }

    }).catch(function (e) {
        console.log("Booo" + e);
    });
}


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
                        <span>Belgie</span>
                    </p>

                    <p>
                        <b>Population:</b>
                        <span>Belgie</span>
                    </p>

                    <p>
                        <b>Region:</b>
                        <span>Europen</span>
                    </p>

                    <p>
                        <b>Sub Region:</b>
                        <span>Western Europe</span>
                    </p>

                    <p>
                        <b>Capital</b>
                        <span>Brussels</span>
                    </p>
                    
                </div> 
                <div class="colm">
                    <p>
                        <b>Top Level Domain:</b>
                        <span>.be</span>
                    </p>

                    <p>
                        <b>Currencies:</b>
                        <span>Euro</span>
                    </p>

                    <p>
                        <b>Languages:</b>
                        <span>Dutch, French, German</span>
                    </p>
                </div>

            </div>
 
            <div class="btns">
                <span>Border Countries:</span>
                <div class="btn">
                    <a href="#"><small>France</small></a>
                    <a href="#"><small>Germany</small></a>
                    <a href="#"><small>Netherlands</small></a>
                </div>
            </div>

        </div>`;
            $("#detailContainer").html(viewData);
        }
    }).catch(function (e) {
        console.log("Booo" + e);
    });
}