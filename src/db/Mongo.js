// Retrieve
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const dbconnectionstring = process.env.DB_URI;

// Not recommended for production systems, but...
let stored_db = null;

function getDatabase() {
    return new Promise((resolve, reject) => {
        if (stored_db)
            return resolve(stored_db);
        // Connect to the db
        const client = new MongoClient(dbconnectionstring, { useUnifiedTopology: true });
        client.connect(err => {
            if (!err) {
                stored_db = client.db();
                resolve(stored_db);
            } else {
                console.log(err);
                reject(err);
            }
        });
    });
};

async function getItems() {
    if (!stored_db) {
        await getDatabase();
    };
    const todo = stored_db.collection("todo");
    return await todo.find().toArray();
};

async function addOrUpdateItem(obj) {
    if (!stored_db) {
        await getDatabase();
    };
    const todo = stored_db.collection("todo");
    if (obj.hasOwnProperty("_id")) {
        const insertion = JSON.parse(JSON.stringify(obj));
        delete insertion._id;
        const result = await todo.replaceOne({ _id: new ObjectId(obj._id) }, insertion);
        if (result.matchedCount === 0) {
            throw new Error("No matching _id found.");
        };
        return { _id: obj._id };
    }
    else {
        const result = await todo.insertOne(obj);
        return { _id: result.insertedIds[0] };
    };
};

async function deleteItem(obj) {
    if (!stored_db) {
        await getDatabase();
    };
    await stored_db.collection("todo").deleteOne({ _id: ObjectId(obj._id) });
    return { _id: obj._id };
};

async function updateItem(obj, body) {
    if (!stored_db) {
        await getDatabase();
    };
    await stored_db.collection("todo").updateOne({ _id: ObjectId(obj._id) }, { $set: { completed: body.completed } });
    return { _id: obj._id }
};

module.exports = { getItems, addOrUpdateItem, getDatabase, deleteItem, updateItem };
