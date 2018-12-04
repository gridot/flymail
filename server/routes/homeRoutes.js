import express from 'express';

const router = express.Router();

router.get('/api/v1', (request, response) => {
    return response.status(200)
    .json({
        success: true,
        message: 'Welcome to SendIT, your package is safe with us'
    });
});

router.all('*', (request, response) => {
    response.status(404)
    .json({
        success: false,
        message: 'Sorry! This page does not exist, enter a valid url.'
    });
});

export default router;