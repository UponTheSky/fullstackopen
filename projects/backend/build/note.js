"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    content: String,
    date: Date,
    important: Boolean
});
// define toJSON for modifying fetched data
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
// export the model
exports.Note = mongoose_1.default.model('Note', noteSchema);
// connect to the DB
const connectDB = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("connecting to the DB...");
        yield mongoose_1.default.connect(url);
        console.log("connect succeeded");
    }
    catch (error) {
        throw Error(`connection failed: ${error}`);
    }
});
const url = process.env.MONGODB_URL;
url && connectDB(url);
