window.addEventListener('load',
    function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/item');
        xhr.send(null);
        xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
              responseFtn(xhr.responseText);
            } else {
              console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };

    // This function puts all of the relevant info on the page. It's dynamic so as to not repeat code.
    appendData = function(elId, attr, data, alt) {
        var el = document.getElementById(elId);
        if(attr == "text") {
            el.innerText = data;
        } else if(attr == "html") {
            // var el = document.getElementById(elId);
            el.innerHTML += data;
        } else {
            el.setAttribute(attr, data);
            if(alt) el.setAttribute('alt', alt);
        }

    }

    // This function takes the response from the api and sets it out into the relevant elements.
    responseFtn = function(info) {
        var info = JSON.parse(info);
        console.log("The Info:", info);
        for(var a = 0; a < info.length; a++) {

            // These items use the appendData function to set everything in place.
            appendData('hotel_img', 'src', info[a].image, info[a].alt);
            appendData('heading', 'text', info[a].title, null);
            appendData('stars', 'src', info[a].rating, null);
            appendData('short_description', 'text', info[a].description, null);
            appendData('from', 'text', "£" + info[a].total_price, null);
            appendData('per_person', 'text', "£" + info[a].person_price, null);
            appendData('button', 'text', info[a].button_text, null);

            // This code checks through the array for the reviews and then uses the appendData function.
            var reviews = info[a].reviews;
            for(var b = 0; b < reviews.length; b++) {
                appendData('average', 'text', reviews[b].average, null);
                appendData('no_of_Reviews', 'text', reviews[b].no_of_reviews, null);
                appendData('icon', 'html', reviews[b].icon, null);
            }

            // This code loops through the included array and wraps then in their own <li> and appends them to the relevant <ul>.
            var included = info[a].included;
            for(var c = 0; c < included.length; c++) {
                var incObj = Object.keys(included[c]);
                for(var d = 0; d < incObj.length; d++) {
                    appendData('includes', 'html', '<li class="icon">' + included[c][incObj[d]] + ' ' + incObj[d] + '</li>');
                }
            }
        }
    }
}, false);
