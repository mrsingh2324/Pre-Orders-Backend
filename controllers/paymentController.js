const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('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');

const router = express.Router();

router.post('/intents', async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true,
            },
            // payment_method_types: ['card', 'upi', 'netbanking'],

        });
        res.status(200).json({paymentIntent: paymentIntent.client_secret});
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
});


module.exports = router; 