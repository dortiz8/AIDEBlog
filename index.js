import data from './data.js'
import componentData from './componentData.js'
import navData from './componentData.js';



//DOM CALLS
//***USE THIS SECTION TO GET SPECIFIC DOM ELEMENTS */
const mainTopicTitle = document.getElementById("main-topic-title");
const mainTopic = document.getElementById("main-topic");
const mainTopicDescription = document.getElementById("main-topic-description");
const mainTopicMonth = document.getElementById("main-topic-month");
const secondarySection = document.getElementsByClassName('secondary-section')[0];
const scrollSection = document.getElementsByClassName('scroll-section')[0];
const membersSection = document.getElementsByClassName('members-section')[0];
const nav = document.getElementsByClassName('nav')[0]

const topicLibrary = document.getElementsByClassName('topic-library')[0];
const headerBackground = document.getElementsByClassName('header-background')[0];

const mainTopicPpoint = document.getElementsByClassName('main-topic-ppoint')[0];
const pPoint = document.getElementsByClassName('pPoint')[0];
const pPointAudio = document.getElementsByClassName('pPoint-audio')[0];



//---UTILS SECTION---//
//***UTILITY FUNCTIONS THAT ARE REUSABLE */

const utils = {
    navLinks: function() {
        let navLinks = document.querySelectorAll("nav a");
        const homeUrl = '/'

        Array.from(navLinks).forEach(link => {
            link.onclick = () => {
                switch (link.id) {
                    case "home":
                        window.location.replace(`${homeUrl}`)
                        break
                    case "aideCouncil":
                        window.location.replace(`${homeUrl}council.html`)
                        break;
                    case "topicLibrary":
                        window.location.replace(`${homeUrl}topicLib.html`)
                        break;
                    case "yourThoughts":
                        let feedbackSection = document.getElementsByClassName("feedback")[0];
                        feedbackSection.style.display = "flex"
                        break;
                    case "acicIntranet":
                        window.location.replace(homeUrl)
                        break;

                    default:
                        throw new Error;
                }

            }
        })

    },
    tags: function() {
        let tags = document.getElementsByTagName("a");
        Array.from(tags).forEach(tag => tag.target = "_blank")
    },
    openClose: function() {

        let closeButtons = document.getElementsByClassName("close");
        Array.from(closeButtons).forEach(button => {
            button.onclick = () => {
                button.parentElement.style.display = "none";
                pPointAudio.pause();

            }
        });
    }
}


const fillSection = (array, funct, section) => {
    let list = "";
    array.forEach(element => {
        list += funct(element);
    });
    section.innerHTML = list;
};


//---TOPIC CARDS---//

//MAIN CARD
const fillMainTopicCard = (obj) => {
    mainTopicTitle.innerText = obj.name
    mainTopic.style.backgroundImage = `url(${obj.image})`;
    mainTopicDescription.innerText = obj.description;
}

const createLibCard = (obj) => {
    const card = `
      <div class="scroll-topic"  style="background-image: url(${obj.image})" onclick="location='${obj.link}'">
          <h4 class="scroll-topic-title">${obj.name}</h4>
      </div>
      `;
    return card;
};

//MEMBERS CARDS
const createMemberCard = (obj) => {
    const card = `
    <div class="member-card">
    <div class="member-information">
      <div class="member-picture" style="background-image: url(${obj.image})">

      </div>
      <div class="member-details">
        <h2 class="member-name">${obj.name}</h2>
        <span class="general-info">${obj.position}</span>
        <span class="general-info">#: ${obj.phone}</span>
        <span class="general-info">Title: ${obj.title}</span>
      </div>
    </div>
  </div>
    `;
    return card;
}
const createSecondarySectionCard = (obj) => {
    const card = `
    <div class="topic" onclick="location='${obj.link}'">
    <div class="secondary-topic-header">
    <img src="${obj.image}" alt="">
    </div>
    <div>
        <span class="topic-title">${obj.name}</span>
        <p class="topic-description">${obj.description}</p>
    </div>
</div>
    `
    return card;
}
const getMainSectionInfo = () => {
    fillMainTopicCard(data.mainTopic)
    fillSection(data.members.committee, createMemberCard, membersSection)
    fillSection(data.secondarySection, createSecondarySectionCard, secondarySection)
}
const getScrollSectionInfo = () => {
    const firstFour = data.library.slice(0, 3);
    fillSection(firstFour, createLibCard, scrollSection)
}


//MAIN TOPIC POWERPOINT
//***RUNS IF MAINTOPIC CONTAINST A POWERPOINT */
const showPowerPoint = () => {
    const ppointCard =
        `

    <iframe
        src="${data.mainTopic.powerPointLink}"
        width="800px" height="500px" frameborder="0">This is an embedded <a target="_blank"
        href="https://office.com">Microsoft Office</a> presentation, powered by <a target="_blank"
        href="https://office.com/webapps">Office</a>.
    </iframe>

    `
    pPoint.innerHTML = ppointCard;
    mainTopicPpoint.style.display = "block"
}

//HOME PAGE COMPONENTS
const setHeaderBkg = () => {
    headerBackground.style.backgroundImage = `url('${componentData.headerBackground.image}')`;
}



//ON WINDOW LOAD
//***RUNS SPECIFIC FUNCTIONS ON WINDOW LOAD */
window.onload = () => {
    utils.tags();
    utils.openClose();
    // getNavSection();
    utils.navLinks();
    setHeaderBkg();
    getMainSectionInfo();
    getScrollSectionInfo();

    mainTopic.onclick = () => {
        if (data.mainTopic.powerPointLink != null) {
            document.getElementsByClassName("pPointPresentation")[0].style.display = "flex";
            pPointAudio.play();
        } else {
            window.open(`${data.mainTopic.link}`)
        }
    }

}
