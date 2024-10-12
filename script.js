const ideasList = document.getElementById("ideas");
const usernameInput = document.getElementById("username-input");
const ideaInput = document.getElementById("idea-input");
const submitButton = document.getElementById("submit-idea");
const announcementsDiv = document.getElementById("announcements");
const announcementInput = document.getElementById("announcement-input");
const postAnnouncementButton = document.getElementById("post-announcement");
const loginButton = document.getElementById("login-button");
const adminSection = document.getElementById("admin-section");
const loginMessage = document.getElementById("login-message");

// Admin Login Credentials
const ADMIN_PASSWORD = "zayanandilaansustainable1056"; // Admin password
let isAdmin = false; // Track admin login status

// Admin Login Function
loginButton.addEventListener("click", () => {
  const password = document.getElementById("admin-password").value;
  if (password === ADMIN_PASSWORD) {
    isAdmin = true; // Set admin status to true
    adminSection.style.display = "block";
    loginMessage.textContent = "Login successful!";
    loginMessage.style.color = "green";
  } else {
    loginMessage.textContent = "Incorrect password.";
    loginMessage.style.color = "red";
  }
});

// Submit Idea Function
submitButton.addEventListener("click", () => {
  const username = usernameInput.value;
  const ideaText = ideaInput.value;
  if (username.trim() !== "" && ideaText.trim() !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
            <strong>${username}:</strong> <span>${ideaText}</span>
            <div>
                <button class="like-button">Like <span class="like-count">0</span></button>
                ${isAdmin ? '<button class="delete-btn">Delete</button>' : ""}
            </div>
            <div>
                <input type="text" placeholder="Reply..." class="reply-input" />
                <button class="reply-button">Reply</button>
                <ul class="replies"></ul>
            </div>
        `;

    ideasList.appendChild(li);
    ideaInput.value = "";
    usernameInput.value = ""; // Clear username input

    // Like Button Functionality
    const likeButton = li.querySelector(".like-button");
    const likeCount = li.querySelector(".like-count");
    let likes = 0;
    likeButton.addEventListener("click", () => {
      likes++;
      likeCount.textContent = likes;
    });

    // Delete Button Functionality (only if isAdmin is true)
    if (isAdmin) {
      const deleteButton = li.querySelector(".delete-btn");
      deleteButton.addEventListener("click", () => {
        ideasList.removeChild(li);
      });
    }

    // Reply Button Functionality
    const replyButton = li.querySelector(".reply-button");
    const replyInput = li.querySelector(".reply-input");
    const repliesList = li.querySelector(".replies");

    replyButton.addEventListener("click", () => {
      const replyText = replyInput.value;
      if (replyText.trim() !== "") {
        const replyLi = document.createElement("li");
        replyLi.textContent = replyText;
        repliesList.appendChild(replyLi);
        replyInput.value = "";
      }
    });
  }
});

// Post Announcement Functionality
postAnnouncementButton.addEventListener("click", () => {
  const announcementText = announcementInput.value;
  if (announcementText.trim() !== "") {
    const announcementDiv = document.createElement("div");
    announcementDiv.textContent = announcementText;
    announcementsDiv.appendChild(announcementDiv);
    announcementInput.value = "";
  }
});