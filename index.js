import Possession from "./models/Possession";
import Persone from "./models/Personne";
import Patrimoine from "./models/Patrimoine";


const aClient = require('pg');
const client = new aClient({
  host: 'localhost',
  port: 5432,
  user: 'noniekely',
  password: 'noniekely',
  database: 'patrimoine'
});

//Ici je n'ai pas encore mis de requetes parce que suite a une mise a jour de postgresql ,
// j'ai eu un conflit de version de template

(async () => {
    try {
      client.connect();
      console.log('connected');
    }
    catch (err) {
        console.error('Erreur de connexion', err);
      } finally {
        client.end();
        console.log('Disconnected');
      }
    })
