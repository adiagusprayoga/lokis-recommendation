const express = require('express');
const fs = require('fs');

const app = express();
const port = 3003;

app.use(express.json());

app.get('/recommendations/cities/rating', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // List of cities for recommendations
        const cities = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'];

        // Mencari data rekomendasi untuk setiap kota dengan rating antara 4.4 dan 5
        const recommendationsByCityAndRating = cities.map(city => {
            // Mencari tempat dengan rating antara 4.4 dan 5 untuk setiap kota
            const rating4_5InCity = jsonData
                .filter(item => item.city.toLowerCase() === city.toLowerCase() && item.rating >= 4.4 && item.rating <= 5)
                .map(({ id, name, rating }) => ({ id, name, rating }));

            return {
                city,
                recommendations: rating4_5InCity
            };
        });

        // Mengirim data rekomendasi
        res.json(recommendationsByCityAndRating);
    });
});

// Route for Jakarta recommendations
app.get('/recommendations/cities/Jakarta', (req, res) => {
    getRecommendationsByCity(req, res, 'Jakarta');
});

// Route for Bogor recommendations
app.get('/recommendations/cities/Bogor', (req, res) => {
    getRecommendationsByCity(req, res, 'Bogor');
});

// Route for Depok recommendations
app.get('/recommendations/cities/Depok', (req, res) => {
    getRecommendationsByCity(req, res, 'Depok');
});

// Route for Tangerang recommendations
app.get('/recommendations/cities/Tangerang', (req, res) => {
    getRecommendationsByCity(req, res, 'Tangerang');
});

// Route for Bekasi recommendations
app.get('/recommendations/cities/Bekasi', (req, res) => {
    getRecommendationsByCity(req, res, 'Bekasi');
});

// Function to get recommendations by city
function getRecommendationsByCity(req, res, city) {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mencari data rekomendasi untuk kota tertentu dengan rating antara 4.4 dan 5
        const recommendationsForCity = jsonData
            .filter(item => item.city.toLowerCase() === city.toLowerCase() && item.rating >= 4.4 && item.rating <= 5)
            .map(({ id, name, rating }) => ({ id, name, rating }));

        // Mengirim data rekomendasi
        res.json({
            city,
            recommendations: recommendationsForCity
        });
    });
}

// Other routes

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
