const team_router = require('./teams')
const match_router = require('./matches')
const {Pool} = require('pg')
const {migrate} = require('postgres-migrations')
const env = require('dotenv');
const path = require('path');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const flash = require('express-flash');
const { render } = require('express/lib/response');
const upload = require('./uploadMiddleware');
const Resize = require('./Resize');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

env.config({
    path:'./.env'
})

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
})
    
async function route(app){
    app.get('/db', (req, res) => {
        pool.connect(function(err, client, done){
            if(err){
                return console.error('error fetching client from pool ', err)
            }
            
            client.query('SELECT * FROM players', async (err, result) => {
                // done();
            
                if(err){
                    res.end();
                    return console.error('error running query ', err)
                }
                return done(null, result.rows);
                // console.log('Data = ', result.rows);
                // res.render('db', {data: result.rows})
            });
            console.log('values = ', result);
            res.render('db',{data: ''})
        });
    })
    
    app.post('/uploads/player', urlencodedParser, upload.single('image'), async (req, res) => {
        pool.connect(function(err, client, done){
            if(err){
                return console.error('error fetching client from pool ', err)
            }
            client.query('SELECT * FROM position where position.id not in (select staff.position_id from staff)', async (err, result) => {
                // done();
            
                if(err){
                    res.end();
                    return console.error('error running query ', err)
                }
                for (var i=0; i<result.rows.length; i++){
                    if(req.body.position == result.rows[i]['id']){
                        if(result.rows[i]['name'].toLowerCase() == 'thủ môn'){
                            const imagePath = path.join(__dirname, '../public/images/player/Goalkeepers/');
                            const fileUpload = new Resize(imagePath);
                            if (!req.file) {
                                // res.status(401).json({error: 'Please provide an image'});
                                pool.query(`INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
                                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
                                    [14, req.body.full_name, req.body.position, req.body.birthday, req.body.heights, req.body.weights, '', req.body.number_position], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/web');
                                });
                            }else{
                                const filename = await fileUpload.save(req.file.buffer);
                                pool.query(`INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
                                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
                                    [14, req.body.full_name, req.body.position, req.body.birthday, req.body.heights, req.body.weights, 'images/player/Goalkeepers/'+filename, req.body.number_position], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/web');
                                });
                            }
                            
                        }else if(result.rows[i]['name'].toLowerCase() == 'tiền vệ'){
                            const imagePath = path.join(__dirname, '../public/images/player/Midfielders/');
                            const fileUpload = new Resize(imagePath);
                            if (!req.file) {
                                // res.status(401).json({error: 'Please provide an image'});
                                pool.query(`INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
                                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
                                    [14, req.body.full_name, req.body.position, req.body.birthday, req.body.heights, req.body.weights, '', req.body.number_position], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/web');
                                });
                            }else{
                                const filename = await fileUpload.save(req.file.buffer);
                                pool.query(`INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
                                VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
                                [14, req.body.full_name, req.body.position, req.body.birthday, req.body.heights, req.body.weights, 'images/player/Midfielders/'+filename, req.body.number_position], (err, result)=>{
                                    if(err){
                                        throw err;
                                    }
                                    console.log('Thêm thành công')
                                    res.redirect('/web');
                                });
                            }
                            
                        }else if(result.rows[i]['name'].toLowerCase() == 'tiền đạo'){
                            const imagePath = path.join(__dirname, '../public/images/player/Forwards/');
                            const fileUpload = new Resize(imagePath);
                            if (!req.file) {
                                // res.status(401).json({error: 'Please provide an image'});
                                pool.query(`INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
                                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
                                    [14, req.body.full_name, req.body.position, req.body.birthday, req.body.heights, req.body.weights, '', req.body.number_position], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/web');
                                });
                            }else{
                                const filename = await fileUpload.save(req.file.buffer);
                                pool.query(`INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
                                VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
                                [14, req.body.full_name, req.body.position, req.body.birthday, req.body.heights, req.body.weights, 'images/player/Forwards/'+filename, req.body.number_position], (err, result)=>{
                                    if(err){
                                        throw err;
                                    }
                                    console.log('Thêm thành công')
                                    res.redirect('/web');
                                });
                            }
                            
                        }else if(result.rows[i]['name'].toLowerCase() == 'hậu vệ'){
                            const imagePath = path.join(__dirname, '../public/images/player/Defenders/');
                            const fileUpload = new Resize(imagePath);
                            if (!req.file) {
                                // res.status(401).json({error: 'Please provide an image'});
                                pool.query(`INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
                                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
                                    [14, req.body.full_name, req.body.position, req.body.birthday, req.body.heights, req.body.weights, '', req.body.number_position], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/web');
                                });
                            }else{
                                const filename = await fileUpload.save(req.file.buffer);
                                pool.query(`INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
                                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
                                [14, req.body.full_name, req.body.position, req.body.birthday, req.body.heights, req.body.weights, 'images/player/Forwards/'+filename, req.body.number_position], (err, result)=>{
                                    if(err){
                                        throw err;
                                    }
                                    console.log('Thêm thành công')
                                    res.redirect('/web');
                                });
                            }
                            
                        }
                    }
                }
            });
        });

        // const imagePath = path.join(__dirname, '../public/images/player/');
        // console.log('imagePath = ', imagePath);
        // console.log('sesion thêm cầu thủ = ', req.session);
        // console.log('body = ', req.body);
        // console.log('full_name = ', req.body.full_name);
        // const fileUpload = new Resize(imagePath);
        // if (!req.file) {
        //     res.status(401).json({error: 'Please provide an image'});
        // }
        // const filename = await fileUpload.save(req.file.buffer);
        
        // return res.status(200).json({ name: filename });
        // res.redirect('/web')
    })

    app.get('/web', (req, res)=>{
        console.log('check login = ', req.session.user);
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            
            pool.connect(function(err, client, done){
                if(err){
                    return console.error('error fetching client from pool ', err)
                }
                
                client.query(`SELECT players.id, players.full_name, players.birthday, players.position_id, players.heights, players.weights, players.images, players.number_position, position.name
                FROM players, position
                WHERE players.position_id = position.id`, (err, result) => {
                    done();
                    
                    if(err){
                        res.end();
                        return console.error('error running query ', err)
                    }
                    const date = new Date();
                    const results = result.rows;
                    for(var i=0; i<results.length; i++){
                        console.log('getMonth = ', results[i]['birthday'].getMonth());
                        results[i]['birthday'] = results[i]['birthday'].getDate()+'-'+(results[i]['birthday'].getMonth()+1)+'-'+results[i]['birthday'].getFullYear();
                    }
                    console.log('Data = ', result.rows);
                    console.log('data sau khi format = ', results);
                    res.render('dashboard', {
                        data: results,
                        user_name: req.session.name, 
                        user_email: req.session.email,
                    });
                });
            });
            // res.render('dashboard');
        }
    });

    app.get('/staff', (req, res)=>{
        console.log('check login = ', req.session.user);
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            pool.connect(function(err, client, done){
                if(err){
                    return console.error('error fetching client from pool ', err)
                }
                client.query(`SELECT staff.id, staff.full_name, staff.position_id, staff.images, position.name
                FROM staff, position
                WHERE staff.position_id = position.id`, (err, result) => {
                    done();
                    
                    if(err){
                        res.end();
                        return console.error('error running query ', err)
                    }
                    console.log('Data = ', result.rows);
                    res.render('staff', {data: result.rows,user_name: 'Ngô Quang Trường', user_email: 'quang.truong21051999@gmail.com'});
                });
            });
            // res.render('dashboard');
        }
    });

    
    app.post('/uploads/staff', urlencodedParser, upload.single('image'), async (req, res) => {
        console.log('imageeee = ', req.body.images);
        pool.connect(function(err, client, done){
            if(err){
                return console.error('error fetching client from pool ', err)
            }
            client.query('SELECT * FROM position where position.id in (select staff.position_id from staff)', async (err, result) => {
                // done();
            
                if(err){
                    res.end();
                    return console.error('error running query ', err)
                }
                for (var i=0; i<result.rows.length; i++){
                    if(req.body.position == result.rows[i]['id']){
                        if(result.rows[i]['name'].toLowerCase() == 'hlv trưởng'){
                            const imagePath = path.join(__dirname, '../public/images/player/Head coach/');
                            const fileUpload = new Resize(imagePath);
                            if (!req.file) {
                                // res.status(401).json({error: 'Please provide an image'});
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                    VALUES ($1,$2,$3,$4,$5);`,
                                    [req.body.full_name, 'Việt Nam', 14, req.body.position, ''], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/staff');
                                });
                            }else{
                                const filename = await fileUpload.save(req.file.buffer);
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                VALUES ($1,$2,$3,$4,$5);`,
                                [req.body.full_name, 'Việt Nam', 14, req.body.position, 'images/player/Head coach/'+filename], (err, result)=>{
                                    if(err){
                                        throw err;
                                    }
                                    console.log('Thêm thành công')
                                    res.redirect('/staff');
                                });
                            }
                            
                        }else if(result.rows[i]['name'].toLowerCase() == 'trợ lý hlv'){
                            const imagePath = path.join(__dirname, '../public/images/player/Assistant coach/');
                            const fileUpload = new Resize(imagePath);
                            if (!req.file) {
                                // res.status(401).json({error: 'Please provide an image'});
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                    VALUES ($1,$2,$3,$4,$5);`,
                                    [req.body.full_name, 'Việt Nam', 14, req.body.position, ''], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/staff');
                                });
                            }else{
                                const filename = await fileUpload.save(req.file.buffer);
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                VALUES ($1,$2,$3,$4,$5);`,
                                [req.body.full_name, 'Việt Nam', 14, req.body.position, 'images/player/Assistant coach/'+filename], (err, result)=>{
                                    if(err){
                                        throw err;
                                    }
                                    console.log('Thêm thành công')
                                    res.redirect('/staff');
                                });
                            }
                            
                        }else if(result.rows[i]['name'].toLowerCase() == 'chuyên viên y tế'){
                            const imagePath = path.join(__dirname, '../public/images/player/Medical specialist/');
                            const fileUpload = new Resize(imagePath);
                            if (!req.file) {
                                // res.status(401).json({error: 'Please provide an image'});
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                    VALUES ($1,$2,$3,$4,$5);`,
                                    [req.body.full_name, 'Việt Nam', 14, req.body.position, ''], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/staff');
                                });
                            }else{
                                const filename = await fileUpload.save(req.file.buffer);
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                    VALUES ($1,$2,$3,$4,$5);`,
                                    [req.body.full_name, 'Việt Nam', 14, req.body.position, 'images/player/Medical specialist/'+filename], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/staff');
                                });
                            }
                            
                        }else if(result.rows[i]['name'].toLowerCase() == 'chuyên viên vật lý trị liệu'){
                            const imagePath = path.join(__dirname, '../public/images/player/Physiotherapist/');
                            const fileUpload = new Resize(imagePath);
                            if (!req.file) {
                                // res.status(401).json({error: 'Please provide an image'});
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                    VALUES ($1,$2,$3,$4,$5);`,
                                    [req.body.full_name, 'Việt Nam', 14, req.body.position, ''], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/staff');
                                });
                            }else{
                                const filename = await fileUpload.save(req.file.buffer);
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                VALUES ($1,$2,$3,$4,$5);`,
                                [req.body.full_name, 'Việt Nam', 14, req.body.position, 'images/player/Physiotherapist/'+filename], (err, result)=>{
                                    if(err){
                                        throw err;
                                    }
                                    console.log('Thêm thành công')
                                    res.redirect('/staff');
                                });
                            }
                            
                        }else if(result.rows[i]['name'].toLowerCase() == 'cán bộ hậu cần'){
                            const imagePath = path.join(__dirname, '../public/images/player/Cadres logistics/');
                            const fileUpload = new Resize(imagePath);
                            if (!req.file) {
                                // res.status(401).json({error: 'Please provide an image'});
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                    VALUES ($1,$2,$3,$4,$5);`,
                                    [req.body.full_name, 'Việt Nam', 14, req.body.position, ''], (err, result)=>{
                                        if(err){
                                            throw err;
                                        }
                                        console.log('Thêm thành công')
                                        res.redirect('/staff');
                                });
                            }else{
                                const filename = await fileUpload.save(req.file.buffer);
                                pool.query(`INSERT INTO staff (full_name, nationality, current_team, position_id, images)
                                VALUES ($1,$2,$3,$4,$5);`,
                                [req.body.full_name, 'Việt Nam', 14, req.body.position, 'images/player/Cadres logistics/'+filename], (err, result)=>{
                                    if(err){
                                        throw err;
                                    }
                                    console.log('Thêm thành công')
                                    res.redirect('/staff');
                                });
                            }
                            
                        }
                    }
                }
            });
        });
    })
    
    app.get('/staff_add', (req, res) => {
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            pool.connect(function(err, client, done){
                if(err){
                    return console.error('error fetching client from pool ', err)
                }
                client.query('SELECT * FROM position WHERE position.id in (SELECT staff.position_id FROM staff)', (err, result) => {
                    done();
                    
                    if(err){
                        throw err;
                    }
                    res.render('staff_add', {positions: result.rows, user_name: 'Ngô Quang Trường', user_email: 'quang.truong21051999@gmail.com'});
                });
            });
        }
    })
    app.post('/staff_add', urlencodedParser, upload.single('image'), (req, res) => {
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            console.log('hello mấy cưng = ');
            console.log('name = ', req.body);
            pool.connect(function(err, client, done){
                if(err){
                    return console.error('error fetching client from pool ', err)
                }
                client.query('SELECT * FROM position WHERE position.id not in (SELECT staff.position_id FROM staff)', (err, result) => {
                    done();
                    
                    if(err){
                        throw err;
                    }
                    res.render('product_add', {positions: result.rows});
                });
            });
        }
    });

    app.get('/player_add', (req, res) => {
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            pool.connect(function(err, client, done){
                if(err){
                    return console.error('error fetching client from pool ', err)
                }
                client.query('SELECT * FROM position WHERE position.id not in (SELECT staff.position_id FROM staff)', (err, result) => {
                    done();
                    
                    if(err){
                        throw err;
                    }
                    res.render('product_add', {positions: result.rows});
                });
            });
        }
    })

    app.get('/staff_edit/:id', async(req, res) => {
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            const info_player = await pool.query(`select * from staff where id = $1`, [req.params.id])
            const positions = await pool.query(`select * from position`)
            console.log('player = ', info_player.rows)
            console.log('position = ', positions.rows)
            res.render('staff_edit',{
                info_player:info_player.rows,
                name: req.session.name,
                email: req.session.email,
                position: positions.rows
            })
        }
    })
    
    app.post('/staff_edit/:id', async(req, res) => {
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            const info_player = await pool.query(`select * from staff where id = $1`, [req.params.id])
            console.log('player = ', info_player)
            res.render('staff_edit')
        }
    })

    app.get('/player_edit/:id', async(req, res) => {
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            const info_player = await pool.query(`select * from players where id = $1`, [req.params.id])
            const positions = await pool.query(`select * from position`)
            console.log('player = ', info_player.rows)
            console.log('position = ', positions.rows)
            res.render('edit_player',{
                info_player:info_player.rows,
                name: req.session.name,
                email: req.session.email,
                position: positions.rows
            })
        }
    })
    
    app.post('/player_edit/:id', async(req, res) => {
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            const info_player = await pool.query(`select * from players where id = $1`, [req.params.id])
            console.log('player = ', info_player)
            res.render('product_add')
        }
    })

    app.get('/del_player/:id', (req, res) => {
        const player_id = req.params.id;
        console.log('player_id = ', player_id);
        pool.connect(function(err, client, done){
            if(err){
                throw err;
            }
            client.query(`DELETE FROM players WHERE id = $1`,[player_id], (err, result)=>{
                if (err){
                    throw err;
                }
                console.log('xóa thành công');
                res.redirect('/web');
            })
        })
        
    })
    
    app.get('/del_staff/:id', (req, res) => {
        const staff_id = req.params.id;
        console.log('player_id = ', staff_id);
        pool.connect(function(err, client, done){
            if(err){
                throw err;
            }
            client.query(`DELETE FROM staff WHERE id = $1`,[staff_id], (err, result)=>{
                if (err){
                    throw err;
                }
                console.log('xóa thành công');
                res.redirect('/staff');
            })
        })
        
    })

    app.post('/player_add', urlencodedParser, upload.single('image'), (req, res) => {
        if(typeof req.session.user == 'undefined'){
            res.redirect('/login');
        }else{
            console.log('hello mấy cưng = ');
            console.log('name = ', req.body);
            pool.connect(function(err, client, done){
                if(err){
                    return console.error('error fetching client from pool ', err)
                }
                client.query('SELECT * FROM position WHERE position.id not in (SELECT staff.position_id FROM staff)', (err, result) => {
                    done();
                    
                    if(err){
                        throw err;
                    }
                    res.render('product_add', {positions: result.rows});
                });
            });
        }
    });

    // app.get('/web', (req, res)=>{
    //     console.log('check login = ', req.session.user);
    //     if(typeof req.session.user == 'undefined'){
    //         res.redirect('/login');
    //     }else{
    //         res.render('dashboard');
    //     }
    // });
      
    app.get('/', async (req, res) => {
        // res.render('home')
        pool.connect(function(err, client, done){
            if(err){
                return console.error('error fetching client from pool ', err)
            }
            
            client.query('SELECT * FROM partners', async (err, result) => {
                // done();
            
                if(err){
                    res.end();
                    return console.error('error running query ', err)
                }
                console.log('Data = ', result.rows);
                res.render('home', {data: result.rows})
                // console.log('Data = ', result.rows);
                // res.render('db', {data: result.rows})
            });
            // console.log('values = ', result);
            // res.render('db',{data: ''})
        });

    }) 

    app.get('/chairman', async (req, res) => {
        const partners = await pool.query(`select * from partners`);
        res.render('chairman', {partners: partners.rows})
    })

    app.get('/information', (req, res) => {
        res.render('info_dhfc')
    })
      
    app.get('/aboutus', async (req, res) => {
        const partners = await pool.query(`select * from partners`);
        res.render('aboutus', {partners: partners.rows})
    })
    
    // app.use('/team', team_router) 
    app.get('/team', async(req, res)=>{
        const players = await pool.query(`select * from players`);
        const partners = await pool.query(`select * from partners`);
        res.render('playergrid-v1', {
            players: players.rows,
            partners: partners.rows,
        })
    }) 
    app.get('/info_staff', async (req, res)=>{
        const partners = await pool.query(`select * from partners`);
        pool.connect(function(err, client, done){
            if(err){
                return console.error('error fetching client from pool ', err)
            }
            // console.log('connected')
            // return res.send('connected')
            client.query('SELECT * FROM staff', (err, result) => {
                done()
            
                if(err){
                    res.end()
                    return console.error('error running query ', err)
                }
                res.render('info_staff', {players: result.rows, partners:partners.rows})
                // res.render('shop11', {data: product_list})
            });
            
        });
    })  

    app.get('/blogdetail', (req, res) => {
        res.render('blogdetail')
    })
      
    app.get('/bloggrid', (req, res) => {
        res.render('bloggrid')
    })
      
    app.get('/bloglist', (req, res) => {
        res.render('bloglist')
    })
      
    app.get('/buyticket', (req, res) => {
        res.render('buyticket')
    })
      
    app.get('/comming-soon', async (req, res) => {
        const partners = await pool.query(`select * from partners`);
        res.render('comming-soon', {partners: partners.rows})
    })
      
    app.get('/contactus', async (req, res) => {
        const partners = await pool.query(`select * from partners`);
        res.render('contactus', {partners: partners.rows})
    })
      
    app.get('/fixturedetail', (req, res) => {
        res.render('fixturedetail')
    })
      
    app.get('/fixtures', (req, res) => {
        res.render('fixtures')
    })
    
    app.get('/home', (req, res) => {
        res.render('home')
    })
      
      
    app.get('/info%40domain', (req, res) => {
        res.render('info@domain')
    })
      
      
    app.get('/javascript()', (req, res) => {
        res.render('javascript()')
    })
      
      
    app.use('/matchresult', match_router)
      
      
    app.get('/matchresultdetail', (req, res) => {
        res.render('matchresultdetail')
    })  
      
    app.get('/playerdetail', (req, res) => {
        res.render('playerdetail')
    })
      
    app.get('/playergrid-v1', (req, res) => {
        res.render('playergrid-v1')
    })
      
    app.get('/playergrid-v2', (req, res) => {
        res.render('playergrid-v2')
    })
      
      
    app.get('/productsingle', (req, res) => {
        res.render('productsingle')
    })
      
      
    app.get('/shopgrid', (req, res) => {
        res.render('shopgrid')
    })
      
      
    app.get('/shoplist', (req, res) => {
        res.render('shoplist')
    })
      
      
    app.get('/soccermedia-1', async (req, res) => {
        const partners = await pool.query(`select * from partners`);
        res.render('soccermedia-1', {partners: partners.rows})
    })
      
      
    app.get('/soccermedia-2', (req, res) => {
        res.render('soccermedia-2')
    })
      
    
    app.get('/404', async (req, res) => {
        
        const partners = await pool.query(`select * from partners`);
        res.render('404', {partners: partners.rows})
    })
}

module.exports = route