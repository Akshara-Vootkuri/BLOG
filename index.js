import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
let posts=[];
function Post(name,text){
  this.name=name;
  this.text=text;
  this.rawDate = new Date();
  this.date = this.rawDate.toLocaleString();
}



function addPost(name,text){
  let post =new Post(name,text)
  posts.push(post)
}


function deletePost(index){
  posts.splice(index,1)
}

function editPost(index,name,text){
  posts[index].name=name;
  posts[index].text=text;
}

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  res.render("index.ejs");
})
app.get("/create",(req,res)=>{
  res.render("create.ejs")
})



app.get("/posts",(req,res)=>{
  res.render("posts.ejs",
{posts:posts})
})
app.post("/delete", (req, res) => {
  let index=req.body["postId"]
  deletePost(index);
  res.redirect("/posts");
});
// app.get("/edit/:id",(req,res)=>{
//   let index = req.params.id;
//     let post = posts[index];
//     res.render("create.ejs",
//      {postId: index,
//       name:post.name,
//       text:post.text});
// })
// app.get("/view/:id",(req,res)=>{
  app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {
        post: post,
        postId: index
    });
});
//   let index=req.params.id;
//     res.render("view.ejs",
//     { postId:index})
// })
app.post("/save", (req, res) => {
  let name = req.body["name"];
  let text = req.body["text"];
  
  addPost(name, text);
  res.redirect("/posts");
});
app.post("/update",(req,res)=>
{
  let id=req.body["postId"]
  let name=req.body["name"]
  let text=req.body["text"]
  editPost(id,name,text)
  res.redirect("/posts")
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  }); 