function submitPostForm(form){

    let title = form.elements["post-title"].value;
    let text = form.elements["text-area"].value;

    localStorage.setItem("postTitle", title);
    localStorage.setItem("postText", text);

    window.location.href = "../views/viewpost.html";

    form.reset();

}