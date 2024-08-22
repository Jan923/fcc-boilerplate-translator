'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text;
      const locale = req.body.locale;
      if (!text || !locale) {
        if (text === '') {return res.json({ error: 'No text to translate'})}
        else {return res.json({ error: 'Required field(s) missing' })}
      } else if (locale !== 'american-to-british' && locale !== 'british-to-american') 
      {return res.json({ error: 'Invalid value for locale field' })} else {
      const translation = translator.translate(text, locale);
      if (req.body.text === translation) {res.json({text: req.body.text, translation: 'Everything looks good to me!'})}
        else {return res.json({text: req.body.text, translation: translation});}
      //console.log({text: text, translation: translation})
      }
    });
};
