import Song from "../models/Song";
import User from "../models/User";
import bcrypt from "bcrypt";

const HTTP_BAD_REQUEST = 400;

export const getJoin = (req,res) => {
    return res.render("join", { pageTitle: "Home", siteName:"Palette Live Studio"});
};

export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", {
        pageTitle,
        errorMessage: "Password confirmation does not match.",
        });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
        return res.status(404).render("join", {
        pageTitle,
        errorMessage: "This username/email is already taken.",
        });
    }
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
            });
            return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
        pageTitle: "Upload Video",
        errorMessage: error._message,
        });
    }
}

export const getLogin = (req, res) =>
    res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("login", {
        pageTitle,
        errorMessage: "An account with this username does not exists.",
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
        pageTitle,
        errorMessage: "Wrong password",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const likes = (req, res) => {
    return res.render("likes", { pageTitle:"Likes", siteName:"Palette Live Studio" })
}