import data from './data.js'
console.log(data)

const topicLibrary = document.getElementsByClassName('topic-library')[0];

const fillSection = (array, funct, section) => {
    let list = "";
    array.forEach(element => {
        list += funct(element);
    });
    section.innerHTML = list;
};
const createLibCard = (obj) => {
    const card = `
      <div class="scroll-topic"  style="background-image: url(${obj.image})" onclick="location='${obj.link}'">
          <h4 class="scroll-topic-title">${obj.name}</h4>
      </div>
      `;
    return card;
};
const getTopicLibrarySectionInfo = () =>{
    fillSection(data.library, createLibCard, topicLibrary )
    console.log('hello')
}
getTopicLibrarySectionInfo();
// window.onload = () =>{

// }
