function YearTitle(imgUrl, era, title) {
    return `
        <section class="section year-title">
            <div class="section__container section__container--one-column bgimage parallax" style="background-image:url('./imgs/${imgUrl}')">
                <div class="container container--1200">
                    <h2 class="section-title">${era}: <br />${title}</h2>
                </div>
            </div> 
        </section>
    `;
}


function ThemeIcon(themeName) {
    let color = "";
    let icon = ""; 
    if (themeName == "social") {
        color = "orange"
        icon = "person-rifle"
    } else if (themeName == "facism") {
        color = "red"
        icon = "building-columns"
    } else if (themeName == "freedom") {
        color = "grey"
        icon = "handcuffs"
    } else if (themeName == "ecology") {
        color = "green"
        icon = "seedling"
    } else if (themeName == "tech") {
        color = "blue"
        icon = "robot"
    } else if (themeName == "biology") {
        color = "purple"
        icon = "dna"
    } else {
        color = "";
        icon = ""; 
    }

    return `
        <div class="card__icon card__icon--sm card__icon--${color}">
            <i class="fa-solid fa-${icon}"></i>
        </div>  
    `;
}

function Book(cover, title, year, author, desc, themeListHTML) {
    return `
        <div class="book-card">
            <div class="book-card__cover">
                <img src="./imgs/covers/${cover}" alt="">
            </div>

            <div class="book-card__content">
                <h4 class="book-card__title">${title} (${year})</h4>
                <h5 class="book-card__author">${author}</h5>
                <div class="book-card__themes">
                    ${themeListHTML}  
                </div>
            </div>
        </div>
    `;
}

function YearPage(era, title, desc, notableEventsListHTML, bookCardsHTML) {
    return `
    <section class="section year-page">
        <div class="section__container section__container--one-column">
            <div class="container container--1200">
                <h2 class="section-title">${era}: <br />${title}</h2>

                <div class="year-page__desc">
                    ${desc}
                </div>
                
                <div class="notable-events">
                    <strong>Notable events:</strong>
                    ${notableEventsListHTML}
                </div>

                <div class="book-list">
                    ${bookCardsHTML}
                </div>   
            </div>
        </div> 
    </section>
    `
}




$(document).ready(function () {
    console.log('Hello')

    const dystopiaTimelineEl = $('#dystopia-timeline');
    dystopiaTimelineEl.html('');

    $.getJSON("./js/dystopia-timeline.json", function (data) {
        
        for(let i=0; data.length > i; i++) {
            console.log(data[i])
            let yearTitle = data[i].title
            let yearNotableEvent = data[i].notable_event
            let yearEra = data[i].era
            let yearDesc = data[i].desc
            let yearBooks = data[i].books
            let yearBg = data[i].bg

            // draw year title page
            const yrPageHTML = YearTitle(yearBg, yearEra, yearTitle);

            dystopiaTimelineEl.append(yrPageHTML)

        }

    });

});