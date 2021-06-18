import data from './data.js'


const councilMembers = document.getElementsByClassName('council-members')[0];

const fillSection = (array, funct, section) => {
    let list = "";
    array.forEach(element => {
        list += funct(element);
    });
    section.innerHTML = list;
};
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
const getCouncilMembers = () =>{
    fillSection(data.members.committee, createMemberCard, councilMembers )

}
getCouncilMembers();
// window.onload = () =>{

// }
