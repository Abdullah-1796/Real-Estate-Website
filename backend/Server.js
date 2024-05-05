import express from "express";
import mysql from "mysql";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "test"
});*/

const db = new pg.Client({
	user: "postgres",
	host: "localhost",
	database: "realestate",
	password: "12345678",
	port: 5432,
  });

db.connect((err) => {
	if (err) {
	  console.error('Error connecting to postgres database: ');
	  return;
	}
	console.log('Connected to postgres database');
  });

function sendEmails()
{
    console.log("sendEmails() function called");
	const str = "select name, email from client";
	db.query(str, (err, data) => {
		if(err)
		{
			console.error("Error in getting emails", err);
		}
		console.log(data.rows);
		const d = data.rows;
		d.map((d) => {
			sendEmail(d.email, d.name, "New Updates", 'Hope you are doing well, new posts are waiting for you. Jump on to our site and find out your dream homes.');
		});
	});
}

function sendEmail(to, name, subject, content)
{
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'opendevices100@gmail.com',
			pass: 'ofot lghj qgwx mcqj'
		},
		secure: true,
	});
	
	// Email content
	const mailOptions = {
		from: 'opendevices100@gmail.com',
		to: to,
		subject: subject,
		html: '<h1>Hi '+name+'</h1><p>'+content+'</p></br></br><p>Thanks!</p>'
	};
	
	// Send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error occurred:', error);
		} else {
			console.log('Email sent:', info.response);
		}
	});
}

app.get("/AdminHome/ManagePost", (req, res) => {
	const str = "SELECT p.*, MIN(i.link) AS first_link FROM post p INNER JOIN imageLinks i ON p.id = i.id GROUP BY p.id order by p.id desc";

	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		return res.json(data);
	});
});

app.get("/PostDetails/:id", (req, res) => {
	//console.log(req.params.id);
	const str = "SELECT * FROM post p INNER JOIN imageLinks i ON p.id = i.id where p.id = " + req.params.id;
	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		return res.json(data);
	});
});

app.post("/AdminHome/ManagePost/AddPost", (req, res) => {
	let headline = req.body.headline;
	let location = req.body.location;
	let city = req.body.city;
	let type = req.body.type;
	let purpose = req.body.purpose;
	let size = req.body.size;
	let price = req.body.price;
	let beds = req.body.beds;
	let bath = req.body.bath;
	let kitchen = req.body.kitchen;
	let portion = req.body.portions;
	let area = req.body.area;
	let link = [10];
	link[0] = req.body.link1;
	link[1] = req.body.link2;
	link[2] = req.body.link3;
	link[3] = req.body.link4;
	link[4] = req.body.link5;
	link[5] = req.body.link6;
	link[6] = req.body.link7;
	link[7] = req.body.link8;
	link[8] = req.body.link9;
	link[9] = req.body.link10;
	//console.log(link[0]);

	//console.log(link1);

	//inserting data in post table
	let str = "INSERT INTO post (headline, location, city, type, purpose, size, price, beds, bath, kitchen, portions, area) VALUES ('"+headline+"', '"+location+"', '"+city+"', '"+type+"', '"+purpose+"', '"+size+"', '"+price+"', '"+beds+"', '"+bath+"', '"+kitchen+"', '"+portion+"', '"+area+"')";
	
	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		//return res.json(data);
	});

	//query for getting id of inserted data
	str = "select * from post order by id desc limit 1";
	//let id = 0;
	//inserting images in imageLinks table
	function insertImages(idd)
	{
		//console.log(idd);
		for(let i = 0; i < link.length; i++)
		{
			if(link[i] != "")
			{
				db.query("insert into imageLinks(id, link) values("+idd+", '"+link[i]+"')", (err, data) => {
					if(err)
					{
						console.log(err.message);
						return res.json("Error");
					}
					else
						console.log("Inserted");
				});
			}
		}
		
	}
	//getting id of inserted data in post table
	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		//id = data.rows[0].id;
		insertImages(data.rows[0].id);
		sendEmails();
		return res.json(data);
	});
	
	//console.log(id);
	//notifying all subscribers about update

	
});

app.put("/AdminHome/ManagePost/UpdatePost", (req, res) => {
	let id = req.body.id;
	let headline = req.body.headline;
	let location = req.body.location;
	let city = req.body.city;
	let type = req.body.type;
	let purpose = req.body.purpose;
	let size = req.body.size;
	let price = req.body.price;
	let beds = req.body.beds;
	let bath = req.body.bath;
	let kitchen = req.body.kitchen;
	let portions = req.body.portions;
	let area = req.body.area;
	let link = [10];
	link[0] = req.body.link1;
	link[1] = req.body.link2;
	link[2] = req.body.link3;
	link[3] = req.body.link4;
	link[4] = req.body.link5;
	link[5] = req.body.link6;
	link[6] = req.body.link7;
	link[7] = req.body.link8;
	link[8] = req.body.link9;
	link[9] = req.body.link10;
	//console.log(link[0]);

	//console.log(link1);

	//inserting data in post table
	let str = "update post set headline = '"+headline+"', location = '"+location+"', city = '"+city+"', type = '"+type+"', purpose = '"+purpose+"', size = '"+size+"', price = '"+price+"', beds = '"+beds+"', bath = '"+bath+"', kitchen = '"+kitchen+"', portions = '"+portions+"', area = '"+area+"' where id = " + id;
	
	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		//return res.json(data);
	});

	//query for deleting previous data of images
	str = "delete from imageLinks where id = " + id;
	//let id = 0;
	//inserting updated images in imageLinks table
	function insertImages(idd)
	{
		//console.log(idd);
		for(let i = 0; i < link.length; i++)
		{
			let s = "";
			if(link[i] != "")
			{
				s = "insert into imageLinks(id, link) values("+idd+", '"+link[i]+"')"
			}
			else {
				"insert into imageLinks(id, link) values("+idd+", '')"
			}
			db.query(s, (err, data) => {
				if(err)
				{
					console.log(err.message);
					return res.json("Error");
				}
				else
					console.log("Inserted");
			});
		}
		
	}
	//getting id of inserted data in post table
	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		//id = data.rows[0].id;
		insertImages(id);
		return res.json(data);
	});
	
	//console.log(id);
	
});

