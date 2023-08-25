$(document).ready(function() {
  $('#action_menu_btn').click(function() {
      $('.action_menu').toggle();
  });
});

const getData = async () => {
  const response = await fetch("./chat_data.json");
  const chatData = await response.json();
  const contactsList = chatData.twr36542467.chat_list;

  let contacts = document.getElementById("contacts");
  let contactProfileImage = document.getElementById("contactProfileImage");
  let contactProfileName = document.getElementById("contactProfileName");
  let noOfMessages = document.getElementById("noOfMessages");
  let messagesSection = document.getElementById("messagesSection");
  let isContactOnlineMessage = document.getElementById("isContactOnlineMessage");

  const getMessages = (contact, messages, userImage, contactImage) => {
    for (let j = 0; j < messages.length; j++) {
      let mainMessageContainer = document.createElement("div");
      let messageImageContainer = document.createElement("div");
      messageImageContainer.setAttribute("class", "img_cont_msg");
      let messageImageElement = document.createElement("img");
      messageImageElement.setAttribute("class", "rounded-circle user_img_msg");
      let messageContainer = document.createElement("div");
      let messageTime = document.createElement("span");
      if (contact === messages[j].sender_id) {
        mainMessageContainer.setAttribute(
          "class",
          "d-flex justify-content-end mb-4"
        );
        messageContainer.setAttribute("class", "msg_cotainer_send");
        messageContainer.textContent = messages[j].message;
        messageTime.setAttribute("class", "msg_time_send");
        messageTime.textContent = messages[j].timestamp.split("T").join(" ");
        messageContainer.appendChild(messageTime);
        mainMessageContainer.appendChild(messageContainer);
        messageImageElement.src = userImage;
        messageImageContainer.appendChild(messageImageElement);
        mainMessageContainer.appendChild(messageImageContainer);
        messagesSection.appendChild(mainMessageContainer);
      } else {
        mainMessageContainer.setAttribute(
          "class",
          "d-flex justify-content-start mb-4"
        );
        messageContainer.setAttribute("class", "msg_cotainer");
        messageImageElement.src = contactImage;
        messageImageContainer.appendChild(messageImageElement);
        mainMessageContainer.appendChild(messageImageContainer);
        messageContainer.textContent = messages[j].message;
        mainMessageContainer.appendChild(messageContainer);
        messagesSection.appendChild(mainMessageContainer);
        messageTime.setAttribute("class", "msg_time");
        messageTime.textContent = messages[j].timestamp.split("T").join(" ");
        messageContainer.appendChild(messageTime);
      }
    }
  };

  contactProfileImage.src = contactsList[Object.keys(contactsList)[0]].image_url;
  contactProfileName.textContent = Object.keys(contactsList)[0];
  noOfMessages.textContent =
    contactsList[Object.keys(contactsList)[0]].messages.length + " Messages";
  isContactOnlineMessage.setAttribute("class", new Date() === new Date(contactsList[Object.keys(contactsList)[0]].last_seen) ? "online_icon" : "online_icon offline");
    
  getMessages(
    Object.keys(contactsList)[0],
    contactsList[Object.keys(contactsList)[0]].messages,
    contactsList[Object.keys(contactsList)[0]].user_image,
    contactsList[Object.keys(contactsList)[0]].image_url
  );

  const onClickButton = (contactName, contactImage, userImage) => {
      console.log(contactImage);
    contactProfileImage.src = contactImage;
    contactProfileName.textContent = `Chat with ${contactName}`;
    messagesSection.textContent = "";
    getMessages(contactName, contactsList[contactName].messages, userImage, contactImage);
  };

  for (let i = 0; i < Object.keys(contactsList).length; i++) {
    const contact = Object.keys(contactsList)[i];

    let listElement = document.createElement("li");
    contacts.appendChild(listElement);

    let buttonElement = document.createElement("button");
    buttonElement.setAttribute("type", "button");
    buttonElement.setAttribute("class", "contact_button");
    listElement.appendChild(buttonElement);

    let contactContainer = document.createElement("div");
    contactContainer.setAttribute("class", "d-flex bd-highlight");
    buttonElement.appendChild(contactContainer);

    buttonElement.onclick = function () {
      onClickButton(contact, contactsList[contact].image_url, chatData.twr36542467.user_image);
    };

    let contactImageContainer = document.createElement("div");
    contactImageContainer.setAttribute("class", "img_cont");
    contactContainer.appendChild(contactImageContainer);
    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", contactsList[contact].image_url);
    imageElement.setAttribute("class", "rounded-circle user_img");
    contactImageContainer.appendChild(imageElement);
    let onlineIconSpanElement = document.createElement("span");
    onlineIconSpanElement.setAttribute("class", new Date() === new Date(contactsList[contact].last_seen) ? "online_icon" : "offline");
    contactImageContainer.appendChild(onlineIconSpanElement);

    let userInfoContainer = document.createElement("div");
    userInfoContainer.setAttribute("class", "user_info");
    contactContainer.appendChild(userInfoContainer);
    let contactNameSpanElement = document.createElement("span");
    contactNameSpanElement.textContent = contact;
    userInfoContainer.appendChild(contactNameSpanElement);
    let paragraphElement = document.createElement("p");
    paragraphElement.textContent = new Date() === new Date(contactsList[contact].last_seen) ? "Online" : `Last seen ${contactsList[contact].last_seen.split("T").join(" ")}`;
    userInfoContainer.appendChild(paragraphElement);
  }
};

getData();