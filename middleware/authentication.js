exports.isLoggedIn=(req, res, next)=>{
    if(req.session.userInfo){
        next();
    }
    else{
        res.redirect("/signIn");
    }
}

exports.isAdmin=(req, res, next)=>{
    if(req.session.userInfo.type!=="Admin"){
        res.redirect("/")
    }
    else{
        next();
    }
}