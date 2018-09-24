// Full Documentation - https://www.turbo360.co/docs
const turbo = require("turbo360")({site_id: process.env.TURBO_APP_ID})
const vertex = require("vertex360")({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config();

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get("/", (req, res) => {
	res.render("index", {text: "This is the dynamic data. Open index.js from the routes directory to see."})
})

/*  This route render Portfolio page */
router.get("/portfolio", (req, res) => {
	res.render("portfolio", {text: "This is the portfolio form."})
})

/*  This route render Contact page*/
router.get("/contact", (req, res) => {
	res.render("contact", {text: "This is the contact form."})
})

/*  This route Send Email using send grid */
// router.get('/thanks', (req,res)=> {
	router.post('/thanks', (req,res)=> {
	const name =`${req.body.Name}`;
	const from =`${req.body.Email}`;
	const subject = `${req.body.Subject}`;
	const text = `${req.body.Message}`;

	const msg = {
		to: 'chris@kurisulim.io',
		name: name,
		from: from,
		subject: subject,
		text: text,
		html:""
	};
	console.log(msg);
	sgMail.send(msg);
	res.render("thanks", {contact: req.body})
	//res.render("thanks", {text:"This is a Thank You Page"})
});

/* This route to catch error */
router.get("*", function (req,res){
	res.send("Opps. Something went wrong!...Err 404").status(404);
})

/*  This route render json data */
router.get("/json", (req, res) => {
	res.json({
		confirmation: "success",
		app: process.env.TURBO_APP_ID,
		data: "this is a sample json route."
	})
})
/*  This route sends text back as plain text. */
router.get("/send", (req, res) => {
	res.send("This is the Send Route")
})

/*  This route redirects requests to Turbo360. */
router.get("/redirect", (req, res) => {
	res.redirect("https://www.turbo360.co/landing")
})


module.exports = router
