exports.dashboardLoader=(req, res)=>{
    if(req.session.userInfo.type==="Admin"){
        res.render("User/adminDashBoard", {
            title: "dashboard"
        })
    }
    else{
        res.render("User/dashBoard", {
            title: "dashboard"
        });
    }
}