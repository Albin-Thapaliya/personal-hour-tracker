const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { totalDays: 75, dailyGoal: calculateDailyGoal() });
});

function calculateDailyGoal(currentHours = 15, totalHours = 400) {
    let remainingDays = 75 - (new Date().getDay() - new Date('start date').getDay());
    return (totalHours - currentHours) / remainingDays;
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
