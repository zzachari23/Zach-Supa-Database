const express = require('express')
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://qvndflmsiehmpkbwzfit.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2bmRmbG1zaWVobXBrYnd6Zml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMzMyODksImV4cCI6MjAxNzkwOTI4OX0.eOotVnL5lKwRjZreyh2F-PJtWw_LsJFCaSXtulc8o4s'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/INST377-Week10-PPT.html', { root: __dirname })
})


app.get('/teams', async (req, res) => {
    console.log(`Getting Teams`)

    const {data, error} = await supabase
        .from('Teams')
        .select();
    
    if(error) {
        console.log(error)
    } else if(data) {
        res.send(data)
    }
})


app.post('/team', async (req, res) => {
    console.log('Adding Teams')

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;


    const {data, error} = await supabase
        .from('Teams')
        .insert([
            {'team_name': firstName, 'player_name': lastName}
        ])
        .select();

    console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
})



/* 
app.put('/teams/:team_id', async (req, res) => {
    var teamId = req.params.team_id;
    var firstName = req.body.firstName;
   
    
        const { data, error } = await supabase
            .from('Teams')
            .update({ team_name: firstName })
            .eq('team_id', teamId);  

     console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
        
});
*/

app.listen(port, () => {
    console.log('APP IS ALIVEEEEEE')
})