const getAbout = async (req, res) => {
    const locals = {
        title:"Nodejs about",
        description:"about page"
    }
    res.render('index', {
        locals,
        layout: '../views/layouts/main.ejs'
    })
}


module.exports = { getAbout }