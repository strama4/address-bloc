const ContactController = require('../controllers/ContactController');
const sequelize = require('../db/models/index').sequelize;

describe("ContactController", () => {
    beforeEach((done) => {
        this.book = new ContactController();

        sequelize.sync({force: true}).then((res) => { // force basically makes sure that
            done();                                   // a table is added (ie. drop then 
        })                                            // create)
        .catch((err) => {
            done();
        });
    });
    describe("#addContact()", () => {
        it("should add a single contact into the book", (done) => {
            this.book.addContact("Alice", "001-101-1010", "alice@gmail.com")
            .then((contact) => {
                expect(contact.name).toBe('Alice');
                expect(contact.phone).toBe('001-101-1010');
                expect(contact.email).toBe('alice@gmail.com');
                done();
            })
            .catch((err) => {
                done();
            });
        });
    });
    describe("#listContacts()", () => {
        it("should return a message saying no messages when empty", (done) => {
            this.book.addContact("Alice", "000-000-0000")
            .then(() => {
                expect(Object.keys(this.book.contacts).length).toBe(0);
                done();
            })
            .catch((err) => {
                done();
            })
        })
    })
    it("should be defined", () => {
        expect(ContactController).toBeDefined();
    })
})