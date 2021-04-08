exports.isLoggedIn=(req, res, next)=>{
    if(req.session.userInfo){
        next();
    }
    else{
        res.redirect("/signIn");
    }
}