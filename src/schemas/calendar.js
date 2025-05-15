import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  steps: Boolean,
  calories: Boolean,
  training: Boolean,
  suplementation: Boolean,
  weight: Boolean,
}, { _id: false });

const seriesSchema = new mongoose.Schema({
  repetitions: Number,
  weight: Number,
})

const exercisesSchema = new mongoose.Schema({
  name: String,
  series: [seriesSchema],
})

const trainingSchema = new mongoose.Schema({
  name: String,
  exercises: [exercisesSchema],
})

const daySchema = new mongoose.Schema({
  id: String,
  date: String,
  tasks: taskSchema,
  weightNumber: Number,
  training: trainingSchema,
}, { _id: false });

const calendarSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  days: [daySchema],
});

// Explicitly connect to 'calendars' collection in 'expense_tracker' DB
const Calendar = mongoose.model('Calendar', calendarSchema, 'calendars');

export default Calendar;

/* "exercises": [
        {
            "name": "Press militar",
            "series": [
                {
                    "repetitions": 5,
                    "weight": 80,
                    "_id": "6825d8c6d64b76e09e390a27"
                },
                {
                    "repetitions": 5,
                    "weight": 80,
                    "_id": "6825d8c6d64b76e09e390a28"
                },
                {
                    "repetitions": 5,
                    "weight": 80,
                    "_id": "6825d8c6d64b76e09e390a29"
                },
                {
                    "repetitions": 5,
                    "weight": 80,
                    "_id": "6825d8c6d64b76e09e390a2a"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a26"
        },
        {
            "name": "Press militar mancuerna",
            "series": [
                {
                    "repetitions": 8,
                    "weight": 40,
                    "_id": "6825d8c6d64b76e09e390a2c"
                },
                {
                    "repetitions": 9,
                    "weight": 36,
                    "_id": "6825d8c6d64b76e09e390a2d"
                },
                {
                    "repetitions": 9,
                    "weight": 36,
                    "_id": "6825d8c6d64b76e09e390a2e"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a2b"
        },
        {
            "name": "Aperturas polea (centro)",
            "series": [
                {
                    "repetitions": 9,
                    "weight": 9.1,
                    "_id": "6825d8c6d64b76e09e390a30"
                },
                {
                    "repetitions": 7,
                    "weight": 9.1,
                    "_id": "6825d8c6d64b76e09e390a31"
                },
                {
                    "repetitions": 10,
                    "weight": 6.8,
                    "_id": "6825d8c6d64b76e09e390a32"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a2f"
        },
        {
            "name": "Jalón agarre neutro ancho",
            "series": [
                {
                    "repetitions": 9,
                    "weight": 86,
                    "_id": "6825d8c6d64b76e09e390a34"
                },
                {
                    "repetitions": 6,
                    "weight": 86,
                    "_id": "6825d8c6d64b76e09e390a35"
                },
                {
                    "repetitions": 8,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a36"
                },
                {
                    "repetitions": 7,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a37"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a33"
        },
        {
            "name": "Remo mancuerna",
            "series": [
                {
                    "repetitions": 8,
                    "weight": 40,
                    "_id": "6825d8c6d64b76e09e390a39"
                },
                {
                    "repetitions": 8,
                    "weight": 38,
                    "_id": "6825d8c6d64b76e09e390a3a"
                },
                {
                    "repetitions": 8,
                    "weight": 36,
                    "_id": "6825d8c6d64b76e09e390a3b"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a38"
        },
        {
            "name": "Remo agarre estrecho neutro",
            "series": [
                {
                    "repetitions": 8,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a3d"
                },
                {
                    "repetitions": 9,
                    "weight": 66,
                    "_id": "6825d8c6d64b76e09e390a3e"
                },
                {
                    "repetitions": 9,
                    "weight": 59,
                    "_id": "6825d8c6d64b76e09e390a3f"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a3c"
        },
        {
            "name": "Jalón agarre estrecho supino",
            "series": [
                {
                    "repetitions": 9,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a41"
                },
                {
                    "repetitions": 7,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a42"
                },
                {
                    "repetitions": 8,
                    "weight": 66,
                    "_id": "6825d8c6d64b76e09e390a43"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a40"
        },
        {
            "name": "Posterior con mancuerna",
            "series": [
                {
                    "repetitions": 10,
                    "weight": 10,
                    "_id": "6825d8c6d64b76e09e390a45"
                },
                {
                    "repetitions": 10,
                    "weight": 10,
                    "_id": "6825d8c6d64b76e09e390a46"
                },
                {
                    "repetitions": 9,
                    "weight": 10,
                    "_id": "6825d8c6d64b76e09e390a47"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a44"
        },
        {
            "name": "Press militar",
            "series": [
                {
                    "repetitions": 5,
                    "weight": 80,
                    "_id": "6825d8c6d64b76e09e390a49"
                },
                {
                    "repetitions": 5,
                    "weight": 80,
                    "_id": "6825d8c6d64b76e09e390a4a"
                },
                {
                    "repetitions": 5,
                    "weight": 80,
                    "_id": "6825d8c6d64b76e09e390a4b"
                },
                {
                    "repetitions": 5,
                    "weight": 80,
                    "_id": "6825d8c6d64b76e09e390a4c"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a48"
        },
        {
            "name": "Press militar mancuerna",
            "series": [
                {
                    "repetitions": 8,
                    "weight": 40,
                    "_id": "6825d8c6d64b76e09e390a4e"
                },
                {
                    "repetitions": 9,
                    "weight": 36,
                    "_id": "6825d8c6d64b76e09e390a4f"
                },
                {
                    "repetitions": 9,
                    "weight": 36,
                    "_id": "6825d8c6d64b76e09e390a50"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a4d"
        },
        {
            "name": "Aperturas polea (centro)",
            "series": [
                {
                    "repetitions": 9,
                    "weight": 9.1,
                    "_id": "6825d8c6d64b76e09e390a52"
                },
                {
                    "repetitions": 7,
                    "weight": 9.1,
                    "_id": "6825d8c6d64b76e09e390a53"
                },
                {
                    "repetitions": 10,
                    "weight": 6.8,
                    "_id": "6825d8c6d64b76e09e390a54"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a51"
        },
        {
            "name": "Jalón agarre neutro ancho",
            "series": [
                {
                    "repetitions": 9,
                    "weight": 86,
                    "_id": "6825d8c6d64b76e09e390a56"
                },
                {
                    "repetitions": 6,
                    "weight": 86,
                    "_id": "6825d8c6d64b76e09e390a57"
                },
                {
                    "repetitions": 8,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a58"
                },
                {
                    "repetitions": 7,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a59"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a55"
        },
        {
            "name": "Remo mancuerna",
            "series": [
                {
                    "repetitions": 8,
                    "weight": 40,
                    "_id": "6825d8c6d64b76e09e390a5b"
                },
                {
                    "repetitions": 8,
                    "weight": 38,
                    "_id": "6825d8c6d64b76e09e390a5c"
                },
                {
                    "repetitions": 8,
                    "weight": 36,
                    "_id": "6825d8c6d64b76e09e390a5d"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a5a"
        },
        {
            "name": "Remo agarre estrecho neutro",
            "series": [
                {
                    "repetitions": 8,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a5f"
                },
                {
                    "repetitions": 9,
                    "weight": 66,
                    "_id": "6825d8c6d64b76e09e390a60"
                },
                {
                    "repetitions": 9,
                    "weight": 59,
                    "_id": "6825d8c6d64b76e09e390a61"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a5e"
        },
        {
            "name": "Jalón agarre estrecho supino",
            "series": [
                {
                    "repetitions": 9,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a63"
                },
                {
                    "repetitions": 7,
                    "weight": 73,
                    "_id": "6825d8c6d64b76e09e390a64"
                },
                {
                    "repetitions": 8,
                    "weight": 66,
                    "_id": "6825d8c6d64b76e09e390a65"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a62"
        },
        {
            "name": "Posterior con mancuerna",
            "series": [
                {
                    "repetitions": 10,
                    "weight": 10,
                    "_id": "6825d8c6d64b76e09e390a67"
                },
                {
                    "repetitions": 10,
                    "weight": 10,
                    "_id": "6825d8c6d64b76e09e390a68"
                },
                {
                    "repetitions": 9,
                    "weight": 10,
                    "_id": "6825d8c6d64b76e09e390a69"
                }
            ],
            "_id": "6825d8c6d64b76e09e390a66"
        }
    ] */