app.delete("/AdminHome/ManagePost/DeletePost/:id", (req, res) => {
	const id = req.params.id;
	const str = "delete from imageLinks where id = " + id;
	console.log("deletion in process");
	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
	});
	console.log("links deleted");
	const str1 = "delete from post where id = " + id;
	db.query(str1, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		return res.json(data);
	});
	console.log("posts deleted");
});

app.get("/", (req, res) => {
	db.query("select * from login", (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		return res.json(data);
	});
});

//----------------User Side End Points--------

app.post("/UserHome/FindProperty", (req, res) => {
	//console.log(Number(req.body.fPrice));
	const location = req.body.fLocation;
	const city = req.body.fCity;
	const type = req.body.fType;
	const purpose = req.body.fPurpose;
	const area = req.body.fArea;
	const size = Number(req.body.fSize);
	const price = Number(req.body.fPrice);

	let str = "SELECT p.*, MIN(i.link) AS first_link FROM post p INNER JOIN imageLinks i ON p.id = i.id where location like '%"+location+"%' and city = '"+city+"' and type = '"+type+"' and purpose = '"+purpose+"' and area = '"+area+"' and size::int = "+size+" and price::int <= "+price+" GROUP BY p.id order by p.id desc";

	if(purpose == "Any")
	{
		str = "SELECT p.*, MIN(i.link) AS first_link FROM post p INNER JOIN imageLinks i ON p.id = i.id where location like '%"+location+"%' and city = '"+city+"' and type = '"+type+"' and area = '"+area+"' and size::int = "+size+" and price::int <= "+price+" GROUP BY p.id order by p.id desc";
	}

	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		return res.json(data);
	})
});

app.post("/UserHome/PassQuery", (req, res) => {
	const str = "select * from client where email = '"+req.body.email+"'";

	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		if(data.rowCount == 0)
		{
			return insertData();
		}
		else {
			return findId();
		}
	});

	function insertData()
	{
		const str1 = "insert into client(name, email, phone) values('"+req.body.name+"', '"+req.body.email+"', '"+req.body.phone+"')";

		db.query(str1, (err, data) => {
			if(err)
			{
				return res.json("Error");
			}
			console.log("Client inserted");
			return findId();
		});
	}

	function findId()
	{
		const str2 = "select id from client where email = '"+req.body.email+"'";

		db.query(str2, (err, data) => {
			if(err)
			{
				return res.json("Error");
			}
			return insertQuery(data.rows[0].id);
		});
	}
	
	function insertQuery(Id)
	{
		const str3 = "insert into query(id, query) values("+Number(Id)+", '"+req.body.query+"')";

		db.query(str3, (err, data) => {
			if(err)
			{
				return res.json("Error");
			}
			return res.json(data);
		});
	}
	
});

app.post("/UserHome/GetInTouch", (req, res) => {
	const str = "select * from client where email = '"+req.body.email+"'";

	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		if(data.rowCount == 0)
		{
			insertData();
		}
		else{
			return res.json(data);
		}
	});

	function insertData()
	{
		const str1 = "insert into client(name, email, phone) values('"+req.body.name+"', '"+req.body.email+"', '"+req.body.phone+"')";

		db.query(str1, (err, data) => {
			if(err)
			{
				return res.json("Error");
			}
			console.log("Client inserted");
			return res.json(data);
		});
	}
});

app.get("/AdminHome/Queries", (req, res) => {
	const str = "select c.*, q.qid, q.query from client c inner join query q on c.id = q.id";

	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		return res.json(data);
	});
});

app.delete("/AdminHome/Queries/:qid", (req, res) => {
	const qid = req.params.qid;
	const str = "delete from query where qid = " + qid;

	db.query(str, (err, data) => {
		if(err)
		{
			return res.json("Error");
		}
		return res.json(data);
	});
});

app.post("/login", (req, res) => {
	//console.log(req.body.user, req.body.pass);
	const str = "select * from adminId";

	db.query(str, (err, data) => {
		if(err)
		{
			console.log(err);
			return res.json("Error");
		}
		console.log(data.rows[0].username);
		if(req.body.user == data.rows[0].username && req.body.pass == data.rows[0].password)
		{
			console.log("Success");
			return res.json("Success");
		}
		else {
			console.log("NotSuccess");
			return res.json("NotSuccess");
		}
	});
})

app.listen(port, () => {
  console.log(`Server is listening from port ${port}.`);
});
