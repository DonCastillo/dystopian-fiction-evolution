function YearTitle(imgUrl, era, title) {
    return `
        <section class="section year-title">
            <div class="section__container section__container--one-column padding-y-20">
                <div class="section__hero bgimage parallax" style="background-image:url('./imgs/${imgUrl}')"></div>
                <div class="container container--1200">
                    <h2 class="section-title">${era}: <br /><span>${title}</span></h2>
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
    } else if (themeName == "fascism") {
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

function Book(cover, title, year, author, desc, tags) {
    let themeListHTML = "";
    for(let i=0; tags.length > i; i++) {
        themeListHTML += ThemeIcon(tags[i])
    }
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

function YearPage(era, title, desc, notableEvents, bookCardsHTML) {
    let notableEventsHTML = "";
    for(let i=0; notableEvents.length > i; ++i) {
        notableEventsHTML += `<li>${notableEvents[i]}</li>`
    }
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
                    <ul>${notableEventsHTML}</ul>
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
            const yrTitleHTML = YearTitle(yearBg, yearEra, yearTitle);
            let booksHTML = ""
            for(let i=0; yearBooks.length > i; ++i) {
                booksHTML += Book(yearBooks[i].cover, 
                                  yearBooks[i].title, 
                                  yearBooks[i].date, 
                                  yearBooks[i].author, 
                                  yearBooks[i].desc, 
                                  yearBooks[i].tags)
            }
            const yrPageHTML = YearPage(yearEra, yearTitle, yearDesc, yearNotableEvent, booksHTML)

            dystopiaTimelineEl.append(yrTitleHTML)
            dystopiaTimelineEl.append(yrPageHTML)

        }

    });

});