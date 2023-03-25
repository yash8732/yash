const user = require("./../model/model")
exports.getChat = async(req, res) => {
    res.render('chat')
}

exports.signUp = async(req, res) => {
    res.render('register')
}

exports.handleSignUp = async (req, res) =>{
    try {
        console.log(req.body);
        await user.create(req.body)
        res.redirect(`/chat?data=${JSON.stringify(req.body)}`)
    } catch (e) {
        console.log(e);
        res.render("register", { error: e.message })
    }
}