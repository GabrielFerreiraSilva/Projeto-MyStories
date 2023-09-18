var maxReplies = 4;

function changeDisplay(element, value){
    if(element.style.display === value){
        element.style.display = "none";
    }
    else{
        element.style.display = value;
    }
}

function countAncestors(element, classe){
    let counter = 0;
    let ancestor = element.parentElement;

    while(ancestor){
        if(ancestor.classList.contains(classe)){
            counter++;
        }
        ancestor = ancestor.parentElement;
    }

    return counter;
}

function add_new_comment(button){
    const comment_form = button.closest(".comment-container").querySelector(".new-comment-form");
    changeDisplay(comment_form, "flex");
    comment_form.querySelector(".comment-text").focus();
}

function show_replies(button){
    const replies_list = button.closest(".comment-box").querySelector(".replies-list");
    changeDisplay(replies_list, "block");
}

function add_reply(button){
    const reply_form = button.closest(".comment-box").querySelector(".new-reply-form");
    changeDisplay(reply_form, "flex");
    reply_form.querySelector(".reply-text").focus();
}

function edit_comment(button){
    const edit_form = button.closest(".comment-box").querySelector(".edit-comment-form");
    const comment_text = button.closest(".comment-box").querySelector(".comment-text").textContent;
    const textArea = edit_form.querySelector(".edit-text");
    textArea.value = comment_text;
    changeDisplay(edit_form, "flex");
    edit_form.querySelector(".edit-text").focus();
}

function delete_comment(button){
    const comment_box = button.closest(".comment-box");
    const confirm_popup = button.closest(".comment-box").querySelector(".delete-popup-div");
    changeDisplay(confirm_popup, "block");

    document.body.style.overflow = "hidden";

    const yes_button = confirm_popup.querySelector("#yes");
    const no_button = confirm_popup.querySelector("#no");

    yes_button.addEventListener("click", function(){
        comment_box.remove();
        confirm_popup.style.display = "none";
        document.body.style.overflow = "auto";
    });

    no_button.addEventListener("click", function(){
        confirm_popup.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

function createNewComment(form){
    const commentText = form.elements["comment-text"].value;
    const commentContainer = form.closest(".comment-container");
    let newComment = document.createElement("div");
    
    newComment.innerHTML = `
        <div class="comment-box">
            <p class="comment-text">${commentText}</p>
            <div class="comment-footer">
                <div class="comment-footer-left">
                    <button onclick="show_replies(this)" class="comment-related-button">Show Replies</button>
                    <button onclick="add_reply(this)" class="comment-related-button">Add Reply</button>
                </div>
                <div class="comment-footer-right">
                    <button onclick="edit_comment(this)" class="comment-related-button">Edit Comment</button>
                    <button onclick="delete_comment(this)" class="comment-related-button">Delete Comment</button>
                </div>
            </div>
            <div class="delete-popup-div">
                <div class="delete-popup-content">
                    <span class="delete-popup-text">Are you sure you want delete this comment?</span>
                    <div class="popup-buttons-div">
                        <button id="yes" class="comment-related-button">Yes</button>
                        <button id="no" class="comment-related-button">No</button>
                    </div>         
                </div>
            </div>
            <form class="edit-comment-form" onsubmit="event.preventDefault(); editComment(this);">
                <textarea name="edit-text" class="edit-text" required spellcheck="false"></textarea>
                <div class="submit-button-div">
                    <button type="submit" class="comment-related-button">Edit</button>
                </div>
            </form>
            <form class="new-reply-form" onsubmit="event.preventDefault(); createNewReply(this);">
                <textarea name="reply-text" class="reply-text" required spellcheck="false"></textarea>
                <div class="submit-button-div">
                    <button type="submit" class="comment-related-button">Add Reply</button>
                </div>
            </form>
            <ul class="replies-list"></ul>
        </div>
    `;

    commentContainer.appendChild(newComment);
    form.style.display = "none";
    form.reset();
}

function createNewReply(form){
    const replyText = form.elements["reply-text"].value;
    const repliesList = form.closest(".comment-box").querySelector(".replies-list");
    let newReply = document.createElement("li");

    newReply.innerHTML = `
        <div class="comment-box comment-reply">
            <p class="comment-text">${replyText}</p>
            <div class="comment-footer">
                <div class="comment-footer-left">
                    <button onclick="show_replies(this)" class="comment-related-button">Show Replies</button>
                    <button id="reply-button" onclick="add_reply(this)" class="comment-related-button">Add Reply</button>
                </div>
                <div class="comment-footer-right">
                    <button onclick="edit_comment(this)" class="comment-related-button">Edit Comment</button>
                    <button onclick="delete_comment(this)" class="comment-related-button">Delete Comment</button>
                </div>
            </div>
            <div class="delete-popup-div">
                <div class="delete-popup-content">
                    <span class="delete-popup-text">Are you sure you want delete this comment?</span>
                    <div class="popup-buttons-div">
                        <button id="yes" class="comment-related-button">Yes</button>
                        <button id="no" class="comment-related-button">No</button>
                    </div>         
                </div>
            </div>
            <form class="edit-comment-form" onsubmit="event.preventDefault(); editComment(this);">
                <textarea name="edit-text" class="edit-text" required spellcheck="false"></textarea>
                <div class="submit-button-div">
                    <button type="submit" class="comment-related-button">Edit</button>
                </div>
            </form>
            <form class="new-reply-form" onsubmit="event.preventDefault(); createNewReply(this);">
                <textarea name="reply-text" class="reply-text" required spellcheck="false"></textarea>
                <div class="submit-button-div">
                    <button type="submit" class="comment-related-button">Add Reply</button>
                </div>
            </form>
            <ul class="replies-list">
            </ul>
        </div>
    `;

    repliesList.appendChild(newReply);

    if(countAncestors(newReply, "comment-box") >= maxReplies){
        const reply_button = newReply.querySelector("#reply-button");
        reply_button.remove();
    }

    form.style.display = "none";
    form.reset();
    repliesList.style.display = "block";
}

function editComment(form){
    const editText = form.elements["edit-text"].value;
    const commentText = form.closest(".comment-box").querySelector(".comment-text");

    commentText.textContent = editText;
    form.style.display = "none";
    form.reset();
}