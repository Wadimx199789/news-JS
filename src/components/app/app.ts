import Loader from '../services/loader';
import NewsModel from '../model/newsModel';
import AppController from '../controller/appController';
import AppView from '../view/appView';

class App {
    constructor() {
        const loader = new Loader(process.env.API_URL, {
            apiKey: process.env.API_KEY,
        });
        const model = new NewsModel(loader);
        const view = new AppView();

        this.controller = new AppController(model, view);
    }

    start() {
        this.controller.start();
    }
}

export default App;
