const jwt = require("jsonwebtoken");
// import model
const db = require("./db");

userDetails = {
    1000: {
        acno: 1000,
        username: "Jofi",
        password: 123,
        balance: 100000,
        transactions: [],
    },
    1001: {
        acno: 1001,
        username: "anu",
        password: 123,
        balance: 200000,
        transactions: [],
    },
    1002: {
        acno: 1002,
        username: "amal",
        password: 123,
        balance: 300000,
        transactions: [],
    },
    1003: {
        acno: 1004,
        username: "Joyal",
        password: 123,
        balance: 400000,
        transactions: [],
    },
};

const register = (acno, username, password) => {
    return db.User.findOne({ acno }).then((user) => {
        if (user) {
            return {
                statusCode: 401,
                status: false,
                message: "user already exist",
            };
        } else {
            // insert data into db
            const newUser = new db.User({ acno, username, password, balance: 0, transactions: [] });
            // to store obj in collection
            newUser.save();
            return {
                statusCode: 200,
                status: true,
                message: "registration success",
            };
        }
    });
};

const login = (acnum, psw) => {
    return db.User.findOne({ acno: acnum, password: psw }).then((user) => {
        if (user) {
            currentUser = user.username;
            currentAcno = acnum;
            const token = jwt.sign({ currentAcno: acnum }, "secretkey123");

            return {
                statusCode: 200,
                status: true,
                message: "login success",
                currentUser,
                currentAcno,
                token,
            };
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "incorrect acnum or  password",
            };
        }
    });
};

const deposit = (acnum, pswrd, amnt) => {
    var amount = parseInt(amnt);
    return db.User.findOne({ acno: acnum, password: pswrd }).then((user) => {
        if (user) {
            user.balance += amount;
            user.transactions.push({
                type: "CREDIT",
                amount,
            });
            // to save the updations in db
            user.save();
            return {
                statusCode: 200,
                status: true,
                message: `${amount} credited and new balance is ${user.balance}`,
            };
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "incorrect acnumber or password",
            };
        }
    });
};

const withdraw = (acnum, pswrd, amnt) => {
    var amount = parseInt(amnt);
    return db.User.findOne({ acno: acnum, password: pswrd }).then((user) => {
        if (user) {
            if (user.balance > amount) {
                user.balance -= amount;
                user.transactions.push({
                    type: "DEBIT",
                    amount,
                });
                // to save the updations in db
                user.save();
                return {
                    statusCode: 200,
                    status: true,
                    message: `${amount} debited and new balance is ${user.balance}`,
                };
            } else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "Insufficient balance",
                };
            }
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "incorrect acnumber or password",
            };
        }
    });
};

const getTransaction = (acno) => {
    return db.User.findOne({ acno }).then((user) => {
        if (user) {
            return {
                statusCode: 200,
                status: true,
                transaction: user["transactions"],
            };
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "user doesnt exist",
            };
        }
    });
};

const deleteAcc = (acno) => {
    return db.User.deleteOne({ acno }).then((user) => {
        if (user) {
            return {
                statusCode: 200,
                status: true,
                message: "Delete successful",
            };
        }
        else{
            return{
                statusCode: 401,
            status: false,
            message: "user not exist",
            
            }
        }

    });
};

module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc 
};
